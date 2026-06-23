/*
 * Conexão com o banco (Neon Postgres) — fonte única do cliente SQL.
 *
 * Usa o driver HTTP do Neon (@neondatabase/serverless): cada query é um único POST HTTPS,
 * sem socket/pool para gerenciar — ideal para um INSERT pontual numa Server Action. NÃO
 * recrie lógica de conexão em outro lugar; importe `obterSql` daqui (mesma ideia da "fonte
 * única" do email gateway).
 *
 * A DATABASE_URL é lida AQUI (em request), nunca no topo do módulo — assim o build não
 * quebra quando a env não está presente (mesmo padrão de lib/stripe/cliente.ts e do gateway).
 * Use a connection string POOLED do Neon (host ...-pooler...), com sslmode=require.
 */

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

/** Retorna o cliente SQL do Neon (memoizado). Lança se DATABASE_URL não estiver configurada. */
export function obterSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL ausente.");
  }
  return (sql ??= neon(url));
}
