import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Container from "@/components/Container";
import { obterSubmissao } from "@/lib/forms/consultar";
import { formatarDataHora, formatarDataLonga } from "@/lib/forms/datas";
import BotaoCopiar from "./BotaoCopiar";
import BotaoExcluir from "./BotaoExcluir";

export const metadata: Metadata = {
  title: "Resposta — Valquiria Abreu",
  description: "Área interna: detalhe de uma resposta de formulário.",
  // Área interna — fora do índice de busca.
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA — detalhe de uma resposta (Server Component)                */
/* ------------------------------------------------------------------ */

export default async function DetalheRespostaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submissao = await obterSubmissao(id);
  if (!submissao) notFound();

  // Texto do "Copiar tudo": cabeçalho com contexto + pares pergunta/resposta.
  const textoCompleto = [
    `${submissao.titulo} — ${formatarDataHora(submissao.criadoEm)}`,
    ...(submissao.nome ? [`Nome: ${submissao.nome}`] : []),
    ...(submissao.email ? [`E-mail: ${submissao.email}`] : []),
    ...(submissao.telefone ? [`Telefone: ${submissao.telefone}`] : []),
    "",
    ...submissao.respostas.map((r) => `${r.pergunta}\n${r.resposta || "—"}`),
  ].join("\n");

  const telefoneDigitos = submissao.telefone?.replace(/\D/g, "") ?? "";

  return (
    <section className="relative pt-10 pb-20 md:pt-14">
      <Container className="max-w-3xl">
        {/* Voltar */}
        <Link
          href="/dashboard/respostas"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-va-silver-mute)] transition-colors hover:text-[var(--color-va-text)]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          Respostas
        </Link>

        {/* Cabeçalho */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="rounded-full border border-[var(--color-va-border)] px-3 py-1 text-[0.7rem] tracking-wide text-[var(--color-va-silver-mute)]">
              {submissao.titulo}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl leading-tight font-medium text-[var(--color-va-text)] md:text-4xl">
              {submissao.nome || "Sem nome informado"}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-va-silver-mute)]">
              <time>{formatarDataLonga(submissao.criadoEm)}</time>
            </p>

            <div className="mt-4 flex flex-col gap-1.5 text-sm text-[var(--color-va-silver)]">
              {submissao.email && (
                <a
                  href={`mailto:${submissao.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-va-text)]"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  <span className="break-all">{submissao.email}</span>
                </a>
              )}
              {submissao.telefone && (
                <a
                  href={`tel:${telefoneDigitos}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-va-text)]"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  {submissao.telefone}
                </a>
              )}
              {!submissao.nome && !submissao.email && !submissao.telefone && (
                <span className="text-[var(--color-va-silver-mute)]">
                  Sem dados de contato extraídos.
                </span>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <BotaoCopiar texto={textoCompleto} rotulo="Copiar tudo" />
            <BotaoExcluir id={submissao.id} />
          </div>
        </div>

        {/* Respostas completas */}
        <div className="mt-10 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
            {submissao.respostas.length}{" "}
            {submissao.respostas.length === 1 ? "resposta" : "respostas"}
          </p>

          <dl className="mt-6 flex flex-col gap-6">
            {submissao.respostas.map((r, i) => (
              <div
                key={i}
                className="group border-b border-[var(--color-va-border)] pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-[0.72rem] font-medium tracking-[0.12em] text-[var(--color-va-silver-mute)] uppercase">
                    {r.pergunta}
                  </dt>
                  {/* Aparece no hover no desktop; sempre visível no touch. */}
                  <BotaoCopiar
                    texto={r.resposta || "—"}
                    compacto
                    className="shrink-0 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  />
                </div>
                <dd className="mt-1.5 text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-va-text)] md:text-base">
                  {r.resposta || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
