"use server";

/*
 * Envio de formulários — fonte única do "encanamento" de e-mail (app/forms/*).
 *
 * Cada formulário é uma página própria e hardcoded, mas TODOS reusam esta Server
 * Action para mandar as respostas por e-mail. Não recrie lógica de e-mail nas páginas.
 *
 * O e-mail vai via Resend para o EMAIL da Valquiria (lib/config.ts). O remetente é o
 * FORM_FROM_EMAIL — precisa ser de um domínio verificado no Resend (ver config.ts).
 */

import { Resend } from "resend";
import { EMAIL, FORM_FROM_EMAIL } from "@/lib/config";

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

/** Escapa HTML do corpo do e-mail — as respostas são entrada de usuário. */
function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ausente — formulário não enviado.");
    return { ok: false, erro: "Configuração de e-mail indisponível no momento." };
  }

  // Validação mínima no servidor (defesa em profundidade — o client também valida).
  if (!dados?.respostas?.length) {
    return { ok: false, erro: "Nenhuma resposta recebida." };
  }

  const resend = new Resend(apiKey);

  const corpoTexto = dados.respostas
    .map((r) => `${r.pergunta}\n${r.resposta || "—"}`)
    .join("\n\n");

  const corpoHtml = dados.respostas
    .map(
      (r) =>
        `<p style="margin:0 0 16px;line-height:1.5">` +
        `<strong>${escaparHtml(r.pergunta)}</strong><br>` +
        `${escaparHtml(r.resposta) || "—"}</p>`,
    )
    .join("");

  try {
    const { error } = await resend.emails.send({
      from: FORM_FROM_EMAIL,
      to: EMAIL,
      replyTo: EMAIL,
      subject: `Novo formulário: ${dados.titulo}`,
      text: `Formulário: ${dados.titulo}\n\n${corpoTexto}`,
      html:
        `<div style="font-family:Arial,Helvetica,sans-serif;color:#0e1823;font-size:15px">` +
        `<h2 style="font-weight:600;margin:0 0 20px">${escaparHtml(dados.titulo)}</h2>` +
        `${corpoHtml}</div>`,
    });

    if (error) {
      console.error("Erro Resend:", error);
      return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
    }

    return { ok: true };
  } catch (e) {
    console.error("Falha inesperada no envio do formulário:", e);
    return { ok: false, erro: "Não foi possível enviar agora. Tente novamente." };
  }
}
