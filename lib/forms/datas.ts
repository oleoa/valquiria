/*
 * Formatação de datas das submissões (criado_em) — fonte única usada pela lista,
 * pelo export CSV e pela página de detalhe da área interna.
 */

const FORMATADOR_DATA_HORA = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const FORMATADOR_LONGO = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Converte o timestamptz devolvido pelo Neon (texto do Postgres, ex.: "2026-06-26 15:30:00+00")
 * num Date confiável: troca o espaço por "T" e completa o offset curto ("+00" → "+00:00").
 */
export function paraData(criadoEm: string): Date {
  const iso = criadoEm.trim().replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00");
  return new Date(iso);
}

/** "26/06/2026 12:30" em America/Sao_Paulo. */
export function formatarDataHora(criadoEm: string): string {
  return FORMATADOR_DATA_HORA.format(paraData(criadoEm));
}

/** "sexta-feira, 26 de junho de 2026 12:30" — para a página de detalhe. */
export function formatarDataLonga(criadoEm: string): string {
  return FORMATADOR_LONGO.format(paraData(criadoEm));
}
