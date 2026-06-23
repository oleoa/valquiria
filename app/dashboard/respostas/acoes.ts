"use server";

/*
 * Server Action de exclusão de submissão (área interna /dashboard/respostas).
 *
 * Defesa em profundidade: revalida a sessão por conta própria (não confia só no middleware) antes
 * de excluir. Em sucesso, revalida o caminho para a lista re-renderizar sem a linha. Delega a
 * exclusão à camada de dados única (lib/forms/consultar.ts).
 */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { COOKIE_SESSAO, cookieValido } from "@/lib/auth/sessao";
import { excluirSubmissao } from "@/lib/forms/consultar";

export type ResultadoExcluir = { ok: true } | { ok: false; erro: string };

export async function excluir(id: string): Promise<ResultadoExcluir> {
  const cookie = (await cookies()).get(COOKIE_SESSAO)?.value;
  if (!(await cookieValido(cookie))) {
    return { ok: false, erro: "Sessão expirada. Entre novamente." };
  }
  if (!id) {
    return { ok: false, erro: "Submissão inválida." };
  }

  try {
    await excluirSubmissao(id);
    revalidatePath("/dashboard/respostas");
    return { ok: true };
  } catch (e) {
    console.error("Falha ao excluir submissão:", e);
    return { ok: false, erro: "Não foi possível excluir agora. Tente novamente." };
  }
}
