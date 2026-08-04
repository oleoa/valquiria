import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import RevealOnScroll from "@/components/RevealOnScroll";
import { cn } from "@/lib/cn";

/*
 * Casca padrão das seções da página /design: âncora, eyebrow numerado,
 * h2 em Cormorant com fecho em itálico e alternância de fundo areia.
 * O conteúdo de cada seção entra como children (já dentro do Container).
 */

export default function Secao({
  id,
  eyebrow,
  titulo,
  lead,
  alternada = false,
  estreita = false,
  children,
}: {
  /** Âncora da seção (usada no índice do hero). */
  id: string;
  /** Kicker numerado, ex.: "01 · Marca e superfícies". */
  eyebrow: string;
  /** Título da seção — passe o fecho em itálico como span. */
  titulo: React.ReactNode;
  /** Parágrafo de abertura opcional. */
  lead?: React.ReactNode;
  /** Fundo areia clara (bg-soft) — alternar seção sim, seção não. */
  alternada?: boolean;
  /** Container estreito (max-w-4xl) para seções de leitura. */
  estreita?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-24 md:py-32 lg:py-40",
        alternada && "bg-[var(--color-va-bg-soft)]",
      )}
    >
      <Container className={cn(estreita && "max-w-4xl")}>
        <RevealOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
            {titulo}
          </h2>
          {lead && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
              {lead}
            </p>
          )}
        </RevealOnScroll>

        {children}
      </Container>
    </section>
  );
}

/** Span itálico prata usado no fecho dos títulos. */
export function Italico({ children }: { children: React.ReactNode }) {
  return (
    <span className="italic text-[var(--color-va-silver)]">{children}</span>
  );
}

/** Sub-bloco de seção: rótulo pequeno em caps antes de um grupo de conteúdo. */
export function SubTitulo({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[0.72rem] font-medium tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
      {children}
    </h3>
  );
}

/** Chip de código/valor em monoespaçada — usado para tokens, medidas e classes. */
export function Codigo({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-[var(--color-va-blue)]/[0.06] px-1.5 py-0.5 font-mono text-[0.8em] text-[var(--color-va-silver)]">
      {children}
    </code>
  );
}
