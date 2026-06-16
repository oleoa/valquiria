"use server";

/*
 * Envio de formulários — fonte única do "encanamento" de e-mail (app/forms/*).
 *
 * Cada formulário é uma página própria e hardcoded, mas TODOS reusam esta Server
 * Action para mandar as respostas por e-mail. Não recrie lógica de e-mail nas páginas.
 *
 * O e-mail vai pelo Strutura Email Gateway (POST autenticado por Bearer token) para o
 * EMAIL da Valquiria. O domínio do remetente é fixo no gateway (noreply@strutura.ai);
 * só o display name (FORM_FROM_NAME) é nosso. Detalhes do gateway em EMAIL-GATEWAY.md.
 */

import { EMAIL, EMAIL_GATEWAY_URL, FORM_FROM_NAME } from "@/lib/config";

/** Uma pergunta do formulário com a resposta dada. */
export type RespostaFormulario = {
  /** Texto da pergunta, como aparece no form. */
  pergunta: string;
  /** Resposta digitada/selecionada pela pessoa. */
  resposta: string;
};

/** Tudo que um formulário precisa enviar. */
export type DadosFormulario = {
  /** Identificador curto do form (ex.: "exemplo"). */
  formId: string;
  /** Título humano do form — vai no assunto do e-mail. */
  titulo: string;
  /** Respostas em ordem. */
  respostas: RespostaFormulario[];
};

/** Resultado tipado para o client decidir redirect (ok) ou mostrar erro. */
export type ResultadoEnvio = { ok: true } | { ok: false; erro: string };

/** Quantas vezes tentamos o gateway antes de desistir (em erro transitório). */
const MAX_TENTATIVAS = 3;

/** Escapa HTML do corpo do e-mail — as respostas são entrada de usuário. */
function escaparHtml(texto: string): string {
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
 * Envia as respostas de um formulário por e-mail para a Valquiria.
 * Retorna { ok: true } em caso de sucesso — o client só então navega para o /obrigado.
 */
export async function enviarFormulario(
  dados: DadosFormulario,
): Promise<ResultadoEnvio> {
  // A chave é lida AQUI (em request), nunca no topo do módulo — assim o build
  // não quebra quando a env não está presente.
  const apiKey = process.env.EMAIL_GATEWAY_KEY;
  if (!apiKey) {
    console.error("EMAIL_GATEWAY_KEY ausente — formulário não enviado.");
    return { ok: false, erro: "Configuração de e-mail indisponível no momento." };
  }

  // Validação mínima no servidor (defesa em profundidade — o client também valida).
  if (!dados?.respostas?.length) {
    return { ok: false, erro: "Nenhuma resposta recebida." };
  }

  const corpoHtml = dados.respostas
    .map(
      (r) =>
        `<p style="margin:0 0 16px;line-height:1.5">` +
        `<strong>${escaparHtml(r.pergunta)}</strong><br>` +
        `${escaparHtml(r.resposta) || "—"}</p>`,
    )
    .join("");

  // Body do gateway: só html (não há campo `text`). From = noreply@strutura.ai com o
  // display name FORM_FROM_NAME; replyTo aponta para o próprio EMAIL da Valquiria.
  const body = JSON.stringify({
    to: EMAIL,
    fromName: FORM_FROM_NAME,
    subject: `Novo formulário: ${dados.titulo}`,
    replyTo: EMAIL,
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;color:#0e1823;font-size:15px">` +
      `<h2 style="font-weight:600;margin:0 0 20px">${escaparHtml(dados.titulo)}</h2>` +
      `${corpoHtml}</div>`,
  });

  // Retry só em erro transitório (5xx/429 ou falha de rede) com backoff exponencial.
  // 4xx é erro de payload/auth — não adianta repetir, aborta na hora.
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
