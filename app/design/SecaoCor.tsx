import RevealOnScroll from "@/components/RevealOnScroll";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";
import BotaoCopiarHex from "./BotaoCopiarHex";
import { GRUPOS_COR } from "./dados";

/* Seção 03 — Cor. Swatches clicáveis (copiam o valor) agrupados por papel. */

export default function SecaoCor() {
  return (
    <Secao
      id="cor"
      eyebrow="03 · Cor"
      titulo={
        <>
          Areia quente, <Italico>um azul.</Italico>
        </>
      }
      lead={
        <>
          O nome interno da paleta é &ldquo;quiet luxury&rdquo;: dois beges de
          fundo e um único azul de marca em três profundidades. Não existe cinza
          neutro no sistema — toda borda e todo véu é o azul da marca em
          opacidade baixa. Branco existe só como texto sobre o azul cheio.
          Clique em qualquer amostra para copiar o valor.
        </>
      }
      alternada
    >
      <div className="mt-16 space-y-12">
        {GRUPOS_COR.map((grupo) => (
          <RevealOnScroll key={grupo.rotulo}>
            <div>
              <SubTitulo>{grupo.rotulo}</SubTitulo>
              {grupo.nota && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
                  {grupo.nota}
                </p>
              )}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {grupo.cores.map((cor) => (
                  <BotaoCopiarHex
                    key={cor.nome}
                    nome={cor.nome}
                    valor={cor.valor}
                    uso={cor.uso}
                    inline={cor.inline}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Inversão de contraste do card */}
      <RevealOnScroll>
        <div className="mt-16">
          <SubTitulo>A regra de contraste se inverte</SubTitulo>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
            Em seção de fundo base o card é areia clara; em seção de fundo claro
            (como esta) o card volta para a areia base. O par abaixo mostra os
            dois casos lado a lado.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-va-bg)] p-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                Seção base
              </p>
              <div className="mt-4 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6">
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--color-va-text)]">
                  Card em areia clara
                </p>
                <p className="mt-2 text-sm text-[var(--color-va-silver)]">
                  <Codigo>bg-soft</Codigo> sobre <Codigo>bg</Codigo>
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--color-va-bg-soft)] p-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                Seção clara
              </p>
              <div className="mt-4 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6">
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--color-va-text)]">
                  Card em areia base
                </p>
                <p className="mt-2 text-sm text-[var(--color-va-silver)]">
                  <Codigo>bg</Codigo> sobre <Codigo>bg-soft</Codigo>
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
          Só as dez primeiras cores têm token no <Codigo>@theme</Codigo> de{" "}
          <Codigo>app/styles.css</Codigo>. Os véus, o glow e o anel de foco
          vivem inline nas classes e regras globais — para eles, o valor é o
          contrato, não o nome.
        </p>
      </RevealOnScroll>
    </Secao>
  );
}
