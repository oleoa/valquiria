import RevealOnScroll from "@/components/RevealOnScroll";
import { EMAIL, EMAIL_URL, INSTAGRAM_URL } from "@/lib/config";
import { GRUPOS_PAGINAS, SITE_PAGES } from "@/lib/site-pages";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";
import { PALAVRAS_DA_CASA, PALAVRAS_EVITADAS } from "./dados";

/* Seções 01 (Marca e superfícies) e 02 (Voz e conteúdo). */

/** Rótulo curto da categoria no catálogo, para a tabela de superfícies. */
function rotuloCategoria(categoria: string): string {
  return (
    GRUPOS_PAGINAS.find((g) => g.categoria === categoria)?.rotulo ?? categoria
  );
}

export default function SecaoMarcaVoz() {
  return (
    <>
      {/* ===================== 01 — MARCA E SUPERFÍCIES ===================== */}
      <Secao
        id="marca"
        eyebrow="01 · Marca e superfícies"
        titulo={
          <>
            Quem fala, e <Italico>de onde.</Italico>
          </>
        }
        lead={
          <>
            Valquiria Abreu é mentora comportamental, analista de temperamento e
            especialista em desbloqueio emocional. Atende mulheres empreendedoras
            e mães e, num segundo produto, mentoras que precisam de sustentação
            comportamental para as próprias mentoradas.
          </>
        }
        alternada
      >
        <RevealOnScroll>
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 text-center text-base leading-relaxed text-[var(--color-va-silver)]">
            <strong className="font-medium text-[var(--color-va-text)]">
              Grafia do nome:
            </strong>{" "}
            é sempre &ldquo;Valquiria&rdquo;, sem acento no &ldquo;i&rdquo;.
            Nunca com acento.
          </p>
        </RevealOnScroll>

        {/* Tabela de superfícies — derivada do catálogo em lib/site-pages.ts */}
        <RevealOnScroll>
          <div className="mt-16">
            <SubTitulo>
              Superfícies existentes — todas na mesma marca, sem tema separado
            </SubTitulo>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)]">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-va-border)] text-[0.65rem] tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                    <th className="px-5 py-4 font-medium">Página</th>
                    <th className="px-5 py-4 font-medium">Rota</th>
                    <th className="px-5 py-4 font-medium">Grupo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-va-border)]">
                  {SITE_PAGES.map((pagina) => (
                    <tr key={pagina.href}>
                      <td className="px-5 py-3.5 text-[var(--color-va-text)]">
                        {pagina.titulo}
                      </td>
                      <td className="px-5 py-3.5">
                        <Codigo>
                          {pagina.href.startsWith("http")
                            ? "externa"
                            : pagina.href}
                        </Codigo>
                      </td>
                      <td className="px-5 py-3.5 text-[var(--color-va-silver-mute)]">
                        {rotuloCategoria(pagina.categoria)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-[var(--color-va-silver-mute)]">
              A tabela vem direto do catálogo em <Codigo>lib/site-pages.ts</Codigo>{" "}
              — quando nasce página nova, ela aparece aqui sozinha.
            </p>
          </div>
        </RevealOnScroll>

        {/* Canais */}
        <RevealOnScroll>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <SubTitulo>Canais</SubTitulo>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-va-silver)]">
              Instagram:{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-va-silver)] underline decoration-[var(--color-va-border-up)] underline-offset-4 transition-colors hover:text-[var(--color-va-text)]"
              >
                @valquiria_abreumentora
              </a>{" "}
              · E-mail:{" "}
              <a
                href={EMAIL_URL}
                className="text-[var(--color-va-silver)] underline decoration-[var(--color-va-border-up)] underline-offset-4 transition-colors hover:text-[var(--color-va-text)]"
              >
                {EMAIL}
              </a>
              . Pagamento por Stripe Checkout.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-va-silver)]">
              <strong className="font-medium text-[var(--color-va-text)]">
                A marca não usa WhatsApp.
              </strong>{" "}
              Nenhum link, ícone ou copy menciona esse canal: o contato é pelo
              Instagram, e a conversa com a mentorada acontece após a compra.
            </p>
          </div>
        </RevealOnScroll>
      </Secao>

      {/* ======================== 02 — VOZ E CONTEÚDO ======================== */}
      <Secao
        id="voz"
        eyebrow="02 · Voz e conteúdo"
        titulo={
          <>
            O texto é <Italico>o produto.</Italico>
          </>
        }
        lead={
          <>
            A voz é de uma mulher falando com outra — próxima, direta, sem
            euforia de infoproduto. &ldquo;Eu&rdquo; para a Valquiria,
            &ldquo;você&rdquo; para quem lê. Nunca &ldquo;nós&rdquo; corporativo,
            nunca terceira pessoa. O plural aparece só como convite:
            &ldquo;vamos juntas&rdquo;.
          </>
        }
        estreita
      >
        {/* Estrutura retórica + demo de litania */}
        <RevealOnScroll>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <SubTitulo>Estrutura retórica de toda página</SubTitulo>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-va-silver)]">
              Sempre a mesma sequência:{" "}
              <em className="text-[var(--color-va-text)]">
                reconhecimento → virada → proposta → prova → oferta
              </em>
              . O reconhecimento vem numa &ldquo;litania&rdquo; de três frases em
              itálico que nomeiam a dor sem julgar, em ordem decrescente de
              tamanho. Depois vem o parágrafo de virada, que devolve dignidade
              antes de vender.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 md:gap-8">
            {[
              "Organiza a casa, cuida do trabalho, dos filhos, da rotina.",
              "E mesmo assim, sente que está sempre atrasada, sempre devendo.",
              "Sempre exausta.",
            ].map((frase, idx, arr) => (
              <li
                key={frase}
                className="flex w-full flex-col items-center gap-6 md:gap-8"
              >
                <p
                  className={`text-center font-[family-name:var(--font-cormorant)] leading-[1.25] font-light text-[var(--color-va-text)] italic ${
                    idx === 0
                      ? "text-2xl md:text-4xl"
                      : idx === 1
                        ? "text-xl md:text-3xl"
                        : "text-lg md:text-2xl"
                  }`}
                >
                  &ldquo;{frase}&rdquo;
                </p>
                {idx < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-px w-16 bg-[var(--color-va-border-up)]"
                  />
                )}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-[var(--color-va-silver)]">
            Não é falta de organização nem de vontade. É um jeito de viver que
            pede, com urgência, para mudar.
          </p>
        </RevealOnScroll>

        {/* Títulos com fecho em itálico */}
        <RevealOnScroll>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <SubTitulo>Títulos</SubTitulo>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-va-silver)]">
              Frase completa com o fecho em itálico. O itálico carrega a
              pontuação final — e há um único itálico por título.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Aqui, produtividade", "não é pressão."],
                ["A cada mês, uma camada", "se desfaz."],
                ["Vale a sua leitura", "honesta."],
              ].map(([inicio, fecho]) => (
                <li
                  key={fecho}
                  className="font-[family-name:var(--font-cormorant)] text-2xl leading-[1.2] font-light text-[var(--color-va-text)] md:text-3xl"
                >
                  {inicio} <Italico>{fecho}</Italico>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        {/* Recursos de linguagem + CTA e honestidade */}
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
              <SubTitulo>Recursos de linguagem</SubTitulo>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
                <li>
                  Travessão (—) para a ressalva ou a virada dentro da frase — o
                  sinal favorito da marca.
                </li>
                <li>
                  Reticências para hesitação acolhedora: &ldquo;…estou aqui pra
                  te ouvir.&rdquo;
                </li>
                <li>
                  <Codigo>·</Codigo> como separador de metadados: &ldquo;2
                  sessões online · relatório personalizado · 10 dias de
                  suporte&rdquo;. Nunca barra nem pipe.
                </li>
                <li>
                  Números por extenso quando são promessa (&ldquo;Dez dias de
                  acompanhamento&rdquo;); em dígito quando são especificação
                  (&ldquo;10 dias de suporte&rdquo;, &ldquo;19
                  perguntas&rdquo;).
                </li>
                <li>
                  Caixa: frase normal em títulos e corpo, sem Title Case. Caixa
                  alta só nos micro-rótulos, com tracking largo.
                </li>
                <li>Preços em pt-BR: R$ 497, R$ 894, R$ 1.800/mês.</li>
                <li>Emoji: não.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
              <SubTitulo>CTA e honestidade</SubTitulo>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
                <li>
                  CTA sempre na voz de quem compra, em primeira pessoa:
                  &ldquo;Quero fazer minha análise&rdquo;, &ldquo;Quero
                  conversar com a Valquiria&rdquo;. Nunca &ldquo;Saiba
                  mais&rdquo;, &ldquo;Clique aqui&rdquo;, &ldquo;Comprar
                  agora&rdquo;.
                </li>
                <li>
                  A marca escreve o que <em>não</em> é: &ldquo;Não é para você
                  se…&rdquo;, &ldquo;Isto não substitui supervisão clínica
                  formal&rdquo;.
                </li>
                <li>
                  Essa seção nunca vem sozinha — sempre lado a lado com o
                  &ldquo;É para você se…&rdquo;.
                </li>
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        {/* Palavras */}
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="text-center">
              <SubTitulo>Palavras da casa</SubTitulo>
              <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
                {PALAVRAS_DA_CASA.map((palavra) => (
                  <li
                    key={palavra}
                    className="rounded-full border border-[var(--color-va-border)] px-4 py-1.5 text-sm text-[var(--color-va-silver)]"
                  >
                    {palavra}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <SubTitulo>Palavras que a marca evita</SubTitulo>
              <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
                {PALAVRAS_EVITADAS.map((palavra) => (
                  <li
                    key={palavra}
                    className="rounded-full border border-[var(--color-va-border)] px-4 py-1.5 text-sm text-[var(--color-va-silver-mute)] line-through decoration-[var(--color-va-border-up)]"
                  >
                    {palavra}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </Secao>
    </>
  );
}
