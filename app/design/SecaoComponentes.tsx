import { ArrowRight, Check, Compass } from "lucide-react";
import CtaButton from "@/components/CtaButton";
import Faq from "@/components/Faq";
import RevealOnScroll from "@/components/RevealOnScroll";
import Textarea from "@/components/Textarea";
import { ANALISE_FAQ } from "@/lib/faq-data";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";

/* Seção 11 — Componentes. Demos vivas das primitivas reais do repositório. */

/** Moldura de demo: rótulo do grupo + descrição + área de demonstração. */
function Demo({
  rotulo,
  descricao,
  children,
}: {
  rotulo: string;
  descricao: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
      <SubTitulo>{rotulo}</SubTitulo>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
        {descricao}
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function SecaoComponentes() {
  return (
    <Secao
      id="componentes"
      eyebrow="11 · Componentes"
      titulo={
        <>
          As primitivas, nada <Italico>a mais.</Italico>
        </>
      }
      lead={
        <>
          Nada de Toast, Avatar, Tabs, Modal, Tooltip, acordeão genérico ou tema
          escuro: o produto não tem esses componentes, e inventá-los faria
          alguém confiar em algo que a marca não usa. O que existe está
          demonstrado abaixo — funcionando.
        </>
      }
      alternada
    >
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Ações */}
        <Demo
          rotulo="Ações — CtaButton e pílula de contorno"
          descricao={
            <>
              O <Codigo>CtaButton</Codigo> é o único CTA cheio; a pílula de
              contorno é a ação secundária. Passe o mouse para ver o lift, a
              escala e a seta avançando.
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-4">
            <CtaButton href="#componentes">Quero fazer minha análise</CtaButton>
            <a
              href="#componentes"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-va-border-up)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--color-va-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]"
            >
              <span>Quero as duas análises</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </a>
          </div>
        </Demo>

        {/* Eyebrow + heading */}
        <Demo
          rotulo="Tipografia de seção — Eyebrow e h2"
          descricao={
            <>
              A estrutura repetida em toda página: <Codigo>Eyebrow</Codigo> com
              filetes laterais + h2 em Cormorant com fecho em itálico. É a
              mesma casca que abre cada seção desta página.
            </>
          }
        >
          <div className="py-2">
            <div className="mb-4 flex items-center justify-center gap-3 text-[0.7rem] font-medium tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
              <span className="h-px w-8 bg-[var(--color-va-border-up)]" />
              <span>o caminho</span>
              <span className="h-px w-8 bg-[var(--color-va-border-up)]" />
            </div>
            <p className="text-center font-[family-name:var(--font-cormorant)] text-3xl leading-[1.1] font-light text-[var(--color-va-text)]">
              Aqui, produtividade <Italico>não é pressão.</Italico>
            </p>
          </div>
        </Demo>

        {/* FeatureCard */}
        <Demo
          rotulo="Superfícies — card de destaque"
          descricao={
            <>
              Ícone 32 em traço 1.3, título em Cormorant 500, corpo em Inter.
              Card link sobe 2px no hover e a borda passa de 16% para 30%.
            </>
          }
        >
          <article className="flex flex-col rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)] md:p-8">
            <Compass
              className="h-8 w-8 text-[var(--color-va-blue-light)]"
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <h4 className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
              Direção
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
              Entender o temperamento é saber para onde a sua energia já quer
              ir.
            </p>
          </article>
        </Demo>

        {/* Card + badge */}
        <Demo
          rotulo="Superfícies — card com badge"
          descricao={
            <>
              Badge em pílula com véu azul de 15% e caps de tracking largo;
              metadados separados por <Codigo>·</Codigo>.
            </>
          }
        >
          <article className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
            <span className="rounded-full border border-[var(--color-va-blue)]/50 bg-[var(--color-va-blue)]/15 px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.2em] text-[var(--color-va-silver)] uppercase">
              mais escolhido
            </span>
            <h4 className="mt-5 font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
              Análise de Temperamento
            </h4>
            <p className="mt-2 text-sm text-[var(--color-va-silver-mute)]">
              2 sessões online · relatório personalizado · 10 dias de suporte
            </p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)]">
                R$
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-5xl leading-none font-light text-[var(--color-va-text)]">
                497
              </span>
            </p>
          </article>
        </Demo>

        {/* PriceCard */}
        <Demo
          rotulo="Superfícies — bloco de investimento"
          descricao={
            <>
              Borda azul a 40%, a sombra mais funda do sistema e um glow
              interno com <Codigo>blur-3xl</Codigo> — o único blur do site.
            </>
          }
        >
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-va-blue)]/40 bg-[var(--color-va-bg)] p-8 shadow-[0_40px_100px_-40px_rgba(47,88,120,0.3)]">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--color-va-blue)] opacity-10 blur-3xl" />
            <div className="relative text-center">
              <p className="text-sm tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
                investimento
              </p>
              <p className="mt-5 flex items-baseline justify-center gap-2">
                <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)]">
                  R$
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-6xl leading-none font-light text-[var(--color-va-text)]">
                  497
                </span>
              </p>
              <p className="mt-3 text-sm text-[var(--color-va-silver-mute)]">
                Pagamento único · ou as duas análises por R$ 894
              </p>
            </div>
          </div>
        </Demo>

        {/* StatCard */}
        <Demo
          rotulo="Superfícies — cards de métrica"
          descricao={
            <>
              O padrão do painel interno: número em Cormorant 500, rótulo em
              caps apagado. Até os números falam na serifa da marca.
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              ["respostas", "128"],
              ["páginas", "12"],
              ["formulários", "5"],
              ["esta semana", "9"],
            ].map(([rotulo, numero]) => (
              <div
                key={rotulo}
                className="rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-5"
              >
                <p className="text-[0.65rem] tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                  {rotulo}
                </p>
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl leading-none font-medium text-[var(--color-va-text)]">
                  {numero}
                </p>
              </div>
            ))}
          </div>
        </Demo>

        {/* CheckList */}
        <Demo
          rotulo="Listas — é para você / não é para você"
          descricao={
            <>
              Check de traço 1.6 no azul claro; a variante apagada assina o
              &ldquo;não é para você&rdquo;. As duas listas sempre aparecem
              lado a lado.
            </>
          }
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-[var(--color-va-text)]">
                É para você se…
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Você sente que está sempre devendo, mesmo fazendo tudo.",
                  "Você quer entender o padrão, não só administrar o cansaço.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-va-blue-light)]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-[var(--color-va-silver)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-va-text)]">
                Não é para você se…
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Você procura um método infalível em sete dias.",
                  "Você precisa de supervisão clínica formal — isto não substitui.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-va-silver-mute)]/50"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Demo>

        {/* Formulário */}
        <Demo
          rotulo="Formulários — campo, select e textarea"
          descricao={
            <>
              Rótulo em caps de 0.72rem/0.18em; campos com raio 0.75rem cujo
              foco clareia a borda, sem outline próprio. O chevron do select vem
              do CSS global — nenhum form precisa repeti-lo. Amostra estática.
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="demo-nome"
                className="block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase"
              >
                Seu nome
              </label>
              <input
                id="demo-nome"
                type="text"
                placeholder="Como você gosta de ser chamada"
                className="mt-2 w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 leading-relaxed text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="demo-fase"
                className="block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase"
              >
                Em que fase você está
              </label>
              <select
                id="demo-fase"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 leading-relaxed text-[var(--color-va-text)] transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none"
              >
                <option value="" disabled>
                  Escolha uma opção
                </option>
                <option>Começando agora</option>
                <option>Já atendo, quero profundidade</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="demo-cansa"
                className="block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase"
              >
                O que mais te cansa hoje
              </label>
              <Textarea
                id="demo-cansa"
                placeholder="Suas respostas ficam só entre você e a Valquiria."
                className="mt-2"
              />
            </div>
          </div>
        </Demo>

        {/* LinkTile */}
        <Demo
          rotulo="Navegação — pílulas da página de links"
          descricao={
            <>
              As pílulas da linktree: contorno elevado, ícone à esquerda, texto
              central e seta que avança no hover.
            </>
          }
        >
          <div className="mx-auto flex max-w-sm flex-col gap-4">
            {[
              { rotulo: "Instagram" },
              { rotulo: "Análise de Temperamento" },
            ].map(({ rotulo }) => (
              <a
                key={rotulo}
                href="#componentes"
                className="group flex w-full items-center gap-3 rounded-full border border-[var(--color-va-border-up)] bg-transparent px-6 py-4 text-sm font-medium tracking-wide text-[var(--color-va-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]"
              >
                <Compass
                  className="h-5 w-5 shrink-0 text-[var(--color-va-silver)]"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="flex-1 text-center">{rotulo}</span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </Demo>
      </div>

      {/* FAQ — largura cheia */}
      <RevealOnScroll>
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 md:p-8">
          <SubTitulo>Navegação — Faq</SubTitulo>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-va-silver-mute)]">
            O acordeão real do site (componente <Codigo>Faq</Codigo>), com o
            primeiro item aberto e a transição de 0.35s via{" "}
            <Codigo>grid-template-rows</Codigo>. As perguntas vêm de{" "}
            <Codigo>lib/faq-data.ts</Codigo> — clique para abrir.
          </p>
          <div className="mt-4">
            <Faq items={ANALISE_FAQ.slice(0, 2)} />
          </div>
        </div>
      </RevealOnScroll>

      {/* O que é compartilhado vs padrão repetido */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <SubTitulo>O que veio pronto do repositório</SubTitulo>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
            <Codigo>Container</Codigo>, <Codigo>CtaButton</Codigo>,{" "}
            <Codigo>Eyebrow</Codigo>, <Codigo>Faq</Codigo>,{" "}
            <Codigo>RevealOnScroll</Codigo>, <Codigo>SpiralOrnament</Codigo>,{" "}
            <Codigo>Textarea</Codigo> e <Codigo>InstagramIcon</Codigo> existem
            como componentes compartilhados em <Codigo>components/</Codigo> — as
            demos acima usam os arquivos reais. Os demais blocos são padrões
            repetidos literalmente nas páginas (as mesmas classes Tailwind em
            3 a 6 arquivos), extraídos aqui para que o sistema tenha vocabulário
            — não são invenções de estilo.
          </p>
        </div>
      </RevealOnScroll>
    </Secao>
  );
}
