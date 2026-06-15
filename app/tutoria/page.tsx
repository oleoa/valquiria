import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/Container";
import CtaButton from "@/components/CtaButton";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import Faq from "@/components/Faq";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/config";
import { TUTORIA_FAQ } from "@/lib/faq-data";

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function ValquiriaPage() {
  return (
    <main className="relative">
      {/* ============================== HEADER ============================== */}
      <header className="relative z-20">
        <Container className="flex items-center justify-between py-6 md:py-8">
          <a
            href="#topo"
            aria-label="Valquiria Abreu — início"
            className="block"
          >
            <Image
              src="/logo-2.png"
              alt="Valquiria Abreu"
              width={320}
              height={320}
              quality={95}
              priority
              className="h-12 w-auto md:h-16"
            />
          </a>
          <a
            href="#investimento"
            className="hidden text-sm font-medium tracking-wide text-[var(--color-va-silver)] transition-colors hover:text-[var(--color-va-text)] md:inline-flex md:items-center md:gap-2"
          >
            Conhecer a tutoria
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Container>
      </header>

      {/* ============================== HERO ============================== */}
      <section id="topo" className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />
        <SpiralOrnament className="pointer-events-none absolute right-0 -bottom-32 left-0 z-0 mx-auto h-[44rem] w-[44rem] text-[var(--color-va-blue-light)] opacity-[0.04] md:hidden" />

        <Container className="relative z-10 flex flex-col items-center pt-6 pb-20 text-center md:min-h-[90vh] md:justify-center md:py-32">
          <RevealOnScroll>
            <p className="mb-8 text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
              Tutoria comportamental · para as suas mentoradas
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl leading-[1.05] font-light text-[var(--color-va-text)] md:text-7xl lg:text-8xl">
              Coragem de{" "}
              <span className="italic text-[var(--color-va-silver)]">
                ser quem é.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Tutoria comportamental para as suas mentoradas — uma parceira de
              profundidade onde a sua mentoria já fez o que tinha de fazer.
            </p>
          </RevealOnScroll>

          {/* Indicador de scroll discreto */}
          <RevealOnScroll delay={700}>
            <div className="mt-20 hidden flex-col items-center gap-3 md:flex">
              <span className="text-[0.65rem] tracking-[0.3em] text-[var(--color-va-silver-mute)] uppercase">
                Role para conhecer
              </span>
              <span className="h-10 w-px bg-gradient-to-b from-[var(--color-va-silver-mute)] to-transparent" />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ====================== TEMAS QUE SUSTENTAMOS JUNTAS ====================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Durante os meses de tutoria</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Os territórios que elas vão{" "}
              <span className="italic text-[var(--color-va-silver)]">
                atravessar.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
              Não é teoria. São perguntas que voltam — mês a mês — até deixarem
              de doer.
            </p>
          </RevealOnScroll>

          {/* Litania: 3 perguntas próximas, com divisores curtos entre elas. */}
          <RevealOnScroll>
            <ul className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 md:mt-20 md:gap-10">
              {[
                "Quem você se tornou para sobreviver?",
                "Em qual momento você deixou de se escolher?",
                "Sua mente nunca desliga porque seu emocional nunca se sente seguro.",
              ].map((frase, idx, arr) => (
                <li
                  key={frase}
                  className="flex w-full flex-col items-center gap-8 md:gap-10"
                >
                  <p className="text-center font-[family-name:var(--font-cormorant)] text-2xl leading-[1.25] font-light text-[var(--color-va-text)] italic md:text-4xl lg:text-[2.75rem]">
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

          {/* Parágrafo de transição — agora encostado nas perguntas, sem divisor extra. */}
          <RevealOnScroll>
            <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-va-silver)] md:mt-20 md:text-xl">
              Porque a mulher moderna está funcional por fora e esgotada por
              dentro — e é desse lugar que suas mentoradas chegam até você.
            </p>
          </RevealOnScroll>

          {/* 4 temas em cards */}
          <RevealOnScroll>
            <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {[
                {
                  titulo: "Sobrecarga emocional",
                  resumo:
                    "A conta de carregar mais do que se permite descansar.",
                },
                {
                  titulo: "Autoabandono",
                  resumo:
                    "Quando ela aparece para todas, exceto para si mesma.",
                },
                {
                  titulo: "Exaustão",
                  resumo: "O corpo cobra o que o emocional ignorou por anos.",
                },
                {
                  titulo: "Perfeccionismo",
                  resumo: "A armadura que vira a própria prisão silenciosa.",
                },
              ].map((tema) => (
                <div
                  key={tema.titulo}
                  className="rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 transition-colors hover:border-[var(--color-va-border-up)] md:p-8"
                >
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight font-medium text-[var(--color-va-text)] md:text-2xl">
                    {tema.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-va-silver-mute)] md:text-base">
                    {tema.resumo}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== A VIRADA ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>A jornada mês a mês</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              A cada mês, uma camada{" "}
              <span className="italic text-[var(--color-va-silver)]">
                se desfaz.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
              Não é evolução linear de marketing. É o ritmo real das mulheres
              que as suas mentoradas se tornam, mês a mês.
            </p>
          </RevealOnScroll>

          {/* Timeline: vertical no mobile, horizontal no desktop */}
          <RevealOnScroll>
            <ol className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
              {[
                {
                  numero: "01",
                  titulo: "Evolução",
                  corpo:
                    "Você percebe movimento real — não no discurso, mas no corpo. Algo destrava.",
                },
                {
                  numero: "02",
                  titulo: "Sabotagens",
                  corpo:
                    "Os padrões que te levavam pro mesmo lugar ganham nome. E perdem força.",
                },
                {
                  numero: "03",
                  titulo: "Desbloqueios",
                  corpo:
                    "O que parecia limite revela-se camada — e a camada cede.",
                },
                {
                  numero: "04",
                  titulo: "Identidade nova",
                  corpo:
                    "Uma versão mais inteira de cada mentorada — capaz de atender a vida com a coragem de ser quem é.",
                },
              ].map((step, idx, arr) => (
                <li key={step.numero} className="relative">
                  {/* Linha conectora horizontal desktop entre steps */}
                  {idx < arr.length - 1 && (
                    <span
                      className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-[var(--color-va-border-up)] md:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <span className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[var(--color-va-blue-light)] md:text-6xl">
                      {step.numero}
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[var(--color-va-text)] md:text-3xl">
                      {step.titulo}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-va-silver-mute)] md:max-w-none md:text-base">
                      {step.corpo}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== O QUE É A TUTORIA ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>O que é a tutoria</Eyebrow>
          </RevealOnScroll>

          <RevealOnScroll>
            <figure className="mx-auto max-w-4xl text-center">
              {/* Aspas decorativas */}
              <svg
                viewBox="0 0 64 48"
                className="mx-auto h-10 w-12 text-[var(--color-va-blue-light)] opacity-50 md:h-12 md:w-16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 0C6 0 0 7 0 16v32h22V16h-8c0-4 3-8 8-8V0H14zm32 0c-8 0-14 7-14 16v32h22V16h-8c0-4 3-8 8-8V0H46z" />
              </svg>

              <blockquote className="mt-8 font-[family-name:var(--font-cormorant)] text-2xl leading-[1.4] font-light text-[var(--color-va-text)] italic md:text-4xl lg:text-[2.5rem]">
                Minha entrega não se limita à aula mensal. Existe acompanhamento
                emocional e comportamental contínuo, suporte estratégico no
                WhatsApp e sustentação ao longo da jornada. Por isso minha
                atuação funciona muito mais como uma{" "}
                <span className="text-[var(--color-va-silver)]">
                  tutoria de desenvolvimento
                </span>{" "}
                do que como uma participação pontual.
              </blockquote>

              <figcaption className="mt-12 inline-flex items-center gap-3 text-sm tracking-[0.2em] text-[var(--color-va-silver-mute)] uppercase">
                <span className="h-px w-10 bg-[var(--color-va-border-up)]" />
                Valquiria Abreu
                <span className="h-px w-10 bg-[var(--color-va-border-up)]" />
              </figcaption>

              <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
                Tutoria de desenvolvimento. Sustentação real. Transformação que
                dura — nas mulheres que você sustenta.
              </p>
            </figure>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== O QUE ESTÁ INCLUSO ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>O que está incluso</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Quatro pilares de{" "}
              <span className="italic text-[var(--color-va-silver)]">
                sustentação contínua.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {[
                {
                  icone: (
                    <>
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M9 8h6" />
                      <path d="M9 12h6" />
                      <path d="M9 16h4" />
                      <path d="M17.5 18.5l1.5 1.5 2.5-3" />
                    </>
                  ),
                  titulo: "Relatório individual para cada mentorada",
                  corpo:
                    "Cada mentorada começa com um mapeamento comportamental próprio. O relatório individual é o ponto de partida da tutoria — e o eixo que sustenta os meses seguintes.",
                },
                {
                  icone: (
                    <>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </>
                  ),
                  titulo: "Encontro mensal ao vivo",
                  corpo:
                    "Aula de transformação em grupo com as suas mentoradas — um tema trabalhado em profundidade. Não conteúdo, sustentação.",
                },
                {
                  icone: (
                    <>
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </>
                  ),
                  titulo: "Suporte estratégico no WhatsApp",
                  corpo:
                    "Em horários definidos estarei a disposição para responder dúvidas pontuais na semana.",
                },
                {
                  icone: (
                    <>
                      <path d="M3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9z" />
                      <path d="M8 12l3 3 5-6" />
                    </>
                  ),
                  titulo: "Sustentação da jornada",
                  corpo:
                    "Direcionamento contínuo da evolução de cada mentorada — você ganha uma parceira que sustenta junto com você.",
                },
              ].map((card) => (
                <article
                  key={card.titulo}
                  className="flex flex-col rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-border-up)] md:p-8"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-[var(--color-va-blue-light)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {card.icone}
                  </svg>
                  <h3 className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium text-[var(--color-va-text)]">
                    {card.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-va-silver)] md:text-base">
                    {card.corpo}
                  </p>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== PARA QUEM É / NÃO É ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Para quem é · para quem não é</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Vale a sua leitura{" "}
              <span className="italic text-[var(--color-va-silver)]">
                honesta.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* É PARA VOCÊ SE... */}
              <div className="rounded-3xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg-soft)] p-8 md:p-10">
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight font-medium text-[var(--color-va-text)] md:text-4xl">
                  É para você se...
                </h3>
                <ul className="mt-8 space-y-5">
                  {[
                    "Você tem mentoradas em quadros que pedem mais profundidade do que a sua mentoria entrega.",
                    "Você quer oferecer um lugar comportamental sem precisar escalá-lo sozinha.",
                    "Você já entendeu que algumas mentoradas precisam de uma figura específica para esse lugar.",
                    "Você quer profundidade real para as mulheres que sustenta — não atalhos.",
                  ].map((item) => (
                    <li key={item} className="flex gap-4">
                      <Check
                        className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-va-blue-light)]"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className="text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NÃO É PARA VOCÊ SE... */}
              <div className="rounded-3xl border border-[var(--color-va-border)] bg-transparent p-8 md:p-10">
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight font-medium text-[var(--color-va-silver-mute)] md:text-4xl">
                  Não é para você se...
                </h3>
                <ul className="mt-8 space-y-5">
                  {[
                    "Você procura supervisão clínica formal (CRP, abordagem específica) — isto é tutoria comportamental, não supervisão regulamentada.",
                    "Você ainda não tem mentoradas ativas para indicar.",
                    "Você procura fórmula rápida ou transformação da noite pro dia.",
                    "Suas mentoradas não estão dispostas a olhar para si mesmas no processo.",
                  ].map((item) => (
                    <li key={item} className="flex gap-4">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-va-silver-mute)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 6l12 12" />
                        <path d="M18 6L6 18" />
                      </svg>
                      <span className="text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== SOBRE A MENTORA ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Sobre a tutora</Eyebrow>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
            {/* Foto */}
            <RevealOnScroll className="flex justify-center md:justify-start">
              <Image
                src="/profile.JPG"
                alt="Valquiria Abreu"
                width={800}
                height={1000}
                quality={92}
                className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover shadow-[0_30px_80px_-30px_rgba(16,34,50,0.22)] ring-1 ring-[var(--color-va-border-up)]"
              />
            </RevealOnScroll>

            {/* Bio — centralizada verticalmente em relação à foto */}
            <RevealOnScroll delay={120} className="self-center">
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl leading-[1.05] font-light text-[var(--color-va-text)] md:text-6xl">
                  Valquiria{" "}
                  <span className="italic text-[var(--color-va-silver)]">
                    Abreu
                  </span>
                </h2>
                <p className="mt-4 text-sm tracking-[0.2em] text-[var(--color-va-silver-mute)] uppercase">
                  Mentora comportamental
                </p>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
                  <p>
                    Sou Mentora Comportamental especialista em Análise de
                    temperamento e comportamento.
                  </p>
                  <p>
                    Meu trabalho é um convite para que você entenda seu
                    temperamento, compreenda seu comportamento, se liberte do
                    que te bloqueia e encontre sua versão mais leve e mais
                    consciente rumo a vida que deseja e merece.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ============================== INVESTIMENTO ============================== */}
      <section
        id="investimento"
        className="relative scroll-mt-20 py-24 md:py-32 lg:py-40"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow>Investimento</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Um investimento na profundidade{" "}
              <span className="italic text-[var(--color-va-silver)]">
                que as suas mentoradas merecem.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-va-blue)]/40 bg-[var(--color-va-bg-soft)] p-10 shadow-[0_40px_100px_-40px_rgba(47,88,120,0.3)] md:p-14">
                {/* Glow interno */}
                <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-va-blue)] opacity-10 blur-3xl" />

                <div className="relative">
                  <p className="text-center text-sm tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
                    Tutoria mensal
                  </p>

                  <div className="mt-8 flex items-baseline justify-center gap-3">
                    <span className="font-[family-name:var(--font-cormorant)] text-sm font-light text-[var(--color-va-silver-mute)] md:text-base">
                      R$
                    </span>
                    <span className="font-[family-name:var(--font-cormorant)] text-7xl leading-none font-light text-[var(--color-va-text)] md:text-8xl">
                      1.800
                    </span>
                    <span className="text-base text-[var(--color-va-silver-mute)] md:text-lg">
                      /mês
                    </span>
                  </div>

                  <p className="mt-4 text-center text-sm text-[var(--color-va-silver-mute)]">
                    Sem fidelidade. Você encerra quando quiser.
                  </p>

                  <div className="mt-10 h-px w-full bg-[var(--color-va-border-up)]" />

                  <ul className="mt-10 space-y-4">
                    {[
                      "Relatório individual para cada mentorada",
                      "Encontro mensal ao vivo",
                      "Suporte estratégico no WhatsApp",
                      "Sustentação durante toda a jornada",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check
                          className="h-5 w-5 flex-shrink-0 text-[var(--color-va-blue-light)]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <span className="text-base text-[var(--color-va-silver)] md:text-lg">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 flex justify-center">
                    <CtaButton href={WHATSAPP_URL}>
                      Quero conversar com a Valquiria
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Antes de{" "}
              <span className="italic text-[var(--color-va-silver)]">
                conversarmos.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-16">
              <Faq items={TUTORIA_FAQ} />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer className="relative border-t border-[var(--color-va-border)] py-12">
        <Container>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            <Image
              src="/logo-2.png"
              alt="Valquiria Abreu"
              width={512}
              height={512}
              quality={100}
              className="h-11 w-auto opacity-80 md:h-12"
            />

            <nav
              className="flex items-center gap-8 text-sm text-[var(--color-va-silver-mute)]"
              aria-label="Rodapé"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-va-text)]"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-va-text)]"
              >
                Instagram
              </a>
            </nav>
          </div>

          <p className="mt-10 text-center text-xs tracking-wide text-[var(--color-va-silver-mute)]/70">
            © {new Date().getFullYear()} Valquiria Abreu · Todos os direitos
            reservados
          </p>
        </Container>
      </footer>
    </main>
  );
}
