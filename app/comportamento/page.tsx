import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/Container";
import CtaButton from "@/components/CtaButton";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import Faq from "@/components/Faq";
import {
  WHATSAPP_DUVIDAS_URL,
  INSTAGRAM_URL,
  STRIPE_COMBO_URL,
  STRIPE_COMPORTAMENTAL_URL,
} from "@/lib/config";
import { COMPORTAMENTO_FAQ } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Análise de Comportamento — Valquiria Abreu",
  description:
    "Enxergue os padrões que você repete no dia a dia — o que te impulsiona e o que te sabota. 2 sessões online, relatório personalizado e 10 dias de suporte no WhatsApp com a mentora comportamental Valquiria Abreu.",
  openGraph: {
    title: "Análise de Comportamento — Valquiria Abreu",
    description:
      "Enxergue os padrões que você repete no dia a dia — o que te impulsiona e o que te sabota. 2 sessões online, relatório personalizado e 10 dias de suporte no WhatsApp.",
    url: "/comportamento",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 1200,
        alt: "Valquiria Abreu — Análise de Comportamento",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function ComportamentoPage() {
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
            href="#investimento"
            className="hidden text-sm font-medium tracking-wide text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)] md:inline-flex md:items-center md:gap-2"
          >
            Ver investimento
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Container>
      </header>

      {/* ============================== HERO ============================== */}
      <section id="topo" className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />
        <SpiralOrnament className="pointer-events-none absolute right-0 -bottom-32 left-0 z-0 mx-auto h-[44rem] w-[44rem] text-[var(--color-va-blue-light)] opacity-[0.04] md:hidden" />

        <Container className="relative z-10 flex flex-col items-center pt-6 pb-20 text-center md:min-h-[88vh] md:justify-center md:py-28">
          <RevealOnScroll>
            <p className="mb-8 text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
              Análise comportamental · autoconhecimento
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="mx-auto max-w-4xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl lg:text-7xl">
              Você decide mudar — mas o{" "}
              <span className="italic text-[var(--color-va-silver)]">
                padrão
              </span>{" "}
              continua o mesmo. Por quê?
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              A Análise de Comportamento revela os padrões que você repete no dia
              a dia — o que te impulsiona, o que te sabota e como mudar de verdade.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={420}>
            <div className="mt-12">
              <CtaButton href="#investimento">
                Quero entender meus padrões
              </CtaButton>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <div className="mt-16 hidden flex-col items-center gap-3 md:flex">
              <span className="text-[0.65rem] tracking-[0.3em] text-[var(--color-va-silver-mute)] uppercase">
                Role para entender
              </span>
              <span className="h-10 w-px bg-gradient-to-b from-[var(--color-va-silver-mute)] to-transparent" />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ====================== IDENTIFICAÇÃO / O PROBLEMA ====================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Os padrões que se repetem</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Talvez você reconheça{" "}
              <span className="italic text-[var(--color-va-silver)]">
                estas cenas.
              </span>
            </h2>
          </RevealOnScroll>

          {/* Litania: 3 cenas próximas, com divisores curtos entre elas. */}
          <RevealOnScroll>
            <ul className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 md:mt-20 md:gap-10">
              {[
                "Você decide mudar, mas na hora age exatamente como sempre agiu.",
                "As mesmas reações voltam — no trabalho, com as pessoas, com você mesma.",
                "Você sabe o que fazer. Só não consegue sustentar quando mais importa.",
              ].map((frase, idx, arr) => (
                <li
                  key={frase}
                  className="flex w-full flex-col items-center gap-8 md:gap-10"
                >
                  <p className="text-center font-[family-name:var(--font-cormorant)] text-2xl leading-[1.25] font-light text-[var(--color-va-text)] italic md:text-4xl lg:text-[2.75rem]">
                    &ldquo;{frase}&rdquo;
                  </p>
                  {idx < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="h-px w-16 bg-[var(--color-va-border-up)]"
                    />
                  )}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-va-silver)] md:mt-20 md:text-xl">
              Não é falta de disciplina nem de vontade. São padrões de
              comportamento rodando no automático — e dá para enxergá-los.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== A SOLUÇÃO ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Quando o padrão fica visível, ele perde o controle</Eyebrow>
          </RevealOnScroll>

          <RevealOnScroll>
            <figure className="mx-auto max-w-4xl text-center">
              <svg
                viewBox="0 0 64 48"
                className="mx-auto h-10 w-12 text-[var(--color-va-blue-light)] opacity-50 md:h-12 md:w-16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 0C6 0 0 7 0 16v32h22V16h-8c0-4 3-8 8-8V0H14zm32 0c-8 0-14 7-14 16v32h22V16h-8c0-4 3-8 8-8V0H46z" />
              </svg>

              <blockquote className="mt-8 font-[family-name:var(--font-cormorant)] text-2xl leading-[1.4] font-light text-[var(--color-va-text)] italic md:text-4xl lg:text-[2.5rem]">
                Quando você enxerga o que repete, para de ser refém do automático
                e começa a fazer{" "}
                <span className="text-[var(--color-va-silver)]">
                  mudanças reais
                </span>
                .
              </blockquote>

              <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
                Mapear os seus padrões de comportamento é o que transforma
                intenção em ação que se sustenta.
              </p>
            </figure>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== COMO FUNCIONA ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Como funciona a análise</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Um processo de{" "}
              <span className="italic text-[var(--color-va-silver)]">
                profundidade.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-20 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
              {[
                {
                  icone: (
                    <>
                      <rect x="2" y="5" width="14" height="14" rx="2" />
                      <path d="M16 10l5-3v10l-5-3z" />
                    </>
                  ),
                  titulo: "2 sessões online",
                  corpo:
                    "Dois encontros ao vivo comigo, online, onde mapeamos os seus padrões de comportamento.",
                },
                {
                  icone: (
                    <>
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M9 8h6" />
                      <path d="M9 12h6" />
                      <path d="M9 16h4" />
                    </>
                  ),
                  titulo: "Relatório personalizado",
                  corpo:
                    "Um relatório só seu: os padrões que te movem e te travam, e a melhor estratégia para agir diferente.",
                },
                {
                  icone: (
                    <>
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </>
                  ),
                  titulo: "10 dias de suporte",
                  corpo:
                    "Dez dias de acompanhamento pelo WhatsApp para sustentar as suas primeiras mudanças.",
                },
              ].map((card) => (
                <article
                  key={card.titulo}
                  className="flex flex-col rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)] md:p-8"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-[var(--color-va-blue-light)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {card.icone}
                  </svg>
                  <h3 className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
                    {card.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
                    {card.corpo}
                  </p>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== O QUE VOCÊ DESCOBRE ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>O que você descobre</Eyebrow>
            <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Ao final, você enxerga o que{" "}
              <span className="italic text-[var(--color-va-silver)]">
                antes era automático.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <ul className="mx-auto mt-16 max-w-2xl space-y-6">
              {[
                "Os padrões de comportamento que você repete sem perceber.",
                "O que, no seu jeito de agir, te impulsiona rumo aos seus objetivos.",
                "O que te sabota — e por que certas reações sempre voltam.",
                "A estratégia para agir diferente quando mais importa.",
                "Os cuidados que você deve tomar para sustentar a mudança.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <Check
                    className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-va-blue-light)]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== INVESTIMENTO ============================== */}
      <section
        id="investimento"
        className="relative scroll-mt-20 bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow>Investimento</Eyebrow>
          </RevealOnScroll>

          {/* Card em destaque: a Análise de Comportamento */}
          <RevealOnScroll>
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-va-blue)]/40 bg-[var(--color-va-bg)] p-10 shadow-[0_40px_100px_-40px_rgba(47,88,120,0.3)] md:p-14">
                <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-va-blue)] opacity-10 blur-3xl" />

                <div className="relative">
                  <p className="text-center text-sm tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
                    Análise de Comportamento
                  </p>

                  <div className="mt-8 flex items-baseline justify-center gap-3">
                    <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)] md:text-base">
                      R$
                    </span>
                    <span className="font-[family-name:var(--font-cormorant)] text-7xl leading-none font-light text-[var(--color-va-text)] md:text-8xl">
                      497
                    </span>
                  </div>

                  <p className="mt-4 text-center text-sm text-[var(--color-va-silver-mute)]">
                    Pagamento único
                  </p>

                  <div className="mt-10 h-px w-full bg-[var(--color-va-border-up)]" />

                  <ul className="mt-10 space-y-4">
                    {[
                      "2 sessões online comigo",
                      "Relatório personalizado com os seus padrões",
                      "Estratégia para agir diferente no dia a dia",
                      "10 dias de suporte no WhatsApp",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check
                          className="h-5 w-5 flex-shrink-0 text-[var(--color-va-blue-light)]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <span className="text-base text-[var(--color-va-silver)] md:text-lg">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 flex justify-center">
                    <CtaButton href={STRIPE_COMPORTAMENTAL_URL}>
                      Quero a análise de comportamento
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Card secundário: combo como upsell */}
          <RevealOnScroll>
            <div className="mx-auto mt-6 max-w-2xl">
              <div className="rounded-3xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-8 md:p-10">
                <div className="flex justify-center">
                  <span className="rounded-full border border-[var(--color-va-blue)]/50 bg-[var(--color-va-blue)]/15 px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.2em] text-[var(--color-va-silver)] uppercase">
                    Leve as duas análises juntas
                  </span>
                </div>

                <p className="mt-6 text-center text-sm text-[var(--color-va-silver-mute)]">
                  De <span className="line-through">R$ 994</span> por
                </p>

                <div className="mt-2 flex items-baseline justify-center gap-2">
                  <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)]">
                    R$
                  </span>
                  <span className="font-[family-name:var(--font-cormorant)] text-6xl leading-none font-light text-[var(--color-va-text)]">
                    894
                  </span>
                </div>

                <p className="mt-4 text-center text-sm text-[var(--color-va-silver-mute)]">
                  Análise de Comportamento + Análise de Temperamento · economize R$ 100
                </p>

                <div className="mt-8 flex justify-center">
                  <a
                    href={STRIPE_COMBO_URL}
                    target={STRIPE_COMBO_URL.startsWith("http") ? "_blank" : undefined}
                    rel={
                      STRIPE_COMBO_URL.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-va-border-up)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--color-va-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]"
                  >
                    <span>Quero as duas análises</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Dúvidas */}
          <RevealOnScroll>
            <p className="mt-12 text-center text-sm text-[var(--color-va-silver-mute)]">
              Ficou com dúvida?{" "}
              <a
                href={WHATSAPP_DUVIDAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-va-silver)] underline decoration-[var(--color-va-border-up)] underline-offset-4 transition-colors hover:text-[var(--color-va-text)]"
              >
                Fale comigo no WhatsApp
              </a>
              .
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Antes de{" "}
              <span className="italic text-[var(--color-va-silver)]">
                começar.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-16">
              <Faq items={COMPORTAMENTO_FAQ} />
            </div>
          </RevealOnScroll>
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
                href={WHATSAPP_DUVIDAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-va-text)]"
              >
                WhatsApp
              </a>
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
