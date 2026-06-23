"use server";

/*
 * Envio de formulários (app/forms/*).
 *
 * Cada formulário é uma página própria e hardcoded, mas TODOS reusam esta Server Action
 * para mandar as respostas por e-mail. O "encanamento" de envio (POST autenticado +
 * retry) mora em lib/email/gateway.ts — não recrie lógica de e-mail aqui nem nas páginas.
 *
 * O e-mail vai para o EMAIL da Valquiria, com display name FORM_FROM_NAME e replyTo no
 * próprio EMAIL. Detalhes do gateway em EMAIL-GATEWAY.md.
 */

import { EMAIL, EMAIL_COPIA, FORM_FROM_NAME } from "@/lib/config";
import { enviarEmail, escaparHtml } from "@/lib/email/gateway";
import { salvarSubmissao } from "@/lib/forms/salvar";

/** Resultado tipado para o client decidir redirect (ok) ou mostrar erro. */
export type { ResultadoEnvio } from "@/lib/email/gateway";

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

/**
 * Envia as respostas de um formulário por e-mail para a Valquiria.
 * Retorna { ok: true } em caso de sucesso — o client só então navega para o /obrigado.
 */
export async function enviarFormulario(dados: DadosFormulario) {
  // Validação mínima no servidor (defesa em profundidade — o client também valida).
  if (!dados?.respostas?.length) {
    return { ok: false as const, erro: "Nenhuma resposta recebida." };
  }

  const corpoHtml = dados.respostas
    .map(
      (r) =>
        `<p style="margin:0 0 16px;line-height:1.5">` +
        `<strong>${escaparHtml(r.pergunta)}</strong><br>` +
        `${escaparHtml(r.resposta) || "—"}</p>`,
    )
    .join("");

  // Opções comuns ao envio principal e à cópia — só o destinatário (`to`) muda.
  const opcoes = {
    fromName: FORM_FROM_NAME,
    subject: `Novo formulário: ${dados.titulo}`,
    replyTo: EMAIL,
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;color:#0e1823;font-size:15px">` +
      `<h2 style="font-weight:600;margin:0 0 20px">${escaparHtml(dados.titulo)}</h2>` +
      `${corpoHtml}</div>`,
  };

  // Persiste no banco (fonte durável de verdade) e notifica por e-mail, em paralelo. A
  // submissão conta como capturada se QUALQUER um dos dois der certo — só mostramos erro à
  // usuária se AMBOS falharem. allSettled (não all) porque queremos sucesso parcial; como
  // enviarEmail/salvarSubmissao retornam { ok:false } em vez de lançar, checamos .value.ok.
  const [banco, email] = await Promise.allSettled([
    salvarSubmissao(dados),
    enviarEmail({ ...opcoes, to: EMAIL }),
  ]);

  const bancoOk = banco.status === "fulfilled" && banco.value.ok;
  const emailOk = email.status === "fulfilled" && email.value.ok;

  if (!bancoOk) {
    console.error(
      "Submissão não persistida:",
      banco.status === "rejected" ? banco.reason : banco.value,
    );
  }
  if (!emailOk) {
    console.error(
      "E-mail não enviado:",
      email.status === "rejected" ? email.reason : email.value,
    );
  }

  // Redundância best-effort: cópia para uma caixa monitorada (se EMAIL_COPIA estiver
  // configurada), pra um lead não se perder caso a entrega principal falhe em silêncio.
  // NÃO afeta o retorno ao client — a usuária não deve ver erro por causa da cópia.
  if (EMAIL_COPIA) {
    const copia = await enviarEmail({ ...opcoes, to: EMAIL_COPIA });
    if (!copia.ok) {
      console.error(`Falha ao enviar cópia para ${EMAIL_COPIA}:`, copia.erro);
    }
  }

  if (!bancoOk && !emailOk) {
    return { ok: false as const, erro: "Não foi possível enviar agora. Tente novamente." };
  }
  return { ok: true as const };
}
