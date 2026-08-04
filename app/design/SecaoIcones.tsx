import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Inbox,
  Mail,
  Phone,
  RotateCcw,
  Search,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Secao, { Codigo, Italico, SubTitulo } from "./Secao";

/* Seção 10 — Iconografia. Grid dos glifos realmente importados no código. */

const ICONES: { nome: string; Icone: LucideIcon }[] = [
  { nome: "activity", Icone: Activity },
  { nome: "arrow-left", Icone: ArrowLeft },
  { nome: "arrow-right", Icone: ArrowRight },
  { nome: "check", Icone: Check },
  { nome: "chevron-down", Icone: ChevronDown },
  { nome: "chevron-right", Icone: ChevronRight },
  { nome: "compass", Icone: Compass },
  { nome: "copy", Icone: Copy },
  { nome: "download", Icone: Download },
  { nome: "external-link", Icone: ExternalLink },
  { nome: "globe", Icone: Globe },
  { nome: "inbox", Icone: Inbox },
  { nome: "mail", Icone: Mail },
  { nome: "phone", Icone: Phone },
  { nome: "rotate-ccw", Icone: RotateCcw },
  { nome: "search", Icone: Search },
  { nome: "trash-2", Icone: Trash2 },
];

const REGRAS_ICONE: { nome: string; valor: string }[] = [
  {
    nome: "traço",
    valor:
      "1.7 na interface · 1.6 nos checks · 1.5 nas setas de cabeçalho · 1.3 nos ícones grandes de card",
  },
  {
    nome: "tamanhos",
    valor:
      "14 (metadados) · 16 (setas de CTA) · 20 (listas e navegação) · 32 (ícone de card)",
  },
  {
    nome: "cor",
    valor:
      "azul claro nos ícones de conteúdo · texto apagado nos de interface",
  },
];

export default function SecaoIcones() {
  return (
    <Secao
      id="icones"
      eyebrow="10 · Iconografia"
      titulo={
        <>
          Lucide, só <Italico>contorno.</Italico>
        </>
      }
      lead={
        <>
          A biblioteca é a Lucide (<Codigo>lucide-react</Codigo>). Sempre traço,
          nunca preenchimento — as únicas exceções são o miolo do ícone do
          Instagram e as aspas decorativas das citações. Não há icon font,
          sprite nem PNG de ícone no projeto.
        </>
      }
      estreita
    >
      {/* Regras */}
      <RevealOnScroll>
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 md:p-8">
          <ul className="divide-y divide-[var(--color-va-border)]">
            {REGRAS_ICONE.map((regra) => (
              <li
                key={regra.nome}
                className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-24 shrink-0 text-[0.65rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
                  {regra.nome}
                </span>
                <span className="text-sm leading-relaxed text-[var(--color-va-silver)]">
                  {regra.valor}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>

      {/* Grid dos ícones em uso */}
      <RevealOnScroll>
        <div className="mt-16">
          <div className="text-center">
            <SubTitulo>Os ícones em uso no código</SubTitulo>
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {ICONES.map(({ nome, Icone }) => (
              <li
                key={nome}
                className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] px-2 py-5"
              >
                <Icone
                  className="h-5 w-5 text-[var(--color-va-blue-light)]"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="font-mono text-[0.65rem] text-[var(--color-va-silver-mute)]">
                  {nome}
                </span>
              </li>
            ))}
            <li className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] px-2 py-5">
              <InstagramIcon className="h-5 w-5 text-[var(--color-va-blue-light)]" />
              <span className="font-mono text-[0.65rem] text-[var(--color-va-silver-mute)]">
                instagram
              </span>
            </li>
          </ul>
        </div>
      </RevealOnScroll>

      {/* Exceções */}
      <RevealOnScroll>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
          O Instagram é um SVG desenhado à mão em{" "}
          <Codigo>components/icons/InstagramIcon.tsx</Codigo>, porque a versão
          do <Codigo>lucide-react</Codigo> em uso não exporta o glifo. Também
          são desenhados no próprio site: as aspas decorativas das citações
          (com preenchimento), a espiral do ornamento e o chevron do{" "}
          <Codigo>&lt;select&gt;</Codigo> (data-URI no CSS global).
        </p>
      </RevealOnScroll>
    </Secao>
  );
}
