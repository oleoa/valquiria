import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, Compass, Globe } from "lucide-react";
import SpiralOrnament from "@/components/SpiralOrnament";
import RevealOnScroll from "@/components/RevealOnScroll";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Valquiria Abreu — Links",
  description:
    "Todos os canais da Valquiria Abreu — Mentora Comportamental. WhatsApp, Instagram e a tutoria.",
  openGraph: {
    title: "Valquiria Abreu — Links",
    description:
      "Todos os canais da Valquiria Abreu — Mentora Comportamental. WhatsApp, Instagram e a tutoria.",
    siteName: "Valquiria Abreu",
    locale: "pt_BR",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function ValquiriaLinksPage() {
  const linkBase =
    "group flex w-full items-center gap-3 rounded-full px-6 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5";

  return (
    <main className="relative isolate overflow-hidden">
      {/* Glow azul-aço + espiral sutil — consistência com o hero do site */}
      <div className="va-hero-glow" />
      <SpiralOrnament className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 text-[var(--color-va-blue-light)] opacity-[0.05]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-16">
        {/* ============================== PERFIL ============================== */}
        <RevealOnScroll className="flex flex-col items-center text-center">
          <Image
            src="/profile.JPG"
            alt="Valquiria Abreu"
            width={224}
            height={224}
            quality={95}
            priority
            className="h-28 w-28 rounded-full object-cover object-top ring-1 ring-[var(--color-va-border-up)] shadow-[0_18px_40px_-18px_rgba(16,34,50,0.22)]"
          />
          <h1 className="mt-7 font-[family-name:var(--font-cormorant)] text-4xl leading-none font-light text-[var(--color-va-text)]">
            Valquiria Abreu
          </h1>
          <p className="mt-4 text-[0.7rem] font-medium tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
            Mentora Comportamental
          </p>
        </RevealOnScroll>

        {/* ============================== LINKS ============================== */}
        <nav
          className="mt-12 flex w-full flex-col gap-4"
          aria-label="Links da Valquiria Abreu"
        >
          <RevealOnScroll delay={0}>
            <Link
              href="/"
              className={`${linkBase} border border-[var(--color-va-border-up)] bg-transparent text-[var(--color-va-text)] hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]`}
            >
              <Globe
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="flex-1 text-center">Conheça meu trabalho</span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <a
              href="/analise"
              className={`${linkBase} border border-[var(--color-va-border-up)] bg-transparent text-[var(--color-va-text)] hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]`}
            >
              <Compass
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="flex-1 text-center">
                Análise de Temperamento
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <a
              href="/comportamento"
              className={`${linkBase} border border-[var(--color-va-border-up)] bg-transparent text-[var(--color-va-text)] hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]`}
            >
              <Activity
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="flex-1 text-center">
                Análise de Comportamento
              </span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} border border-[var(--color-va-border-up)] bg-transparent text-[var(--color-va-text)] hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]`}
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-[var(--color-va-silver)]" />
              <span className="flex-1 text-center">WhatsApp</span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-[var(--color-va-silver)] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </a>
          </RevealOnScroll>
        </nav>

        {/* ============================== RODAPÉ ============================== */}
        <p className="mt-16 text-center text-xs tracking-wide text-[var(--color-va-silver-mute)]/70">
          © {new Date().getFullYear()} Valquiria Abreu
        </p>
      </div>
    </main>
  );
}
