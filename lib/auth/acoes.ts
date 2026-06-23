"use server";

/*
 * Server Actions de autenticação da área protegida (/dashboard).
 *
 * `entrar` valida a senha e seta o cookie de sessão; NÃO redireciona — o client navega só no
 * sucesso (mesmo padrão dos formulários em lib/forms/enviar.ts). `sair` apaga o cookie e
 * redireciona para o login (aqui o redirect() é intencional). A lógica de cookie/crypto mora na
 * fonte única lib/auth/sessao.ts.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_SESSAO,
  opcoesCookie,
  tokenSessao,
  verificarSenha,
} from "@/lib/auth/sessao";

/** Resultado tipado para o client decidir navegação (ok) ou mostrar erro. */
export type ResultadoLogin = { ok: true } | { ok: false; erro: string };

/**
 * Valida a senha de admin. Em caso de sucesso, grava o cookie de sessão e retorna { ok: true } —
 * o client então navega para `next`. Em erro, retorna a mensagem para exibir.
 */
export async function entrar(senha: string): Promise<ResultadoLogin> {
  if (!(await verificarSenha(senha))) {
    return { ok: false, erro: "Senha incorreta. Tente novamente." };
  }
  const jar = await cookies();
  jar.set(COOKIE_SESSAO, await tokenSessao(), opcoesCookie());
  return { ok: true };
}

/** Logout: apaga o cookie de sessão e volta para a tela de login. */
export async function sair(): Promise<void> {
  const jar = await cookies();
  jar.delete({ name: COOKIE_SESSAO, path: "/dashboard" });
  redirect("/dashboard/login");
}
