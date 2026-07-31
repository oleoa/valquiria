import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Inbox } from "lucide-react";
import Container from "@/components/Container";
import {
  listarSubmissoes,
  contarSubmissoes,
  listarFormularios,
  type Ordem,
} from "@/lib/forms/consultar";
import FiltrosRespostas from "./FiltrosRespostas";
import TabelaRespostas from "./TabelaRespostas";

export const metadata: Metadata = {
  title: "Respostas dos formulários — Valquiria Abreu",
  description: "Área interna: respostas recebidas pelos formulários do site.",
  // Área interna — fora do índice de busca.
  robots: { index: false, follow: false },
};

/** Quantas submissões por página. */
const POR_PAGINA = 20;

/* ------------------------------------------------------------------ */
/*  PÁGINA — respostas (Server Component)                              */
/* ------------------------------------------------------------------ */

export default async function RespostasPage({
  searchParams,
}: {
  searchParams: Promise<{
    form?: string;
    q?: string;
    ordem?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;
  const formId = sp.form?.trim() || undefined;
  const busca = sp.q?.trim() || undefined;
  const ordem: Ordem = sp.ordem === "asc" ? "asc" : "desc";
  const pagina = Math.max(1, Number(sp.page) || 1);
  const offset = (pagina - 1) * POR_PAGINA;

  const [formularios, total, submissoes] = await Promise.all([
    listarFormularios(),
    contarSubmissoes({ formId, busca }),
    listarSubmissoes({ formId, busca, ordem, limite: POR_PAGINA, offset }),
  ]);

  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const temFiltro = Boolean(formId || busca);

  // Monta uma query string preservando os filtros atuais (omitindo os valores padrão).
  function queryComFiltros(extra?: Record<string, string>): string {
    const params = new URLSearchParams();
    if (formId) params.set("form", formId);
    if (busca) params.set("q", busca);
    if (ordem !== "desc") params.set("ordem", ordem);
    for (const [chave, valor] of Object.entries(extra ?? {})) {
      if (valor) params.set(chave, valor);
    }
    return params.toString();
  }

  const qsExport = queryComFiltros();
  const hrefExport = `/dashboard/respostas/export${qsExport ? `?${qsExport}` : ""}`;

  function hrefPagina(p: number): string {
    const qs = queryComFiltros(p > 1 ? { page: String(p) } : undefined);
    return qs ? `/dashboard/respostas?${qs}` : "/dashboard/respostas";
  }

  return (
    <section className="relative pt-10 pb-20 md:pt-14">
      <Container>
        {/* Cabeçalho compacto */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight font-medium text-[var(--color-va-text)] md:text-4xl">
              Respostas
            </h1>
            <p className="mt-1 text-sm text-[var(--color-va-silver-mute)]">
              {total === 0
                ? "Nenhum resultado"
                : `${total} ${total === 1 ? "resposta" : "respostas"}`}
              {temFiltro && " com os filtros atuais"}
            </p>
          </div>

          {total > 0 && (
            <a
              href={hrefExport}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-va-border)] px-5 py-2.5 text-sm font-medium tracking-wide text-[var(--color-va-silver)] transition-colors hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]"
            >
              <Download className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              Exportar CSV
            </a>
          )}
        </div>

        <div className="mt-6">
          <FiltrosRespostas
            formularios={formularios}
            formId={formId ?? ""}
            busca={busca ?? ""}
            ordem={ordem}
          />
        </div>

        {/* Tabela ou estado vazio */}
        {submissoes.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-va-border-up)] bg-[var(--color-va-bg-soft)] px-6 py-20 text-center">
            <Inbox
              className="h-9 w-9 text-[var(--color-va-silver-mute)]"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <p className="mt-5 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[var(--color-va-text)]">
              {temFiltro
                ? "Nenhuma resposta com esse filtro"
                : "Ainda não há respostas"}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
              {temFiltro
                ? "Tente ajustar a busca ou trocar o formulário selecionado."
                : "Assim que alguém preencher um formulário do site, a resposta aparece aqui."}
            </p>
            {temFiltro && (
              <Link
                href="/dashboard/respostas"
                className="mt-6 text-sm font-medium text-[var(--color-va-blue)] underline-offset-4 transition-colors hover:text-[var(--color-va-blue-light)] hover:underline"
              >
                Limpar filtros
              </Link>
            )}
          </div>
        ) : (
          <TabelaRespostas submissoes={submissoes} />
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-6"
            aria-label="Paginação"
          >
            {pagina > 1 ? (
              <Link
                href={hrefPagina(pagina - 1)}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)]"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                Anterior
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-va-silver-mute)]/50">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                Anterior
              </span>
            )}

            <span className="text-sm tracking-wide text-[var(--color-va-silver-mute)]">
              Página {pagina} de {totalPaginas}
            </span>

            {pagina < totalPaginas ? (
              <Link
                href={hrefPagina(pagina + 1)}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)]"
              >
                Próxima
                <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-va-silver-mute)]/50">
                Próxima
                <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
            )}
          </nav>
        )}
      </Container>
    </section>
  );
}
