"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/*
 * Swatch de cor clicável — o cartão inteiro é um botão que copia o valor
 * (hex ou rgba) para a área de transferência, com feedback "Copiado!" de 2s.
 * Redução do BotaoCopiar do painel interno, adaptada para a página /design.
 */

export default function BotaoCopiarHex({
  nome,
  valor,
  uso,
  inline = false,
}: {
  /** Nome do token (ou rótulo, quando o valor vive inline nas classes). */
  nome: string;
  /** Valor copiado — hex ou rgba. */
  valor: string;
  uso: string;
  /** Marca valores sem token no @theme. */
  inline?: boolean;
}) {
  const [copiado, setCopiado] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpa o timeout pendente se o componente desmontar antes do feedback sumir.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (contexto inseguro/permissão) — não há o que fazer.
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar ${valor}`}
      className="group flex w-full flex-col rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)]"
    >
      <span
        aria-hidden="true"
        className="relative block h-16 w-full overflow-hidden rounded-lg border border-[var(--color-va-border)]"
        style={{ backgroundColor: valor }}
      >
        <span
          aria-live="polite"
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-[var(--color-va-text)]/80 text-[0.65rem] font-medium tracking-[0.2em] text-white uppercase transition-opacity duration-300",
            copiado ? "opacity-100" : "opacity-0",
          )}
        >
          {copiado ? "Copiado!" : ""}
        </span>
      </span>

      <span className="mt-3 flex items-baseline justify-between gap-2">
        <span className="truncate font-mono text-[0.7rem] text-[var(--color-va-silver)]">
          {nome}
        </span>
        {inline && (
          <span className="shrink-0 rounded-full border border-[var(--color-va-border)] px-2 py-0.5 text-[0.55rem] tracking-[0.15em] text-[var(--color-va-silver-mute)] uppercase">
            inline
          </span>
        )}
      </span>
      <span className="mt-1 font-mono text-[0.7rem] text-[var(--color-va-silver-mute)] group-hover:text-[var(--color-va-text)]">
        {valor}
      </span>
      <span className="mt-1.5 text-xs leading-snug text-[var(--color-va-silver-mute)]">
        {uso}
      </span>
    </button>
  );
}
