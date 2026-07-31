import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import { INSTAGRAM_URL } from "@/lib/config";
import FormAnamnese from "./FormAnamnese";

export const metadata: Metadata = {
  title: "Anamnese — Orientação Parental — Valquiria Abreu",
  description:
    "Formulário de anamnese da orientação parental — perguntas sobre a família, a criança e a sua história para preparar a orientação.",
  // Formulário interno — fora do índice de busca.
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA — perguntas (Server Component; o form em si é client)        */
/* ------------------------------------------------------------------ */

export default function FormularioAnamnesePage() {
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

      {/* ============================== HERO ============================== */}
      <section className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />

        <Container className="relative z-10 flex flex-col items-center pt-8 pb-20 text-center md:py-24">
          <RevealOnScroll>
            <Eyebrow>Formulário · Orientação parental</Eyebrow>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="mx-auto max-w-3xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl">
              Anamnese da{" "}
              <span className="italic text-[var(--color-va-silver)]">
                orientação parental.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Estas perguntas me ajudam a conhecer a sua família antes do nosso
              primeiro encontro: a rotina, a história da criança e o que vocês
              têm vivido. Reserve um momento tranquilo para responder com calma
              e sinceridade — não existem respostas certas ou erradas, e tudo o
              que você compartilhar aqui é confidencial.
            </p>
          </RevealOnScroll>

          {/* Form sem RevealOnScroll: renderiza de imediato ao entrar na página,
              sem esperar o scroll levá-lo à viewport. */}
          <div className="mt-12 w-full">
            <FormAnamnese />
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
