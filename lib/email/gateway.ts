/*
 * Encanamento de e-mail — fonte única do POST autenticado ao Strutura Email Gateway.
 *
 * Usado tanto pelos formulários (lib/forms/enviar.ts) quanto pelo webhook de compras do
 * Stripe (app/api/webhooks/stripe). NÃO recrie esta lógica em outro lugar.
 *
 * O domínio do remetente é fixo no gateway (noreply@strutura.ai); só o display name
 * (fromName) é nosso. O body aceita só `html` (não há campo `text`). Detalhes em
 * EMAIL-GATEWAY.md.
 */

import { EMAIL, EMAIL_GATEWAY_URL } from "@/lib/config";

/** Resultado tipado: o chamador decide o que fazer (redirect, status HTTP, etc.). */
export type ResultadoEnvio = { ok: true } | { ok: false; erro: string };

/** Tudo que o gateway precisa para mandar um e-mail. */
export type OpcoesEmail = {
  /** Destinatário. Cai no EMAIL da Valquiria quando omitido. */
  to?: string;
  /** Display name do remetente (o domínio é fixo no gateway). */
  fromName: string;
  /** Assunto do e-mail. */
  subject: string;
  /** Corpo em HTML (já escapado/montado pelo chamador). */
  html: string;
  /** Endereço de resposta. Só entra no body se informado. */
  replyTo?: string;
};

/** Quantas vezes tentamos o gateway antes de desistir (em erro transitório). */
const MAX_TENTATIVAS = 3;

/** Escapa HTML — qualquer texto que venha de fora (respostas, dados do cliente). */
export function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Espera `ms` milissegundos — usado no backoff entre retentativas. */
function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Envia um e-mail pelo gateway. Retorna { ok: true } em caso de sucesso.
 * Retry só em erro transitório (5xx/429 ou falha de rede) com backoff exponencial;
 * 4xx é erro de payload/auth — não adianta repetir, aborta na hora.
 */
export async function enviarEmail(opts: OpcoesEmail): Promise<ResultadoEnvio> {
  // A chave é lida AQUI (em request), nunca no topo do módulo — assim o build
  // não quebra quando a env não está presente.
  const apiKey = process.env.EMAIL_GATEWAY_KEY;
  if (!apiKey) {
    console.error("EMAIL_GATEWAY_KEY ausente — e-mail não enviado.");
    return { ok: false, erro: "Configuração de e-mail indisponível no momento." };
  }

  const body = JSON.stringify({
    to: opts.to ?? EMAIL,
    fromName: opts.fromName,
    subject: opts.subject,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    html: opts.html,
  });

  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
    try {
      const res = await fetch(EMAIL_GATEWAY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        // O gateway responde { ok: true, id: "<resend-id>" } no 200. Lemos o id só para
        // logar: como não há webhook de status (ver EMAIL-GATEWAY.md), esse id é a única
        // forma de cruzar um envio com o status real de entrega no Resend depois. O log
        // aparece nos logs da Vercel.
        const corpo = (await res.json().catch(() => null)) as
          | { ok?: boolean; id?: string }
          | null;

        // Defensivo: 200 com { ok: false } no body não é sucesso de verdade.
        if (corpo && corpo.ok === false) {
          console.error("Email gateway retornou 200 mas ok:false:", corpo);
          return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
        }

        console.log(
          `E-mail aceito pelo gateway (id=${corpo?.id ?? "?"}) — "${opts.subject}".`,
        );
        return { ok: true };
      }

      if (res.status < 500 && res.status !== 429) {
        console.error(
          `Email gateway recusou (${res.status}):`,
          await res.text().catch(() => ""),
        );
        return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
      }

      console.error(
        `Email gateway instável (${res.status}), tentativa ${tentativa}/${MAX_TENTATIVAS}.`,
      );
    } catch (e) {
      console.error(
        `Falha de rede no envio (tentativa ${tentativa}/${MAX_TENTATIVAS}):`,
        e,
      );
    }

    // Backoff antes da próxima tentativa (400ms, 800ms); não espera após a última.
    if (tentativa < MAX_TENTATIVAS) {
      await esperar(400 * 2 ** (tentativa - 1));
    }
  }

  return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
}
