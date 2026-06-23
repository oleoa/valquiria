"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, Trash2, ChevronDown } from "lucide-react";
import type { Submissao } from "@/lib/forms/consultar";
import { excluir } from "./acoes";

/*
 * Card de uma submissão. É client só por causa da exclusão: o botão "Excluir" pede confirmação
 * inline (vira "Confirmar exclusão? / Cancelar") e, ao confirmar, chama a Server Action `excluir`.
 * Em sucesso, o revalidatePath da action re-renderiza a lista sem este card. A data já chega
 * formatada do server.
 */

export default function CardSubmissao({
  submissao,
  dataFormatada,
}: {
  submissao: Submissao;
  dataFormatada: string;
}) {
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciar] = useTransition();

  function aoExcluir() {
    setErro(null);
    iniciar(async () => {
      const resultado = await excluir(submissao.id);
      if (!resultado.ok) {
        setErro(resultado.erro);
        setConfirmando(false);
      }
      // Sucesso: revalidatePath re-renderiza a lista já sem este card.
    });
  }

  const semContato = !submissao.nome && !submissao.email && !submissao.telefone;

  return (
    <li className="flex h-full flex-col rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-7">
      {/* Cabeçalho: badge do formulário + data */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className="rounded-full border border-[var(--color-va-border)] px-3 py-1 text-[0.68rem] tracking-wide text-[var(--color-va-silver-mute)]">
          {submissao.titulo}
        </span>
        <time className="text-xs tracking-wide text-[var(--color-va-silver-mute)]">
          {dataFormatada}
        </time>
      </div>

      {/* Contato */}
      <div className="mt-4">
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
          {submissao.nome || "Sem nome informado"}
        </h3>
        <div className="mt-2 flex flex-col gap-1.5 text-sm text-[var(--color-va-silver)]">
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
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
              {submissao.telefone}
            </span>
          )}
          {semContato && (
            <span className="text-[var(--color-va-silver-mute)]">
              Sem dados de contato extraídos.
            </span>
          )}
        </div>
      </div>

      {/* Respostas completas */}
      <details className="group mt-5 border-t border-[var(--color-va-border)] pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)]">
          <span>
            Ver respostas
            <span className="text-[var(--color-va-silver-mute)]">
              {" "}
              ({submissao.respostas.length})
            </span>
          </span>
          <ChevronDown
            className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </summary>
        <dl className="mt-4 flex flex-col gap-4">
          {submissao.respostas.map((r, i) => (
            <div key={i}>
              <dt className="text-[0.72rem] font-medium tracking-[0.12em] text-[var(--color-va-silver-mute)] uppercase">
                {r.pergunta}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-va-text)]">
                {r.resposta || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </details>

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg)] px-4 py-2.5 text-sm text-[var(--color-va-silver)]"
        >
          {erro}
        </p>
      )}

      {/* Excluir — confirmação inline em dois passos */}
      <div className="mt-6 flex items-center justify-end">
        {!confirmando ? (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-[var(--color-va-silver-mute)] transition-colors hover:text-[var(--color-va-text)]"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
            Excluir
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
            <span className="text-[var(--color-va-silver)]">Confirmar exclusão?</span>
            <button
              type="button"
              onClick={aoExcluir}
              disabled={pendente}
              aria-busy={pendente}
              className="rounded-full bg-[var(--color-va-blue)] px-4 py-1.5 font-medium text-white transition-colors hover:bg-[var(--color-va-blue-light)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pendente ? "Excluindo…" : "Confirmar"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmando(false)}
              disabled={pendente}
              className="rounded-full border border-[var(--color-va-border)] px-4 py-1.5 text-[var(--color-va-silver)] transition-colors hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
