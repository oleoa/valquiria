import RevealOnScroll from "@/components/RevealOnScroll";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";
import { LACUNAS, ONDE_VIVE } from "./dados";

/* Seção 12 — Onde o sistema vive no código + lacunas e cuidados. */

export default function SecaoLacunas() {
  return (
    <Secao
      id="lacunas"
      eyebrow="12 · Lacunas e cuidados"
      titulo={
        <>
          O que ainda <Italico>falta.</Italico>
        </>
      }
      estreita
    >
      {/* Onde o sistema vive */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
          <SubTitulo>Onde o sistema vive no código</SubTitulo>
          <ul className="mt-6 divide-y divide-[var(--color-va-border)]">
            {ONDE_VIVE.map((item) => (
              <li key={item.nome} className="py-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Codigo>{item.nome}</Codigo>
                  <span className="text-sm text-[var(--color-va-text)]">
                    {item.valor}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
                  {item.uso}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>

      {/* Lacunas */}
      <RevealOnScroll>
        <ul className="mx-auto mt-10 max-w-2xl space-y-5">
          {LACUNAS.map((lacuna) => (
            <li
              key={lacuna.titulo}
              className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6"
            >
              <p className="text-sm font-medium text-[var(--color-va-text)]">
                {lacuna.titulo}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-va-silver)]">
                {lacuna.corpo}
              </p>
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
          Documento vivo — cada valor desta página foi lido do código em
          produção, e as demos usam os componentes reais. Se o site mudar, ela
          muda junto.
        </p>
      </RevealOnScroll>
    </Secao>
  );
}
