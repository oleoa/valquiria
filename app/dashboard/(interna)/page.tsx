import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import {
  contarSubmissoes,
  listarFormularios,
  type FormularioResumo,
} from "@/lib/forms/consultar";
import { SITE_PAGES, GRUPOS_PAGINAS } from "@/lib/site-pages";

export const metadata: Metadata = {
  title: "Painel de Páginas — Valquiria Abreu",
  description:
    "Ferramenta interna: todas as páginas do sistema reunidas em um só lugar.",
  // Uso interno — fora do índice de busca.
  robots: { index: false, follow: false },
};

// Sem isto o painel seria pré-renderizado no build e as stats de respostas congelariam.
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  PÁGINA — painel (Server Component)                                 */
/* ------------------------------------------------------------------ */

export default async function DashboardPage() {
  // Monta os grupos já com as suas páginas e descarta os que ficaram vazios.
  const gruposComPaginas = GRUPOS_PAGINAS.map((grupo) => ({
    ...grupo,
    paginas: SITE_PAGES.filter((pagina) => pagina.categoria === grupo.categoria),
  })).filter((grupo) => grupo.paginas.length > 0);

  const totalFormularios = SITE_PAGES.filter(
    (pagina) => pagina.categoria === "formulario",
  ).length;

  // Stats de respostas: se o banco falhar, esses cards somem — o catálogo nunca quebra.
  let totalRespostas: number | null = null;
  let resumoFormularios: FormularioResumo[] = [];
  try {
    [totalRespostas, resumoFormularios] = await Promise.all([
      contarSubmissoes(),
      listarFormularios(),
    ]);
  } catch (erro) {
    console.error("Painel: falha ao carregar as stats de respostas.", erro);
  }

  return (
    <section className="relative pt-10 pb-20 md:pt-14">
      <Container>
        {/* Cabeçalho compacto */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight font-medium text-[var(--color-va-text)] md:text-4xl">
              Painel
            </h1>
            <p className="mt-1 text-sm text-[var(--color-va-silver-mute)]">
              Mapa do site — todas as páginas do sistema em um só lugar.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4">
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
              Páginas
            </p>
            <p className="mt-1 font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[var(--color-va-text)]">
              {SITE_PAGES.length}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4">
            <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
              Formulários
            </p>
            <p className="mt-1 font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[var(--color-va-text)]">
              {totalFormularios}
            </p>
          </div>

          {totalRespostas !== null && (
            <Link
              href="/dashboard/respostas"
              className="group rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4 transition-colors hover:border-[var(--color-va-border-up)]"
            >
              <p className="flex items-center justify-between text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                Respostas
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </p>
              <p className="mt-1 font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[var(--color-va-text)]">
                {totalRespostas}
              </p>
            </Link>
          )}

          {resumoFormularios.length > 0 && (
            <div className="col-span-2 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4 md:col-span-1">
              <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                Por formulário
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {resumoFormularios.map((f) => (
                  <li
                    key={f.formId}
                    className="flex items-baseline justify-between gap-3 text-xs text-[var(--color-va-silver)]"
                  >
                    <span className="truncate">{f.titulo}</span>
                    <span className="shrink-0 font-medium text-[var(--color-va-text)]">
                      {f.total}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Grupos de páginas */}
        {gruposComPaginas.map((grupo) => (
          <section key={grupo.categoria} className="mt-12">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[0.72rem] font-medium tracking-[0.25em] text-[var(--color-va-silver)] uppercase">
                {grupo.rotulo}
              </h2>
              <span className="text-[0.72rem] tracking-wide text-[var(--color-va-silver-mute)]">
                {grupo.paginas.length}
              </span>
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.paginas.map((pagina) => {
                // Links externos (ex.: formulário Big Five em outro servidor) abrem em nova aba.
                const externo = pagina.href.startsWith("http");
                return (
                  <li key={pagina.href}>
                    <a
                      href={pagina.href}
                      {...(externo && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="group flex h-full flex-col rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base leading-snug font-medium text-[var(--color-va-text)]">
                          {pagina.titulo}
                        </h3>
                        {externo ? (
                          <ExternalLink
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-va-silver-mute)]"
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowRight
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-va-silver-mute)] transition-transform duration-300 group-hover:translate-x-0.5"
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--color-va-silver)] line-clamp-2">
                        {pagina.descricao}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <code className="rounded-md bg-[var(--color-va-bg)] px-1.5 py-0.5 text-[0.7rem] tracking-wide text-[var(--color-va-silver-mute)]">
                          {externo ? "externo" : pagina.href}
                        </code>
                        {pagina.nota && (
                          <span className="rounded-full border border-[var(--color-va-border)] px-2 py-0.5 text-[0.66rem] tracking-wide text-[var(--color-va-silver-mute)]">
                            {pagina.nota}
                          </span>
                        )}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </Container>
    </section>
  );
}
