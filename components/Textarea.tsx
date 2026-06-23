import { cn } from "@/lib/cn";

/**
 * Textarea com auto-crescimento: a altura acompanha o conteúdo via
 * `field-sizing: content` (CSS nativo, Tailwind v4) — sem JS, sem piscar no
 * primeiro paint. `min-h-28` é o piso e `resize-none` tira a alça (a auto-altura
 * já cobre). Em navegadores sem suporte (antigos) degrada para altura fixa, não
 * quebra. Estilo casado com o `CAMPO` dos formulários (tokens --color-va-*).
 */
export default function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "field-sizing-content min-h-28 w-full resize-none rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 leading-relaxed text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
