"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { FormularioResumo, Ordem } from "@/lib/forms/consultar";

/*
 * Barra de filtros das respostas. Tudo vive na URL (query string), sem estado global: os seletores
 * aplicam na hora ao mudar; a busca aplica no submit. Qualquer mudança volta para a 1ª página.
 */

const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const ROTULO =
  "mb-2 block text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";

export default function FiltrosRespostas({
  formularios,
  formId,
  busca,
  ordem,
}: {
  formularios: FormularioResumo[];
  formId: string;
  busca: string;
  ordem: Ordem;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [textoBusca, setTextoBusca] = useState(busca);

  function aplicar(mudancas: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [chave, valor] of Object.entries(mudancas)) {
      if (valor) params.set(chave, valor);
      else params.delete(chave);
    }
    params.delete("page"); // mudou o filtro → volta para a 1ª página
    const qs = params.toString();
    router.push(qs ? `/dashboard/respostas?${qs}` : "/dashboard/respostas");
  }

  function aoBuscar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    aplicar({ q: textoBusca.trim() });
  }

  return (
    <form
      onSubmit={aoBuscar}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-5 md:grid-cols-[1fr_1.4fr_auto] md:items-end md:gap-5 md:p-6"
    >
      {/* Formulário */}
      <div>
        <label htmlFor="filtro-form" className={ROTULO}>
          Formulário
        </label>
        <select
          id="filtro-form"
          value={formId}
          onChange={(e) => aplicar({ form: e.target.value })}
          className={CAMPO}
        >
          <option value="">Todos os formulários</option>
          {formularios.map((f) => (
            <option key={f.formId} value={f.formId}>
              {f.titulo} ({f.total})
            </option>
          ))}
        </select>
      </div>

      {/* Busca */}
      <div>
        <label htmlFor="filtro-busca" className={ROTULO}>
          Buscar por nome ou e-mail
        </label>
        <div className="flex gap-2">
          <input
            id="filtro-busca"
            type="search"
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
            placeholder="Digite e pressione Enter…"
            className={CAMPO}
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 text-[var(--color-va-silver)] transition-colors hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Ordem */}
      <div>
        <label htmlFor="filtro-ordem" className={ROTULO}>
          Ordenar
        </label>
        <select
          id="filtro-ordem"
          value={ordem}
          onChange={(e) => aplicar({ ordem: e.target.value })}
          className={CAMPO}
        >
          <option value="desc">Mais recentes primeiro</option>
          <option value="asc">Mais antigas primeiro</option>
        </select>
      </div>
    </form>
  );
}
