import RevealOnScroll from "@/components/RevealOnScroll";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";
import DemoReveal from "./DemoReveal";
import { COMPORTAMENTOS_HOVER, VALORES_MOVIMENTO } from "./dados";

/* Seção 07 — Movimento e foco. */

export default function SecaoMovimento() {
  return (
    <Secao
      id="movimento"
      eyebrow="07 · Movimento e foco"
      titulo={
        <>
          Uma curva <Italico>só.</Italico>
        </>
      }
      lead={
        <>
          Toda transição do site usa a mesma curva. A entrada é um fade-up
          disparado por IntersectionObserver uma única vez, escalonado por
          delay. Tudo respeita <Codigo>prefers-reduced-motion</Codigo>. Sem
          bounce, spring, parallax ou framer-motion.
        </>
      }
      alternada
    >
      {/* Valores */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
          <SubTitulo>Os valores</SubTitulo>
          <ul className="mt-6 divide-y divide-[var(--color-va-border)]">
            {VALORES_MOVIMENTO.map((valor) => (
              <li key={valor.nome} className="py-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-sm font-medium text-[var(--color-va-text)]">
                    {valor.nome}
                  </span>
                  <span className="font-mono text-[0.7rem] text-[var(--color-va-silver)]">
                    {valor.valor}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
                  {valor.uso}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>

      {/* Demo do fade-up escalonado */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="text-center">
            <SubTitulo>Fade-up escalonado</SubTitulo>
          </div>
          <div className="mt-8">
            <DemoReveal />
          </div>
        </div>
      </RevealOnScroll>

      {/* Hover e press */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
          <SubTitulo>Hover e press</SubTitulo>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[var(--color-va-silver)]">
            {COMPORTAMENTOS_HOVER.map((item) => (
              <li key={item.nome}>
                <strong className="font-medium text-[var(--color-va-text)]">
                  {item.nome}:
                </strong>{" "}
                {item.valor} — {item.uso}.
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>

      {/* Foco */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <SubTitulo>Foco — regra global, nunca remova</SubTitulo>
          <div className="mt-8 flex justify-center">
            {/* Amostra estática do anel de foco (outline forçado inline). */}
            <span
              className="inline-flex items-center rounded-full border border-[var(--color-va-border-up)] px-6 py-3 text-sm font-medium text-[var(--color-va-text)]"
              style={{
                outline: "2px solid rgba(47, 88, 120, 0.6)",
                outlineOffset: "3px",
              }}
            >
              Elemento com foco
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-xl font-mono text-[0.7rem] leading-relaxed text-[var(--color-va-silver-mute)]">
            outline: 2px solid rgba(47, 88, 120, 0.6) · outline-offset: 3px ·
            border-radius: 4px
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-va-silver)]">
            Aplicado a todo interativo via <Codigo>:focus-visible</Codigo> em{" "}
            <Codigo>app/styles.css</Codigo> — navegue esta página por teclado
            para vê-lo em ação.
          </p>
        </div>
      </RevealOnScroll>
    </Secao>
  );
}
