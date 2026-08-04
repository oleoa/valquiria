import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import { INSTAGRAM_URL } from "@/lib/config";
import { Italico } from "./Secao";
import SecaoMarcaVoz from "./SecaoMarcaVoz";
import SecaoCor from "./SecaoCor";
import SecaoTipografia from "./SecaoTipografia";
import SecaoEspacoForma from "./SecaoEspacoForma";
import SecaoMovimento from "./SecaoMovimento";
import SecaoAtmosferaImagem from "./SecaoAtmosferaImagem";
import SecaoIcones from "./SecaoIcones";
import SecaoComponentes from "./SecaoComponentes";
import SecaoLacunas from "./SecaoLacunas";

export const metadata: Metadata = {
  title: "Design system — Valquiria Abreu",
  description:
    "A referência pública do design system da marca Valquiria Abreu: voz, cor, tipografia, espaço, movimento, ícones e componentes — demonstrados na própria página.",
  openGraph: {
    title: "Design system — Valquiria Abreu",
    description:
      "Voz, cor, tipografia, espaço, movimento, ícones e componentes da marca — demonstrados na própria página.",
    url: "/design",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 1200,
        alt: "Valquiria Abreu — Design system",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  ÍNDICE                                                             */
/* ------------------------------------------------------------------ */

const INDICE: { numero: string; rotulo: string; href: string }[] = [
  { numero: "01", rotulo: "Marca e superfícies", href: "#marca" },
  { numero: "02", rotulo: "Voz e conteúdo", href: "#voz" },
  { numero: "03", rotulo: "Cor", href: "#cor" },
  { numero: "04", rotulo: "Tipografia", href: "#tipografia" },
  { numero: "05", rotulo: "Espaço e layout", href: "#espaco" },
  { numero: "06", rotulo: "Bordas, raios, sombras", href: "#forma" },
  { numero: "07", rotulo: "Movimento e foco", href: "#movimento" },
  { numero: "08", rotulo: "Atmosfera", href: "#atmosfera" },
  { numero: "09", rotulo: "Imagem", href: "#imagem" },
  { numero: "10", rotulo: "Iconografia", href: "#icones" },
  { numero: "11", rotulo: "Componentes", href: "#componentes" },
  { numero: "12", rotulo: "Lacunas e cuidados", href: "#lacunas" },
];

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function DesignPage() {
  return (
    <main className="relative">
      {/* ============================== HEADER ============================== */}
      <header className="relative z-20">
        <Container className="flex items-center justify-between py-3 md:py-4">
          <a
            href="/linktree"
            aria-label="Valquiria Abreu — início"
            className="block"
          >
            <Image
              src="/logo-2.png"
              alt="Valquiria Abreu"
              width={320}
              height={320}
              quality={95}
              priority
              className="h-9 w-auto md:h-11"
            />
          </a>
          <a
            href="#componentes"
            className="hidden text-sm font-medium tracking-wide text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)] md:inline-flex md:items-center md:gap-2"
          >
            Ver componentes
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Container>
      </header>

      {/* ============================== HERO ============================== */}
      <section id="topo" className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />
        <SpiralOrnament className="pointer-events-none absolute right-0 -bottom-32 left-0 z-0 mx-auto h-[44rem] w-[44rem] text-[var(--color-va-blue-light)] opacity-[0.04] md:hidden" />

        <Container className="relative z-10 flex flex-col items-center pt-6 pb-20 text-center md:py-28">
          <RevealOnScroll>
            <p className="mb-8 text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
              Design system
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="mx-auto max-w-4xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl lg:text-7xl">
              Um sistema inteiro, numa página <Italico>só.</Italico>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Voz, cor, tipografia, espaço, movimento, ícones e componentes da
              marca Valquiria Abreu — demonstrados aqui mesmo: esta página é
              feita do sistema que descreve.
            </p>
          </RevealOnScroll>

          {/* Índice de âncoras — a navegação da página (nada fixo além do grain) */}
          <RevealOnScroll delay={420}>
            <nav aria-label="Seções do design system" className="mt-12">
              <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {INDICE.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-baseline gap-2.5 rounded-full border border-[var(--color-va-border)] px-4 py-2.5 text-left text-sm text-[var(--color-va-silver)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]"
                    >
                      <span className="font-mono text-[0.65rem] text-[var(--color-va-silver-mute)]">
                        {item.numero}
                      </span>
                      <span className="truncate">{item.rotulo}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <p className="mt-14 text-[0.65rem] tracking-[0.3em] text-[var(--color-va-silver-mute)] uppercase">
              Cada valor aqui foi lido do código em produção
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================ SEÇÕES ============================ */}
      <SecaoMarcaVoz />
      <SecaoCor />
      <SecaoTipografia />
      <SecaoEspacoForma />
      <SecaoMovimento />
      <SecaoAtmosferaImagem />
      <SecaoIcones />
      <SecaoComponentes />
      <SecaoLacunas />

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
