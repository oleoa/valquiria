/*
 * Monta e envia o e-mail de compra para a Valquiria.
 *
 * Recebe uma forma normalizada (serve tanto para compra avulsa quanto para renovação de
 * assinatura) e delega o envio ao gateway compartilhado (lib/email/gateway.ts). O webhook
 * em app/api/webhooks/stripe é quem extrai os dados do evento e chama esta função.
 */

import { EMAIL, VENDAS_FROM_NAME } from "@/lib/config";
import { enviarEmail, escaparHtml, type ResultadoEnvio } from "@/lib/email/gateway";

/** Dados de uma compra, já normalizados a partir do evento do Stripe. */
export type DadosCompra = {
  /** "compra" = 1ª aquisição/avulsa; "renovacao" = ciclo mensal de assinatura. */
  tipo: "compra" | "renovacao";
  /** Nome(s) do(s) produto(s) comprado(s). */
  produtos: string[];
  /** Valor total em centavos. */
  valorCentavos: number;
  /** Código da moeda (ex.: "brl"). */
  moeda: string;
  clienteNome: string | null;
  clienteEmail: string | null;
  clienteTelefone: string | null;
  /** Referência para rastreio (id da sessão ou número/id da fatura). */
  referencia: string;
  /** Momento da compra (unix, em segundos — como o Stripe entrega). */
  timestamp: number;
};

/** Formata centavos como moeda pt-BR (ex.: "R$ 497,00"). */
function formatarValor(centavos: number, moeda: string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: moeda.toUpperCase(),
  }).format(centavos / 100);
}

/** Formata o instante da compra no fuso de São Paulo. */
function formatarData(timestampSegundos: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(timestampSegundos * 1000));
}

/** Envia o e-mail com os detalhes da compra. Retorna { ok: true } em sucesso. */
export async function enviarEmailCompra(dados: DadosCompra): Promise<ResultadoEnvio> {
  const valor = formatarValor(dados.valorCentavos, dados.moeda);
  const produtos = dados.produtos.length ? dados.produtos.join(", ") : "—";
  const rotulo = dados.tipo === "renovacao" ? "Renovação" : "Nova compra";

  const linhas: Array<[string, string]> = [
    ["Produto(s)", produtos],
    ["Valor", valor],
    ["Cliente", dados.clienteNome || "—"],
    ["E-mail", dados.clienteEmail || "—"],
    ["Telefone", dados.clienteTelefone || "—"],
    ["Data", formatarData(dados.timestamp)],
    ["Referência", dados.referencia],
  ];

  const corpoHtml = linhas
    .map(
      ([rotuloLinha, valorLinha]) =>
        `<p style="margin:0 0 12px;line-height:1.5">` +
        `<strong>${escaparHtml(rotuloLinha)}</strong><br>` +
        `${escaparHtml(valorLinha)}</p>`,
    )
    .join("");

  return enviarEmail({
    to: EMAIL,
    fromName: VENDAS_FROM_NAME,
    subject: `${rotulo}: ${produtos} — ${valor}`,
    // Responder o e-mail cai direto na caixa do comprador (quando há e-mail).
    replyTo: dados.clienteEmail || EMAIL,
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;color:#0e1823;font-size:15px">` +
      `<h2 style="font-weight:600;margin:0 0 20px">${escaparHtml(rotulo)} no site</h2>` +
      `${corpoHtml}</div>`,
  });
}
