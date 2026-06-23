/*
 * Proteção da área interna: TODO o /dashboard exige sessão de admin.
 *
 * É o antigo "middleware" do Next — a partir do Next 16 a convenção passou a se chamar "proxy"
 * (arquivo proxy.ts + função exportada `proxy`); o comportamento é o mesmo. Deixa passar só a tela
 * de login; nas demais rotas /dashboard exige o cookie de sessão válido (assinado em
 * lib/auth/sessao.ts — Web Crypto, roda neste runtime). Sem cookie válido, redireciona para
 * /dashboard/login?next=<rota>, para voltar ao destino após entrar.
 */

import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESSAO, cookieValido } from "@/lib/auth/sessao";

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // A tela de login precisa ser pública, senão ninguém consegue autenticar.
  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_SESSAO)?.value;
  if (await cookieValido(cookie)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/dashboard/login";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
