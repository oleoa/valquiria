"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { excluir } from "../acoes";

/*
 * Exclusão da submissão na página de detalhe, com confirmação inline em dois passos.
 * Reusa a Server Action `excluir`; em sucesso, volta para a lista (a action já
 * revalidou /dashboard/respostas).
 */

export default function BotaoExcluir({ id }: { id: string }) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, iniciar] = useTransition();

  function aoExcluir() {
    setErro(null);
    iniciar(async () => {
      const resultado = await excluir(id);
      if (!resultado.ok) {
        setErro(resultado.erro);
        setConfirmando(false);
        return;
      }
      router.push("/dashboard/respostas");
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {!confirmando ? (
        <button
          type="button"
          onClick={() => setConfirmando(true)}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--color-va-silver-mute)] transition-colors hover:text-[var(--color-va-text)]"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          Excluir
        </button>
      ) : (
        <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
          <span className="text-[var(--color-va-silver)]">
            Confirmar exclusão?
          </span>
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

      {erro && (
        <p
          role="alert"
          className="rounded-xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg)] px-4 py-2.5 text-sm text-[var(--color-va-silver)]"
        >
          {erro}
        </p>
      )}
    </div>
  );
}
