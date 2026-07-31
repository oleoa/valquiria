"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { cn } from "@/lib/cn";
import { sair } from "@/lib/auth/acoes";

/*
 * Cabeçalho compartilhado da área interna protegida, renderizado pelo layout do grupo
 * (interna). É client para descobrir a rota atual via usePathname e marcar o link ativo.
 * O botão "Sair" continua num <form> com a Server Action `sair` — funciona sem JS.
 */

const LINK_BASE = "text-sm tracking-wide transition-colors hover:text-[var(--color-va-text)]";

export default function CabecalhoArea() {
  const pathname = usePathname();
  const ativo: "painel" | "respostas" | undefined =
    pathname === "/dashboard"
      ? "painel"
      : pathname.startsWith("/dashboard/respostas")
        ? "respostas"
        : undefined;

  return (
    <header className="relative z-20 border-b border-[var(--color-va-border)]">
      <Container className="flex items-center justify-between gap-4 py-3 md:py-4">
        <Link
          href="/"
          aria-label="Valquiria Abreu — início"
          className="block shrink-0"
        >
          <Image
            src="/logo-2.png"
            alt="Valquiria Abreu"
            width={320}
            height={320}
            quality={95}
            priority
            className="h-7 w-auto md:h-9"
          />
        </Link>

        <nav
          className="flex items-center gap-5 md:gap-7"
          aria-label="Área interna"
        >
          <Link
            href="/dashboard"
            aria-current={ativo === "painel" ? "page" : undefined}
            className={cn(
              LINK_BASE,
              ativo === "painel"
                ? "text-[var(--color-va-text)]"
                : "text-[var(--color-va-silver-mute)]",
            )}
          >
            Painel
          </Link>
          <Link
            href="/dashboard/respostas"
            aria-current={ativo === "respostas" ? "page" : undefined}
            className={cn(
              LINK_BASE,
              ativo === "respostas"
                ? "text-[var(--color-va-text)]"
                : "text-[var(--color-va-silver-mute)]",
            )}
          >
            Respostas
          </Link>

          <form action={sair}>
            <button
              type="submit"
              className="rounded-full border border-[var(--color-va-border)] px-4 py-1.5 text-[0.8rem] tracking-wide text-[var(--color-va-silver)] transition-colors hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]"
            >
              Sair
            </button>
          </form>
        </nav>
      </Container>
    </header>
  );
}
