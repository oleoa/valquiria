"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * Botão de copiar para a área de transferência, com feedback temporário "Copiado!".
 * Na versão compacta (copiar uma resposta individual) fica discreto, sem borda.
 */

export default function BotaoCopiar({
  texto,
  rotulo = "Copiar",
  compacto = false,
  className,
}: {
  /** Conteúdo copiado para a área de transferência. */
  texto: string;
  rotulo?: string;
  /** Versão discreta, usada ao lado de cada resposta. */
  compacto?: boolean;
  className?: string;
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
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (contexto inseguro/permissão) — não há o que fazer aqui.
    }
  }

  const Icone = copiado ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copiar}
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        compacto
          ? "rounded-md px-2 py-1 text-xs text-[var(--color-va-silver-mute)] hover:text-[var(--color-va-text)]"
          : "rounded-full border border-[var(--color-va-border)] px-5 py-2.5 text-sm font-medium tracking-wide text-[var(--color-va-silver)] hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]",
        className,
      )}
    >
      <Icone
        className={cn("shrink-0", compacto ? "h-3.5 w-3.5" : "h-4 w-4")}
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <span aria-live="polite">{copiado ? "Copiado!" : rotulo}</span>
    </button>
  );
}
