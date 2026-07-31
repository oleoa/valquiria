/*
 * Persistência das submissões de formulário no banco (Neon Postgres).
 *
 * Chamado pela Server Action enviarFormulario (lib/forms/enviar.ts) em paralelo com o envio
 * de e-mail. O banco é a fonte durável de verdade; o e-mail é a notificação. A conexão vem da
 * fonte única lib/db/cliente.ts — não recrie lógica de banco aqui.
 *
 * Guarda as respostas completas em JSONB (`respostas`) e extrai nome/e-mail/telefone, best-effort,
 * para colunas próprias (facilita consulta/CRM). Se a extração falhar, a coluna fica null — nada
 * se perde, porque o JSONB sempre tem tudo. Não lança: retorna o mesmo formato ResultadoEnvio do
 * e-mail para a action tratar os dois canais simetricamente.
 */

import { obterSql } from "@/lib/db/cliente";
import type { ResultadoEnvio } from "@/lib/email/gateway";
import type { DadosFormulario, RespostaFormulario } from "@/lib/forms/enviar";

/**
 * Acha a resposta cuja pergunta casa o padrão (case-insensitive), ignorando respostas vazias.
 * Quando o form tem campos de pai e mãe (ex.: anamnese), prefere o da mãe — é com ela que a
 * Valquiria costuma tratar, então é o contato que vale no painel.
 */
function acharResposta(
  respostas: RespostaFormulario[],
  padrao: RegExp,
): string | null {
  const casam = respostas.filter(
    (r) => padrao.test(r.pergunta) && r.resposta.trim(),
  );
  const daMae = casam.find((r) => /m[ãa]e/i.test(r.pergunta));
  return (daMae ?? casam[0])?.resposta.trim() ?? null;
}

/**
 * Insere a submissão na tabela form_submissions. Retorna { ok: true } em caso de sucesso;
 * { ok: false, erro } se a conexão/insert falhar (logado para os logs da Vercel).
 */
export async function salvarSubmissao(
  dados: DadosFormulario,
): Promise<ResultadoEnvio> {
  // Extração best-effort dos campos de contato a partir do rótulo da pergunta.
  const nome = acharResposta(dados.respostas, /nome/i);
  const email = acharResposta(dados.respostas, /e-?mail/i);
  const telefone = acharResposta(dados.respostas, /telefone|whats|celular/i);

  try {
    const sql = obterSql();
    // Interpolações viram parâmetros bindados ($1, $2, …) — seguro mesmo com texto do usuário.
    // respostas entra como JSON string com cast ::jsonb (forma robusta no driver HTTP).
    await sql`
      insert into form_submissions (form_id, titulo, nome, email, telefone, respostas)
      values (
        ${dados.formId},
        ${dados.titulo},
        ${nome},
        ${email},
        ${telefone},
        ${JSON.stringify(dados.respostas)}::jsonb
      )
    `;
    return { ok: true };
  } catch (e) {
    console.error("Falha ao salvar submissão no banco:", e);
    return { ok: false, erro: "Falha ao salvar no banco." };
  }
}
