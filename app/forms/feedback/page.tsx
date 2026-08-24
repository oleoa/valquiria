import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SpiralOrnament from "@/components/SpiralOrnament";
import { INSTAGRAM_URL } from "@/lib/config";
import FormFeedback from "./FormFeedback";

export const metadata: Metadata = {
  title: "Seu feedback sobre a jornada — Valquiria Abreu",
  description:
    "Formulário de feedback da jornada — oito perguntas rápidas sobre o que te marcou, o que ajudou e o que poderia ter sido diferente.",
  // Formulário interno — fora do índice de busca.
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA — feedback (Server Component; o fluxo em si é client)        */
/* ------------------------------------------------------------------ */

/*
 * Diferente dos outros formulários, aqui a abertura (título + texto de boas-vindas) mora
 * DENTRO do componente client: ela é a primeira tela do fluxo e some quando a pessoa
 * clica em "Começar". Esta página fica só com a casca on-brand (header, glow, rodapé).
 */

export default function FormularioFeedbackPage() {
  return (
    <main className="relative">
      {/* ============================== HEADER ============================== */}
      <header className="relative z-20">
        <Container className="flex items-center justify-between py-3 md:py-4">
          <Link href="/" aria-label="Valquiria Abreu — início" className="block">
            <Image
              src="/logo-2.png"
              alt="Valquiria Abreu"
              width={320}
              height={320}
              quality={95}
              priority
              className="h-9 w-auto md:h-11"
            />
          </Link>
        </Container>
      </header>

      {/* =============================== FLUXO =============================== */}
      <section className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />

        <Container className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center py-16 text-center md:py-24">
          <div className="w-full">
            <FormFeedback />
          </div>
        </Container>
      </section>

      {/* ============================== FOOTER ============================== */}
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
    </main>
  );
}
