import Image from "next/image";
import Container from "@/components/Container";
import { INSTAGRAM_URL } from "@/lib/config";

/*
 * Rodapé compartilhado da área interna (/dashboard e login). Fica fora do grupo
 * (interna) porque a tela de login — que não usa o layout do grupo — também o renderiza.
 */

export default function RodapeArea() {
  return (
    <footer className="relative border-t border-[var(--color-va-border)] py-12">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <Image
            src="/logo-2.png"
            alt="Valquiria Abreu"
            width={512}
            height={512}
            quality={100}
            className="h-11 w-auto opacity-80 md:h-12"
          />

          <nav
            className="flex items-center gap-8 text-sm text-[var(--color-va-silver-mute)]"
            aria-label="Rodapé"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-va-text)]"
            >
              Instagram
            </a>
          </nav>
        </div>

        <p className="mt-10 text-center text-xs tracking-wide text-[var(--color-va-silver-mute)]/70">
          © {new Date().getFullYear()} Valquiria Abreu · Todos os direitos
          reservados
        </p>
      </Container>
    </footer>
  );
}
