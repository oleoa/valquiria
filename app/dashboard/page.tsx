import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import { cn } from "@/lib/cn";
import { INSTAGRAM_URL } from "@/lib/config";
import { SITE_PAGES, GRUPOS_PAGINAS } from "@/lib/site-pages";

export const metadata: Metadata = {
  title: "Painel de Páginas — Valquiria Abreu",
  description:
    "Ferramenta interna: todas as páginas do sistema reunidas em um só lugar.",
  // Uso interno — fora do índice de busca.
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  // Monta os grupos já com as suas páginas e descarta os que ficaram vazios,
  // para a faixa de fundo alternada usar o índice realmente exibido.
  const gruposComPaginas = GRUPOS_PAGINAS.map((grupo) => ({
    ...grupo,
    paginas: SITE_PAGES.filter((pagina) => pagina.categoria === grupo.categoria),
  })).filter((grupo) => grupo.paginas.length > 0);

  return (
    <main className="relative">
      {/* ============================== HERO ============================== */}
      <section className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-16 -right-10 z-0 hidden h-[32rem] w-[32rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />

        <Container className="relative z-10 flex flex-col items-center pt-10 pb-16 text-center md:py-24">
          <RevealOnScroll>
            <p className="mb-8 text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
              Uso interno · mapa do site
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="mx-auto max-w-4xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl lg:text-7xl">
              Todas as páginas do sistema,{" "}
              <span className="italic text-[var(--color-va-silver)]">
                reunidas aqui.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Use este painel para navegar entre as páginas de produto, as
              páginas públicas e as rotas do sistema — tudo em um só lugar.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="mt-10 text-[0.7rem] tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
              {SITE_PAGES.length} páginas catalogadas
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== GRUPOS ============================== */}
      {gruposComPaginas.map((grupo, i) => (
        <section
          key={grupo.categoria}
          className={cn(
            "relative py-24 md:py-32 lg:py-40",
            i % 2 === 1 && "bg-[var(--color-va-bg-soft)]",
          )}
        >
          <Container>
            <RevealOnScroll>
              <Eyebrow>
                {grupo.paginas.length}{" "}
                {grupo.paginas.length === 1 ? "página" : "páginas"}
              </Eyebrow>
              <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-5xl lg:text-6xl">
                {grupo.rotulo}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
                {grupo.descricao}
              </p>
            </RevealOnScroll>

            <RevealOnScroll>
              <ul className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {grupo.paginas.map((pagina, idx) => {
                  // Links externos (ex.: formulário Big Five em outro servidor) abrem em nova aba.
                  const externo = pagina.href.startsWith("http");
                  return (
                  <RevealOnScroll as="li" delay={idx * 80} key={pagina.href}>
                    <a
                      href={pagina.href}
                      {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)] md:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
                          {pagina.titulo}
                        </h3>
                        <ArrowRight
                          className="mt-1 h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
                        {pagina.descricao}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <code className="rounded-md bg-[var(--color-va-bg)] px-2 py-1 text-xs tracking-wide text-[var(--color-va-silver-mute)]">
                          {pagina.href}
                        </code>
                        {pagina.nota && (
                          <span className="rounded-full border border-[var(--color-va-border)] px-3 py-1 text-[0.7rem] tracking-wide text-[var(--color-va-silver-mute)]">
                            {pagina.nota}
                          </span>
                        )}
                      </div>
                    </a>
                  </RevealOnScroll>
                  );
                })}
              </ul>
            </RevealOnScroll>
          </Container>
        </section>
      ))}

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
