/*
 * Export CSV das respostas (área interna). GET com os mesmos filtros da página (form, q, ordem).
 *
 * Defesa em profundidade: revalida a sessão por conta própria (não confia só no middleware).
 * Roda lib/forms/consultar.ts sem paginação, com teto de segurança. Gera CSV com BOM UTF-8 (para
 * o Excel reconhecer acentos), delimitador ";" e escaping correto (aspas, ;, quebras de linha).
 */

import { cookies } from "next/headers";
import { COOKIE_SESSAO, cookieValido } from "@/lib/auth/sessao";
import { listarSubmissoes, type Ordem } from "@/lib/forms/consultar";

export const runtime = "nodejs";

/** Teto de linhas por export — protege contra um dump gigante. Loga se truncar. */
const TETO = 5000;

const FORMATADOR_DATA = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** AAAA-MM-DD em America/Sao_Paulo (en-CA formata exatamente nesse padrão). */
const FORMATADOR_ARQUIVO = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Mesmo normalizador da página: timestamptz do Postgres → Date confiável. */
function paraData(criadoEm: string): Date {
  const iso = criadoEm.trim().replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00");
  return new Date(iso);
}

/** Escapa um campo CSV (delimitador ";"): aspas duplicadas e campo entre aspas quando preciso. */
function escaparCsv(valor: string): string {
  const escapado = valor.replace(/"/g, '""');
  return /[";\n\r]/.test(valor) ? `"${escapado}"` : escapado;
}

export async function GET(req: Request): Promise<Response> {
  const cookie = (await cookies()).get(COOKIE_SESSAO)?.value;
  if (!(await cookieValido(cookie))) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const url = new URL(req.url);
  const formId = url.searchParams.get("form")?.trim() || undefined;
  const busca = url.searchParams.get("q")?.trim() || undefined;
  const ordem: Ordem = url.searchParams.get("ordem") === "asc" ? "asc" : "desc";

  const submissoes = await listarSubmissoes({
    formId,
    busca,
    ordem,
    limite: TETO,
    offset: 0,
  });
  if (submissoes.length >= TETO) {
    console.warn(
      `Export CSV atingiu o teto de ${TETO} linhas — o resultado pode estar truncado.`,
    );
  }

  const colunas = ["data", "formulario", "nome", "email", "telefone", "respostas"];
  const linhas = [colunas.join(";")];

  for (const s of submissoes) {
    // Forms variam — consolida todos os pares "pergunta: resposta" numa coluna só.
    const respostas = s.respostas
      .map((r) => `${r.pergunta}: ${r.resposta}`)
      .join(" | ");
    const campos = [
      FORMATADOR_DATA.format(paraData(s.criadoEm)),
      s.titulo,
      s.nome ?? "",
      s.email ?? "",
      s.telefone ?? "",
      respostas,
    ];
    linhas.push(campos.map((c) => escaparCsv(String(c))).join(";"));
  }

  // BOM UTF-8 (﻿) + CRLF: melhor compatibilidade com Excel/Sheets (acentos corretos).
  const conteudo = "﻿" + linhas.join("\r\n");
  const nomeArquivo = `respostas-${FORMATADOR_ARQUIVO.format(new Date())}.csv`;

  return new Response(conteudo, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${nomeArquivo}"`,
    },
  });
}
