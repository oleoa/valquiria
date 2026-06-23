/*
 * Consulta das submissões de formulário (Neon Postgres) — usado pela área interna
 * /dashboard/respostas (página, export CSV e exclusão).
 *
 * Reusa a conexão única obterSql (lib/db/cliente.ts) — NÃO recrie lógica de banco aqui. É a
 * contraparte de leitura de lib/forms/salvar.ts (escrita). Só roda no servidor (importado por
 * Server Components, Server Actions e route handler).
 *
 * Filtros opcionais + ordenação + paginação usam sql.query(texto, params) com placeholders
 * $1,$2…: todos os VALORES são bindados (nunca concatenados). A direção da ordenação é validada
 * contra uma whitelist (asc/desc) porque não pode ser parâmetro bindado.
 */

import { obterSql } from "@/lib/db/cliente";
import type { RespostaFormulario } from "@/lib/forms/enviar";

/** Direção da ordenação por data. */
export type Ordem = "asc" | "desc";

/** Uma submissão já tipada e com nomes em camelCase (vinda da tabela form_submissions). */
export type Submissao = {
  id: string;
  formId: string;
  titulo: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  respostas: RespostaFormulario[];
  /** ISO 8601 (timestamptz) — formate na exibição com Intl + timeZone America/Sao_Paulo. */
  criadoEm: string;
};

/** Resumo por formulário, para o seletor de filtro. */
export type FormularioResumo = {
  formId: string;
  titulo: string;
  total: number;
};

export type FiltrosLista = {
  formId?: string;
  busca?: string;
  ordem?: Ordem;
  limite?: number;
  offset?: number;
};

export type FiltrosContagem = {
  formId?: string;
  busca?: string;
};

/**
 * Normaliza o criado_em para ISO 8601. O driver Neon devolve timestamptz como objeto Date —
 * `.toISOString()` dá um ISO com "Z" que `new Date()` reparseia sem ambiguidade. Se em algum
 * cenário vier como string (texto do Postgres), repassa como veio (a exibição tolera).
 */
function paraIso(valor: unknown): string {
  if (valor instanceof Date) return valor.toISOString();
  return String(valor);
}

/** jsonb já volta parseado pelo driver; guarda contra string/forma inesperada por segurança. */
function parseRespostas(valor: unknown): RespostaFormulario[] {
  if (Array.isArray(valor)) return valor as RespostaFormulario[];
  if (typeof valor === "string") {
    try {
      const p: unknown = JSON.parse(valor);
      return Array.isArray(p) ? (p as RespostaFormulario[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function mapearSubmissao(row: Record<string, unknown>): Submissao {
  return {
    id: String(row.id),
    formId: String(row.form_id),
    titulo: String(row.titulo),
    nome: (row.nome as string | null) ?? null,
    email: (row.email as string | null) ?? null,
    telefone: (row.telefone as string | null) ?? null,
    respostas: parseRespostas(row.respostas),
    criadoEm: paraIso(row.criado_em),
  };
}

/**
 * Monta a cláusula WHERE com as condições opcionais e os parâmetros bindados ($1,$2…).
 * O caller pode acrescentar mais parâmetros (limit/offset) depois — basta continuar a numeração.
 */
function construirFiltro(
  formId?: string,
  busca?: string,
): { where: string; params: unknown[] } {
  const cond: string[] = [];
  const params: unknown[] = [];

  if (formId) {
    params.push(formId);
    cond.push(`form_id = $${params.length}`);
  }
  if (busca) {
    params.push(`%${busca}%`);
    const p = `$${params.length}`; // mesmo parâmetro referenciado em nome e email
    cond.push(`(nome ilike ${p} or email ilike ${p})`);
  }

  const where = cond.length ? `where ${cond.join(" and ")}` : "";
  return { where, params };
}

/** Lista submissões aplicando filtro/busca/ordenação/paginação. */
export async function listarSubmissoes(
  filtros: FiltrosLista = {},
): Promise<Submissao[]> {
  const { formId, busca, ordem = "desc", limite = 20, offset = 0 } = filtros;
  const { where, params } = construirFiltro(formId, busca);

  const dir = ordem === "asc" ? "asc" : "desc"; // whitelist — nunca interpolar valor do usuário

  params.push(limite);
  const pLimite = `$${params.length}`;
  params.push(offset);
  const pOffset = `$${params.length}`;

  const texto = `
    select id, form_id, titulo, nome, email, telefone, respostas, criado_em
    from form_submissions
    ${where}
    order by criado_em ${dir}
    limit ${pLimite} offset ${pOffset}
  `;

  const sql = obterSql();
  const linhas = await sql.query(texto, params);
  return (linhas as Record<string, unknown>[]).map(mapearSubmissao);
}

/** Conta o total de submissões que casam o filtro/busca (para a paginação). */
export async function contarSubmissoes(
  filtros: FiltrosContagem = {},
): Promise<number> {
  const { where, params } = construirFiltro(filtros.formId, filtros.busca);
  const texto = `select count(*)::int as total from form_submissions ${where}`;

  const sql = obterSql();
  const linhas = await sql.query(texto, params);
  const total = (linhas as Record<string, unknown>[])[0]?.total;
  return Number(total ?? 0);
}

/** Lista os formulários distintos que já têm submissões, com o título e a contagem. */
export async function listarFormularios(): Promise<FormularioResumo[]> {
  const sql = obterSql();
  const linhas = await sql`
    select form_id, max(titulo) as titulo, count(*)::int as total
    from form_submissions
    group by form_id
    order by max(titulo)
  `;
  return (linhas as Record<string, unknown>[]).map((r) => ({
    formId: String(r.form_id),
    titulo: String(r.titulo),
    total: Number(r.total ?? 0),
  }));
}

/** Exclui uma submissão pelo id. Lança em erro de banco (o caller trata). */
export async function excluirSubmissao(id: string): Promise<void> {
  const sql = obterSql();
  await sql`delete from form_submissions where id = ${id}`;
}
