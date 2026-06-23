/*
 * Webhook do Stripe — notifica a Valquiria por e-mail a cada compra.
 *
 * Os checkouts são Payment Links (buy.stripe.com), então a única forma de saber de uma
 * compra é este webhook. Aqui validamos a assinatura, extraímos os detalhes e mandamos o
 * e-mail pelo gateway compartilhado (via lib/stripe/email-compra).
 *
 * Eventos tratados:
 *  - checkout.session.completed / .async_payment_succeeded → compra (avulsa ou 1º mês de
 *    assinatura). Só envia quando o pagamento está confirmado (cobre boleto/Pix, que são
 *    assíncronos: o "completed" chega antes de o dinheiro entrar).
 *  - invoice.paid → renovação mensal de assinatura (só no ciclo, não na 1ª fatura, que já
 *    foi coberta pelo checkout.session.completed).
 *
 * Configuração (somente no painel do Stripe + Vercel): STRIPE_SECRET_KEY e
 * STRIPE_WEBHOOK_SECRET. Ver .env.example e CLAUDE.md.
 */

import type Stripe from "stripe";

import type { ResultadoEnvio } from "@/lib/email/gateway";
import { enviarEmailCompra } from "@/lib/stripe/email-compra";
import { getStripe } from "@/lib/stripe/cliente";

// SDK do Stripe precisa do runtime Node (não roda no edge).
export const runtime = "nodejs";

/** Trata uma sessão de checkout paga e dispara o e-mail. Ignora se ainda não foi paga. */
async function tratarSessao(
  stripe: Stripe,
  sessao: Stripe.Checkout.Session,
): Promise<ResultadoEnvio> {
  // Pagamentos assíncronos (boleto/Pix) chegam aqui como "unpaid"; só enviamos quando o
  // pagamento está confirmado — o async_payment_succeeded cobre a confirmação depois.
  if (
    sessao.payment_status !== "paid" &&
    sessao.payment_status !== "no_payment_required"
  ) {
    console.log(`Sessão ${sessao.id} ainda não paga (${sessao.payment_status}) — ignorada.`);
    return { ok: true };
  }

  // Os line items não vêm no payload do webhook — buscamos para ter o nome do produto.
  const itens = await stripe.checkout.sessions.listLineItems(sessao.id, { limit: 20 });

  return enviarEmailCompra({
    tipo: "compra",
    produtos: itens.data.map((item) => item.description || "Produto"),
    valorCentavos: sessao.amount_total ?? 0,
    moeda: sessao.currency ?? "brl",
    clienteNome: sessao.customer_details?.name ?? null,
    clienteEmail: sessao.customer_details?.email ?? null,
    clienteTelefone: sessao.customer_details?.phone ?? null,
    referencia: sessao.id,
    timestamp: sessao.created,
  });
}

/** Trata uma fatura paga; só envia nas renovações (não na 1ª fatura da assinatura). */
async function tratarFatura(fatura: Stripe.Invoice): Promise<ResultadoEnvio> {
  if (fatura.billing_reason !== "subscription_cycle") {
    return { ok: true };
  }

  return enviarEmailCompra({
    tipo: "renovacao",
    // Na fatura os line items VÊM no payload.
    produtos: fatura.lines.data.map((linha) => linha.description || "Assinatura"),
    valorCentavos: fatura.amount_paid,
    moeda: fatura.currency,
    clienteNome: fatura.customer_name ?? null,
    clienteEmail: fatura.customer_email ?? null,
    clienteTelefone: null,
    referencia: fatura.number ?? fatura.id ?? "fatura",
    timestamp: fatura.created,
  });
}

export async function POST(req: Request): Promise<Response> {
  const assinatura = req.headers.get("stripe-signature");
  const segredo = process.env.STRIPE_WEBHOOK_SECRET;
  if (!assinatura || !segredo) {
    console.error("Webhook Stripe sem assinatura ou STRIPE_WEBHOOK_SECRET ausente.");
    return new Response("Configuração ausente.", { status: 500 });
  }

  // Corpo CRU é obrigatório para validar a assinatura (no App Router não há body parser).
  const corpoBruto = await req.text();

  let stripe: Stripe;
  let evento: Stripe.Event;
  try {
    stripe = getStripe();
    evento = await stripe.webhooks.constructEventAsync(corpoBruto, assinatura, segredo);
  } catch (e) {
    // Assinatura inválida/forjada (ou STRIPE_SECRET_KEY ausente) — não adianta repetir.
    console.error("Assinatura do webhook inválida:", e);
    return new Response("Assinatura inválida.", { status: 400 });
  }

  try {
    let resultado: ResultadoEnvio = { ok: true };

    switch (evento.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        resultado = await tratarSessao(stripe, evento.data.object);
        break;
      case "invoice.paid":
        resultado = await tratarFatura(evento.data.object);
        break;
      default:
        // Outros eventos: apenas confirmamos o recebimento.
        break;
    }

    if (!resultado.ok) {
      // Devolve 500 para o Stripe re-tentar depois (falha transitória de envio).
      console.error(`Falha ao enviar e-mail do evento ${evento.type}:`, resultado.erro);
      return new Response("Falha ao enviar e-mail.", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(`Erro ao processar webhook Stripe (${evento.type}):`, e);
    return new Response("Erro interno.", { status: 500 });
  }
}
