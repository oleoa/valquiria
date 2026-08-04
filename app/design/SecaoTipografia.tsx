import RevealOnScroll from "@/components/RevealOnScroll";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";

/* Seção 04 — Tipografia. Espécimes vivos, renderizados nas classes reais. */

/** Linha de especificação em mono acima de cada espécime. */
function Spec({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.7rem] leading-relaxed text-[var(--color-va-silver-mute)]">
      {children}
    </p>
  );
}

export default function SecaoTipografia() {
  return (
    <Secao
      id="tipografia"
      eyebrow="04 · Tipografia"
      titulo={
        <>
          Serifa para a voz, sans para a <Italico>informação.</Italico>
        </>
      }
      lead={
        <>
          Cormorant Garamond (peso 300, muitas vezes itálico) para títulos,
          citações, litanias, preços e até os números do painel. Inter (400/500)
          para corpo, rótulos, botões e tabelas. A escala é grande e confiante;
          os micro-rótulos são minúsculos e compensam com tracking largo.
        </>
      }
    >
      <div className="mt-16 space-y-10">
        {/* Hero / h1 */}
        <RevealOnScroll>
          <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
            <Spec>Hero · h1 — 2.25 → 3.75 → 4.5rem · Cormorant 300 · leading 1.08</Spec>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl lg:text-7xl">
              Você não está cansada <Italico>de fazer.</Italico>
            </p>
          </div>
        </RevealOnScroll>

        {/* h2 de seção */}
        <RevealOnScroll>
          <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
            <Spec>h2 de seção — 2.25 → 3.75rem · Cormorant 300 · leading 1.1</Spec>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              A cada mês, uma camada <Italico>se desfaz.</Italico>
            </p>
          </div>
        </RevealOnScroll>

        {/* Citação + litania */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
          <RevealOnScroll>
            <div className="h-full rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
              <Spec>Citação — 1.5 → 2.25 → 2.5rem · Cormorant 300 itálico · leading 1.4</Spec>
              <p className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-[1.4] font-light text-[var(--color-va-text)] italic md:text-4xl">
                Ninguém muda o que ainda não reconheceu.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="h-full rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
              <Spec>Litania — 1.5 → 2.25 → 2.75rem · Cormorant 300 itálico · leading 1.25</Spec>
              <p className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-[1.25] font-light text-[var(--color-va-text)] italic md:text-4xl">
                Sempre exausta.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Título de card + preço */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
          <RevealOnScroll>
            <div className="h-full rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
              <Spec>Título de card — 1.5 → 1.875rem · Cormorant 500 · leading tight</Spec>
              <p className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)] md:text-3xl">
                Análise de Temperamento
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="h-full rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
              <Spec>Preço — 4.5 → 6rem · Cormorant 300 · leading 1</Spec>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)] md:text-base">
                  R$
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-7xl leading-none font-light text-[var(--color-va-text)] md:text-8xl">
                  497
                </span>
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Corpo */}
        <RevealOnScroll>
          <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
            <Spec>Corpo — 1rem → 1.125 (lg) → 1.25rem (xl) · Inter 400 · leading 1.625</Spec>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
              Não é falta de organização nem de vontade. É um jeito de viver que
              pede, com urgência, para mudar — e mudar começa por entender o que
              sustenta o padrão.
            </p>
          </div>
        </RevealOnScroll>

        {/* Micro-rótulos */}
        <RevealOnScroll>
          <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-10">
            <Spec>Micro-rótulos — 0.65 a 0.72rem · Inter 500 · caixa alta · tracking 0.18 a 0.32em</Spec>
            <ul className="mt-8 space-y-6">
              <li className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[0.7rem] font-medium tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
                  Eyebrow de seção
                </span>
                <Spec>0.7rem · 0.25em</Spec>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
                  Kicker do hero
                </span>
                <Spec>0.72rem · 0.32em</Spec>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                  Rótulo de campo
                </span>
                <Spec>0.72rem · 0.18em</Spec>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[0.65rem] tracking-[0.3em] text-[var(--color-va-silver-mute)] uppercase">
                  Hint de scroll
                </span>
                <Spec>0.65rem · 0.3em</Spec>
              </li>
            </ul>
          </div>
        </RevealOnScroll>
      </div>

      {/* Origem das fontes */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <SubTitulo>Origem das fontes</SubTitulo>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
            Cormorant Garamond e Inter vêm do Google Fonts via{" "}
            <Codigo>next/font/google</Codigo> em <Codigo>app/layout.tsx</Codigo>,
            expostas como <Codigo>--font-cormorant</Codigo> e{" "}
            <Codigo>--font-inter</Codigo>. Não há arquivo de fonte local.
          </p>
        </div>
      </RevealOnScroll>
    </Secao>
  );
}
