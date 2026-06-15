import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mail } from "lucide-react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { INSTAGRAM_URL, EMAIL, EMAIL_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Valquiria Abreu — Mentora Comportamental para Mulheres",
  description:
    "Permita-se ser produtiva sem se aprisionar, realizada sem se anular. Conheça a Valquiria Abreu, mentora comportamental, e uma nova relação com o tempo, o trabalho e você mesma.",
  openGraph: {
    title: "Valquiria Abreu — Mentora Comportamental para Mulheres",
    description:
      "Uma nova relação com o tempo, com o trabalho e, principalmente, com você mesma. Conheça os caminhos da mentora comportamental Valquiria Abreu.",
    url: "/",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 1200,
        alt: "Valquiria Abreu — Mentora Comportamental",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA INICIAL                                                     */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <main className="relative">
      {/* ============================== HEADER ============================== */}
      <header className="relative z-20">
        <Container className="flex items-center justify-between py-3 md:py-4">
          <a href="#topo" aria-label="Valquiria Abreu — início" className="block">
            <Image
              src="/logo-2.png"
              alt="Valquiria Abreu"
              width={320}
              height={320}
              quality={95}
              priority
              className="h-6 w-auto md:h-8"
            />
          </a>
        </Container>
      </header>

      {/* ============================== HERO ============================== */}
      <section id="topo" className="relative isolate overflow-hidden">
        <div className="va-hero-glow" />
        <SpiralOrnament className="pointer-events-none absolute -top-10 -right-10 z-0 hidden h-[36rem] w-[36rem] text-[var(--color-va-blue-light)] opacity-[0.06] md:block" />
        <SpiralOrnament className="pointer-events-none absolute right-0 -bottom-32 left-0 z-0 mx-auto h-[44rem] w-[44rem] text-[var(--color-va-blue-light)] opacity-[0.04] md:hidden" />

        <Container className="relative z-10 flex flex-col items-center pt-6 pb-20 text-center md:min-h-[88vh] md:justify-center md:py-28">
          <RevealOnScroll>
            <p className="mb-8 text-[0.72rem] font-medium tracking-[0.32em] text-[var(--color-va-silver-mute)] uppercase">
              Mentora comportamental · mentora de mulheres
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h1 className="mx-auto max-w-4xl font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl lg:text-7xl">
              Permita-se ser produtiva sem se aprisionar.{" "}
              <span className="italic text-[var(--color-va-silver)]">
                Realizada sem se anular.
              </span>{" "}
              Presente na sua vida enquanto faz seus sonhos acontecerem.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Se você sente que é hora de mudar o jeito como vive, se organiza,
              cuida de si e educa seus filhos… estou aqui pra te ouvir. Porque às
              vezes, tudo o que a gente precisa é de um espaço seguro pra
              recomeçar com leveza.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <div className="mt-16 hidden flex-col items-center gap-3 md:flex">
              <span className="text-[0.65rem] tracking-[0.3em] text-[var(--color-va-silver-mute)] uppercase">
                Role para conhecer
              </span>
              <span className="h-10 w-px bg-gradient-to-b from-[var(--color-va-silver-mute)] to-transparent" />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ====================== O PROBLEMA ====================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Talvez você reconheça isto</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Você tenta dar conta{" "}
              <span className="italic text-[var(--color-va-silver)]">
                de tudo.
              </span>
            </h2>
          </RevealOnScroll>

          {/* Litania: três linhas próximas, com divisores curtos entre elas. */}
          <RevealOnScroll>
            <ul className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 md:mt-20 md:gap-10">
              {[
                "Organiza a casa, cuida do trabalho, dos filhos, da rotina.",
                "E mesmo assim, sente que está sempre atrasada, sempre devendo.",
                "Sempre exausta.",
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

          <RevealOnScroll>
            <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-va-silver)] md:mt-20 md:text-xl">
              Não é falta de organização nem de vontade. É um jeito de viver que
              pede, com urgência, para mudar.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== E SE… / A SOLUÇÃO ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>E se pudesse ser diferente?</Eyebrow>
          </RevealOnScroll>

          <RevealOnScroll>
            <figure className="mx-auto max-w-4xl text-center">
              <svg
                viewBox="0 0 64 48"
                className="mx-auto h-10 w-12 text-[var(--color-va-blue-light)] opacity-50 md:h-12 md:w-16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 0C6 0 0 7 0 16v32h22V16h-8c0-4 3-8 8-8V0H14zm32 0c-8 0-14 7-14 16v32h22V16h-8c0-4 3-8 8-8V0H46z" />
              </svg>

              <blockquote className="mt-8 font-[family-name:var(--font-cormorant)] text-2xl leading-[1.4] font-light text-[var(--color-va-text)] italic md:text-4xl lg:text-[2.5rem]">
                E se você pudesse viver{" "}
                <span className="text-[var(--color-va-silver)]">com leveza</span>?
                E se sua rotina respeitasse o seu ritmo, seu corpo, seu momento?
              </blockquote>

              <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
                E se ser produtiva não significasse se esmagar, mas sim fazer o
                que importa, no tempo certo, com o que é único em você?
              </p>
            </figure>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== A VIRADA ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-[var(--color-va-silver-mute)] md:text-lg">
              Se você vive cansada, atrasada e cobrada por não ser suficiente, eu
              tenho uma boa notícia…
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <h2 className="mx-auto mt-8 max-w-4xl text-center font-[family-name:var(--font-cormorant)] text-5xl leading-[1.05] font-light text-[var(--color-va-text)] md:text-7xl lg:text-8xl">
              Existe um{" "}
              <span className="italic text-[var(--color-va-silver)]">
                outro caminho.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
              Uma nova relação com o tempo, com o trabalho e, principalmente, com
              você mesma.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== SOBRE A VAL ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <Eyebrow>Sobre a mentora</Eyebrow>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
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

            <RevealOnScroll delay={120} className="self-center">
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-4xl leading-[1.05] font-light text-[var(--color-va-text)] md:text-6xl">
                  Sou a Valquiria, mas pode me chamar de{" "}
                  <span className="italic text-[var(--color-va-silver)]">
                    Val
                  </span>
                  .
                </h2>
                <p className="mt-4 text-sm tracking-[0.2em] text-[var(--color-va-silver-mute)] uppercase">
                  Mentora comportamental
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    "Formada em Pedagogia e Fotografia.",
                    "Empreendedora há mais de 16 anos.",
                    "Atuei como professora e pedagoga em São Paulo por 12 anos.",
                    "Fiz uma transição de carreira aos 34 anos, me dedicando ao trabalho físico e digital.",
                    "Mentora Comportamental, Analista de Temperamento e Especialista em Desbloqueio Emocional.",
                    "Mãe de 2 adolescentes.",
                    "Sou colérica e sanguínea.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
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
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* ============================== O MEU PORQUÊ ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>O meu porquê</Eyebrow>
            <h2 className="text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Por que eu faço o que{" "}
              <span className="italic text-[var(--color-va-silver)]">faço.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mx-auto mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
              <p>
                Em 2019, tomei uma das decisões mais importantes da minha vida:
                me mudar de país com meu marido e meus filhos. Eu tinha uma ideia
                do que nos esperava, mas nada me preparou para os desafios reais
                dessa jornada.
              </p>
              <p>
                Entre tantas mudanças, cheguei ao meu limite. Me vi esgotada,
                emocionalmente abalada, tentando ser forte o tempo todo — e foi
                nesse momento que percebi uma verdade que até então eu ignorava: a
                ideia de dar conta de tudo, de ser multitarefa, de nunca parar,
                está adoecendo as mulheres. E aconteceu comigo também.
              </p>
              <p>
                Nessa minha busca por cura, encontrei um novo caminho. Um caminho
                real — que não é feito só de flores, mas que acolhe. Um caminho que
                respeita o ritmo da vida e nos convida ao reencontro com quem somos
                de verdade.
              </p>
              <p>
                Hoje, minha missão é guiar outras mulheres empreendedoras a
                viverem com mais leveza, clareza e presença. Te mostrar como ser
                produtiva sem se aprisionar, como fazer o que importa com intenção
                e respeito ao seu corpo, ao seu ciclo e à sua fase da vida.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ============================== CTA INTERMEDIÁRIO ============================== */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <Container>
          <RevealOnScroll>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Você{" "}
              <span className="italic text-[var(--color-va-silver)]">
                não está sozinha.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
              Se a sua história também carrega cansaço, cobrança e a vontade de
              viver com mais leveza… vamos juntas transformar a sua forma de
              viver, produzir e cuidar de você?
            </p>
          </RevealOnScroll>

        </Container>
      </section>

      {/* ============================== OS CAMINHOS ============================== */}
      <section className="relative bg-[var(--color-va-bg-soft)] py-24 md:py-32 lg:py-40">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>Caminhos personalizados</Eyebrow>
            <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-cormorant)] text-4xl leading-[1.1] font-light text-[var(--color-va-text)] md:text-6xl">
              Aqui, produtividade{" "}
              <span className="italic text-[var(--color-va-silver)]">
                não é pressão.
              </span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mx-auto mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
              <p>
                Você não precisa seguir fórmulas prontas, nem se encaixar em
                rotinas que não respeitam quem você é.
              </p>
              <p>
                Cada serviço que eu criei nasce de uma escuta profunda — do que
                você sente, do que você vive e do que precisa agora. São caminhos
                personalizados para te ajudar a organizar a vida, destravar
                bloqueios, respeitar seu ciclo e fazer o que importa com leveza e
                intenção.
              </p>
              <p className="text-[var(--color-va-silver-mute)]">
                É uma forma de viver com sentido, presença e verdade.
              </p>
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
              className="flex flex-col items-center gap-4 text-sm text-[var(--color-va-silver-mute)] md:flex-row md:gap-8"
              aria-label="Contatos"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-va-text)]"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>@valquiria_abreumentora</span>
              </a>
              <a
                href={EMAIL_URL}
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-va-text)]"
              >
                <Mail className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                <span>{EMAIL}</span>
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
