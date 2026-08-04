import RevealOnScroll from "@/components/RevealOnScroll";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";
import { ESCALA_ESPACO, MEDIDAS_LAYOUT, RAIOS, REGRAS_LAYOUT, SOMBRAS } from "./dados";

/* Seções 05 (Espaço e layout) e 06 (Bordas, raios e sombras). */

export default function SecaoEspacoForma() {
  return (
    <>
      {/* ======================== 05 — ESPAÇO E LAYOUT ======================== */}
      <Secao
        id="espaco"
        eyebrow="05 · Espaço e layout"
        titulo={
          <>
            Respiro é <Italico>identidade.</Italico>
          </>
        }
        alternada
      >
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
            {/* Medidas */}
            <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
              <SubTitulo>Ritmo e medidas</SubTitulo>
              <ul className="mt-6 divide-y divide-[var(--color-va-border)]">
                {MEDIDAS_LAYOUT.map((medida) => (
                  <li key={medida.nome} className="py-3.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-sm font-medium text-[var(--color-va-text)]">
                        {medida.nome}
                      </span>
                      <span className="font-mono text-[0.7rem] text-[var(--color-va-silver)]">
                        {medida.valor}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
                      {medida.uso}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Régua da escala + regras */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
                <SubTitulo>Escala de espaço</SubTitulo>
                <ul className="mt-6 space-y-2.5">
                  {ESCALA_ESPACO.map((rem) => (
                    <li key={rem} className="flex items-center gap-4">
                      <span className="w-16 shrink-0 text-right font-mono text-[0.7rem] text-[var(--color-va-silver-mute)]">
                        {rem}rem
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 rounded-full bg-[var(--color-va-blue)]/30"
                        style={{ width: `${rem * 2}rem` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
                <SubTitulo>Regras de layout</SubTitulo>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[var(--color-va-silver)]">
                  {REGRAS_LAYOUT.map((regra) => (
                    <li key={regra} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-[var(--color-va-border-up)]"
                      />
                      {regra}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Secao>

      {/* ==================== 06 — BORDAS, RAIOS E SOMBRAS ==================== */}
      <Secao
        id="forma"
        eyebrow="06 · Bordas, raios e sombras"
        titulo={
          <>
            1px, canto arredondado, sombra <Italico>difusa.</Italico>
          </>
        }
        lead={
          <>
            Nunca quina reta; borda sempre 1px — nunca mais grossa. As sombras
            são largas, muito difusas e com blur negativo. Card comum não tem
            sombra: a borda faz o trabalho. Não existe sombra interna.
          </>
        }
      >
        {/* Raios */}
        <RevealOnScroll>
          <div className="mt-16">
            <SubTitulo>Raios</SubTitulo>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {RAIOS.map((raio) => (
                <div
                  key={raio.nome}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className={`flex h-24 w-full items-center justify-center border border-[var(--color-va-border-up)] bg-[var(--color-va-bg-soft)] ${
                      raio.classe === "rounded-full" ? "rounded-full" : raio.classe
                    }`}
                  >
                    <span className="font-mono text-[0.7rem] text-[var(--color-va-silver)]">
                      {raio.valor}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-va-text)]">
                      {raio.nome}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-va-silver-mute)]">
                      {raio.uso} · <Codigo>{raio.classe}</Codigo>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Sombras */}
        <RevealOnScroll>
          <div className="mt-16">
            <SubTitulo>Sombras</SubTitulo>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {SOMBRAS.map((sombra) => (
                <div key={sombra.nome} className="flex flex-col gap-4">
                  <div
                    className="h-24 rounded-2xl bg-[var(--color-va-bg-soft)]"
                    style={{ boxShadow: sombra.valor }}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-va-text)]">
                      {sombra.nome}
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] leading-relaxed break-words text-[var(--color-va-silver-mute)]">
                      {sombra.valor}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-va-silver-mute)]">
                      {sombra.uso}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </Secao>
    </>
  );
}
