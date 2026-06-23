/*
 * Sessão de admin da área protegida (/dashboard) — fonte única da lógica de autenticação.
 *
 * É um helper PURO: usa só Web Crypto (crypto.subtle) e process.env. NÃO importa next/headers
 * nem node:crypto — assim roda tanto no middleware (edge) quanto em Server Actions/route handlers.
 * Quem lê/escreve o cookie de fato é quem chama (middleware via req.cookies; actions/route via
 * cookies() de next/headers).
 *
 * Duas envs (lidas em request, nunca no topo do módulo — mesmo padrão de lib/db/cliente.ts):
 *  - ADMIN_PASSWORD: a senha única de login.
 *  - ADMIN_SESSION_SECRET: string aleatória longa que assina o cookie (HMAC).
 */

/** Nome do cookie de sessão. */
export const COOKIE_SESSAO = "va_admin";

/** Payload fixo e versionado assinado no token — trocar a versão invalida sessões antigas. */
const PAYLOAD_SESSAO = "va-admin-v1";

/** Converte um ArrayBuffer em string hex. */
function paraHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** HMAC-SHA256(chave, mensagem) em hex (Web Crypto). */
async function hmacHex(chave: string, mensagem: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(chave),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const assinatura = await crypto.subtle.sign("HMAC", key, enc.encode(mensagem));
  return paraHex(assinatura);
}

/** SHA-256(mensagem) em hex (Web Crypto). */
async function sha256Hex(mensagem: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(mensagem),
  );
  return paraHex(buffer);
}

/**
 * Compara duas strings hex em tempo constante. Sempre as usamos com digests de tamanho fixo
 * (64 hex), então o `return false` imediato em tamanhos diferentes não vaza informação útil.
 */
function igualConstante(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Valor esperado do cookie de sessão: HMAC do payload fixo com o secret. Lança se faltar o secret. */
export async function tokenSessao(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET ausente.");
  }
  return hmacHex(secret, PAYLOAD_SESSAO);
}

/** Verdadeiro se o valor do cookie casa com o token esperado (comparação em tempo constante). */
export async function cookieValido(valor: string | undefined | null): Promise<boolean> {
  if (!valor) return false;
  try {
    return igualConstante(valor, await tokenSessao());
  } catch {
    // Secret ausente/má configuração: trata como inválido (não autentica).
    return false;
  }
}

/** Verdadeiro se a senha digitada casa com ADMIN_PASSWORD. Digest neutraliza vazamento de tamanho. */
export async function verificarSenha(senha: string): Promise<boolean> {
  const esperada = process.env.ADMIN_PASSWORD;
  if (!esperada) return false;
  const [a, b] = await Promise.all([sha256Hex(senha), sha256Hex(esperada)]);
  return igualConstante(a, b);
}

/** Opções do cookie de sessão: httpOnly, secure só em produção, sameSite lax, escopo /dashboard. */
export function opcoesCookie() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/dashboard",
    maxAge: 60 * 60 * 24 * 30, // ~30 dias
  };
}
