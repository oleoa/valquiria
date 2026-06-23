import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Inbox } from "lucide-react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import { INSTAGRAM_URL } from "@/lib/config";
import {
  listarSubmissoes,
  contarSubmissoes,
  listarFormularios,
  type Ordem,
} from "@/lib/forms/consultar";
import CabecalhoArea from "../CabecalhoArea";
import FiltrosRespostas from "./FiltrosRespostas";
import CardSubmissao from "./CardSubmissao";

export const metadata: Metadata = {
  title: "Respostas dos formulários — Valquiria Abreu",
  description: "Área interna: respostas recebidas pelos formulários do site.",
  // Área interna — fora do índice de busca.
  robots: { index: false, follow: false },
};

/** Quantas submissões por página. */
const POR_PAGINA = 20;

const FORMATADOR_DATA = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Converte o timestamptz devolvido pelo Neon (texto do Postgres, ex.: "2026-06-26 15:30:00+00")
 * num Date confiável: troca o espaço por "T" e completa o offset curto ("+00" → "+00:00").
 */
function paraData(criadoEm: string): Date {
  const iso = criadoEm.trim().replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00");
  return new Date(iso);
}

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
    <main className="relative">
      <CabecalhoArea ativo="respostas" />

      {/* ============================== HERO ============================== */}
      <section className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-16 -right-10 z-0 hidden h-[32rem] w-[32rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />

        <Container className="relative z-10 flex flex-col items-center pt-12 pb-12 text-center md:pt-20 md:pb-16">
          <Eyebrow>Área interna · respostas</Eyebrow>
          <h1 className="mx-auto max-w-3xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl">
            Respostas dos{" "}
            <span className="italic text-[var(--color-va-silver)]">
              formulários.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
            Tudo que chegou pelos formulários do site, reunido aqui para
            consultar, exportar e organizar.
          </p>
        </Container>
      </section>

      {/* ============================== CONTEÚDO ============================== */}
      <section className="relative pt-4 pb-24 md:pt-8">
        <Container>
          <FiltrosRespostas
            formularios={formularios}
            formId={formId ?? ""}
            busca={busca ?? ""}
            ordem={ordem}
          />

          {/* Contador + exportar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-va-silver-mute)]">
              {total === 0
                ? "Nenhum resultado"
                : `${total} ${total === 1 ? "resultado" : "resultados"}`}
              {temFiltro && " com os filtros atuais"}
            </p>

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

          {/* Lista ou estado vazio */}
          {submissoes.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-va-border-up)] bg-[var(--color-va-bg-soft)] px-6 py-20 text-center">
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
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {submissoes.map((submissao) => (
                <CardSubmissao
                  key={submissao.id}
                  submissao={submissao}
                  dataFormatada={FORMATADOR_DATA.format(paraData(submissao.criadoEm))}
                />
              ))}
            </ul>
          )}

          {/* Paginação */}
          {totalPaginas > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-6"
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
