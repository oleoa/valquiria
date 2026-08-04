import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import SpiralOrnament from "@/components/SpiralOrnament";
import Secao, { Codigo, Italico } from "./Secao";

/* Seções 08 (Atmosfera) e 09 (Imagem). */

// O mesmo SVG de ruído do grain global (app/styles.css), aqui em opacidade
// exagerada para a amostra ficar visível — no site é 0.025.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Moldura padrão das amostras de atmosfera. */
function Quadro({
  rotulo,
  legenda,
  children,
}: {
  rotulo: string;
  legenda: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col">
      <div className="relative isolate h-48 overflow-hidden rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)]">
        {children}
      </div>
      <figcaption className="mt-4">
        <p className="font-mono text-[0.7rem] text-[var(--color-va-silver)]">
          {rotulo}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
          {legenda}
        </p>
      </figcaption>
    </figure>
  );
}

export default function SecaoAtmosferaImagem() {
  return (
    <>
      {/* =========================== 08 — ATMOSFERA =========================== */}
      <Secao
        id="atmosfera"
        eyebrow="08 · Atmosfera"
        titulo={
          <>
            Três camadas quase <Italico>invisíveis.</Italico>
          </>
        }
        lead={
          <>
            Fundo chapado, nunca imagem de fundo. O ritmo vem da alternância
            areia base / areia clara entre seções — esta página está fazendo
            isso agora. Nenhum gradiente colorido, nenhum degradê de SaaS.
          </>
        }
      >
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <Quadro
              rotulo="grain"
              legenda="SVG feTurbulence fixo sobre a página inteira. Amostra exagerada — no site a opacidade é 0.025."
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: GRAIN_URL }}
              />
            </Quadro>

            <Quadro
              rotulo="va-hero-glow"
              legenda="Dois radiais azuis: 12% no topo direito, 7% na base esquerda. absolute inset-0, pointer-events none."
            >
              <div className="va-hero-glow" aria-hidden="true" />
            </Quadro>

            <Quadro
              rotulo="SpiralOrnament"
              legenda="Eco da logo atrás do hero, 36–44rem. Amostra reforçada — no site a opacidade é 0.04–0.06."
            >
              <SpiralOrnament className="absolute -top-8 -right-8 h-64 w-64 text-[var(--color-va-blue-light)] opacity-25" />
            </Quadro>

            <Quadro
              rotulo="alternância"
              legenda="Seção base → card claro; seção clara → card base. O contraste do card inverte junto."
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-2"
              >
                <div className="flex items-center justify-center bg-[var(--color-va-bg)]">
                  <div className="h-16 w-16 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)]" />
                </div>
                <div className="flex items-center justify-center bg-[var(--color-va-bg-soft)]">
                  <div className="h-16 w-16 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)]" />
                </div>
              </div>
            </Quadro>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
            Transparência e blur: quase nada. Blur aparece só no glow interno do
            bloco de investimento (<Codigo>blur-3xl</Codigo> sobre um círculo
            azul a 10%). Não há barra fixa translúcida nem{" "}
            <Codigo>backdrop-filter</Codigo> no site.
          </p>
        </RevealOnScroll>
      </Secao>

      {/* ============================ 09 — IMAGEM ============================ */}
      <Secao
        id="imagem"
        eyebrow="09 · Imagem"
        titulo={
          <>
            Fotografia real, luz natural <Italico>quente.</Italico>
          </>
        }
        lead={
          <>
            Sem filtro frio, sem preto-e-branco. Não há ilustração, ícone cheio
            nem mockup 3D. O texto nunca é posto sobre a foto — não existe
            gradiente de proteção sobre imagem.
          </>
        }
        alternada
        estreita
      >
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 items-start gap-10 md:grid-cols-2">
            {/* Retrato 4:5 */}
            <figure className="flex flex-col items-center">
              <Image
                src="/profile.JPG"
                alt="Valquiria Abreu — retrato institucional"
                width={640}
                height={800}
                className="aspect-[4/5] w-full max-w-xs rounded-3xl object-cover shadow-[0_30px_80px_-30px_rgba(16,34,50,0.22)] ring-1 ring-[var(--color-va-border-up)]"
              />
              <figcaption className="mt-4 text-center font-mono text-[0.7rem] text-[var(--color-va-silver-mute)]">
                retrato · 4:5 · raio 1.5rem · sombra de foto · filete de borda
              </figcaption>
            </figure>

            {/* Avatar redondo */}
            <div className="flex flex-col items-center gap-10">
              <figure className="flex flex-col items-center">
                <Image
                  src="/profile.JPG"
                  alt="Valquiria Abreu — avatar da página de links"
                  width={224}
                  height={224}
                  className="h-28 w-28 rounded-full object-cover object-top ring-1 ring-[var(--color-va-border-up)] shadow-[0_18px_40px_-18px_rgba(16,34,50,0.22)]"
                />
                <figcaption className="mt-4 text-center font-mono text-[0.7rem] text-[var(--color-va-silver-mute)]">
                  avatar · redondo · object-position top
                </figcaption>
              </figure>

              {/* Logo */}
              <figure className="flex w-full flex-col items-center rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-8">
                <Image
                  src="/logo-2.png"
                  alt="Logo de Valquiria Abreu"
                  width={320}
                  height={320}
                  className="h-16 w-auto"
                />
                <figcaption className="mt-4 text-center text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
                  A logo existe só em PNG com fundo transparente — não há SVG no
                  repositório. Em tamanhos grandes o traço pode ficar macio.
                </figcaption>
              </figure>
            </div>
          </div>
        </RevealOnScroll>
      </Secao>
    </>
  );
}
