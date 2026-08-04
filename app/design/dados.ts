/*
 * Dados da página /design — os valores do design system, lidos do código real.
 * O site não tem tokens nomeados para sombras, raios e espaço (os valores vivem
 * inline nas classes Tailwind das páginas); aqui documentamos o valor literal,
 * citando o nome de token só quando ele existe de verdade no @theme de
 * app/styles.css. O valor é o contrato — não o nome.
 */

/* ------------------------------- Cor ------------------------------- */

export type Cor = {
  /** Nome do token no @theme, ou rótulo descritivo quando o valor vive inline. */
  nome: string;
  /** Valor copiável (hex ou rgba). */
  valor: string;
  /** Onde/como usar. */
  uso: string;
  /** True quando o valor não tem token no @theme (vive inline nas classes). */
  inline?: boolean;
};

export type GrupoCor = {
  rotulo: string;
  nota?: string;
  cores: Cor[];
};

export const GRUPOS_COR: GrupoCor[] = [
  {
    rotulo: "Fundos areia",
    cores: [
      { nome: "--color-va-bg", valor: "#f0e6d2", uso: "fundo de página" },
      {
        nome: "--color-va-bg-soft",
        valor: "#e7dbc4",
        uso: "seções alternadas e cards",
      },
    ],
  },
  {
    rotulo: "Azul da marca — o único acento",
    cores: [
      { nome: "--color-va-blue", valor: "#2f5878", uso: "ações" },
      { nome: "--color-va-blue-dark", valor: "#264a66", uso: "reserva escura" },
      {
        nome: "--color-va-blue-light",
        valor: "#3a678a",
        uso: "hover, ícones, realces",
      },
    ],
  },
  {
    rotulo: "Texto",
    nota: "Cuidado com os nomes: “silver” e “silver-mute” ficaram por histórico, mas hoje são tons escuros de texto — não são prata.",
    cores: [
      { nome: "--color-va-text", valor: "#102232", uso: "títulos" },
      { nome: "--color-va-silver", valor: "#36505f", uso: "corpo" },
      {
        nome: "--color-va-silver-mute",
        valor: "#6b7886",
        uso: "apagado, micro-rótulos",
      },
      {
        nome: "branco sobre azul",
        valor: "#ffffff",
        uso: "só sobre o azul cheio (CTA)",
        inline: true,
      },
    ],
  },
  {
    rotulo: "Bordas e véus — azul em opacidade baixa",
    nota: "Não existe cinza neutro no sistema: toda borda e todo véu é o azul da marca em opacidade baixa.",
    cores: [
      {
        nome: "--color-va-border",
        valor: "rgba(47, 88, 120, 0.16)",
        uso: "borda em repouso",
      },
      {
        nome: "--color-va-border-up",
        valor: "rgba(47, 88, 120, 0.3)",
        uso: "borda elevada, hover",
      },
      {
        nome: "véu de hover",
        valor: "rgba(47, 88, 120, 0.06)",
        uso: "fundo da pílula de contorno no hover",
        inline: true,
      },
      {
        nome: "véu de badge",
        valor: "rgba(47, 88, 120, 0.15)",
        uso: "fundo do badge de destaque",
        inline: true,
      },
      {
        nome: "glow do hero",
        valor: "rgba(47, 88, 120, 0.12)",
        uso: "radial superior do va-hero-glow",
        inline: true,
      },
      {
        nome: "anel de foco",
        valor: "rgba(47, 88, 120, 0.6)",
        uso: "outline global de :focus-visible",
        inline: true,
      },
    ],
  },
];

/* --------------------------- Espaço e layout --------------------------- */

export type Medida = { nome: string; valor: string; uso: string };

export const MEDIDAS_LAYOUT: Medida[] = [
  {
    nome: "Ritmo vertical de seção",
    valor: "6rem → 8rem (md) → 10rem (lg)",
    uso: "py-24 md:py-32 lg:py-40 em toda seção",
  },
  {
    nome: "Container",
    valor: "72rem · padding lateral 1.5rem (2rem em md)",
    uso: "max-w-6xl px-6 md:px-8 — o componente Container",
  },
  {
    nome: "Container estreito",
    valor: "56rem",
    uso: "Container com max-w-4xl (FAQ, listas, prosa)",
  },
  {
    nome: "Largura de título",
    valor: "48rem",
    uso: "max-w-3xl nos h2 de seção",
  },
  {
    nome: "Texto corrido",
    valor: "42rem",
    uso: "max-w-2xl em leads e parágrafos centrais",
  },
  {
    nome: "Medida estreita",
    valor: "36rem",
    uso: "max-w-xl em notas e apoios",
  },
  {
    nome: "Padding de card",
    valor: "1.5rem → 2rem (md) · 2.5rem+ em blocos grandes",
    uso: "p-6 md:p-8; o bloco de investimento usa p-10 md:p-14",
  },
  {
    nome: "Padding do CTA",
    valor: "2rem × 1rem",
    uso: "px-8 py-4 no CtaButton",
  },
  {
    nome: "Padding de campo",
    valor: "1rem × 0.75rem",
    uso: "px-4 py-3 em inputs, selects e textareas",
  },
  {
    nome: "Entre título e conteúdo",
    valor: "4–5rem",
    uso: "mt-16 / mt-20 após o h2 da seção",
  },
];

/** Escala de espaço em rem — a régua visual da seção 05. */
export const ESCALA_ESPACO: number[] = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 10];

export const REGRAS_LAYOUT: string[] = [
  "Nada fixo além do grain: o cabeçalho rola com a página. Não há barra sticky, menu hambúrguer nem navegação horizontal nas páginas públicas.",
  "Cada página é uma leitura única, com um CTA por seção.",
  "Centralização é o padrão nas seções de discurso. A única seção em duas colunas é a da foto com a história da Valquiria.",
  "O texto nunca é posto sobre foto — não há gradiente de proteção sobre imagem.",
];

/* ------------------------ Bordas, raios e sombras ------------------------ */

export type Raio = { nome: string; valor: string; uso: string; classe: string };

export const RAIOS: Raio[] = [
  { nome: "Código", valor: "0.375rem", uso: "chips de código, botão copiar", classe: "rounded-md" },
  { nome: "Campo", valor: "0.75rem", uso: "inputs, cards do painel", classe: "rounded-xl" },
  { nome: "Card", valor: "1rem", uso: "cards de conteúdo", classe: "rounded-2xl" },
  { nome: "Bloco", valor: "1.5rem", uso: "blocos grandes, fotos", classe: "rounded-3xl" },
  { nome: "Pílula", valor: "9999px", uso: "qualquer ação", classe: "rounded-full" },
];

export type Sombra = { nome: string; valor: string; uso: string };

export const SOMBRAS: Sombra[] = [
  {
    nome: "CTA em repouso",
    valor: "0 10px 30px -12px rgba(47,88,120,0.35)",
    uso: "o CtaButton azul",
  },
  {
    nome: "CTA no hover",
    valor: "0 18px 40px -12px rgba(47,88,120,0.45)",
    uso: "a sombra cresce junto com o lift",
  },
  {
    nome: "Bloco de investimento",
    valor: "0 40px 100px -40px rgba(47,88,120,0.3)",
    uso: "o card de preço em destaque",
  },
  {
    nome: "Fotografia",
    valor: "0 30px 80px -30px rgba(16,34,50,0.22)",
    uso: "retrato 4:5 da home",
  },
  {
    nome: "Avatar",
    valor: "0 18px 40px -18px rgba(16,34,50,0.22)",
    uso: "foto redonda da página de links",
  },
];

/* --------------------------- Movimento e foco --------------------------- */

export const VALORES_MOVIMENTO: Medida[] = [
  {
    nome: "A curva",
    valor: "cubic-bezier(0.22, 1, 0.36, 1)",
    uso: "a única curva do sistema — reveal, FAQ, chevron",
  },
  {
    nome: "Entrada (reveal)",
    valor: "0.8s · desloca 24px",
    uso: "fade-up via IntersectionObserver, uma única vez",
  },
  {
    nome: "Delays do hero",
    valor: "0 · 120 · 280 · 420 · 700 ms",
    uso: "a cascata de entrada, do kicker ao indicador de scroll",
  },
  {
    nome: "Acordeão do FAQ",
    valor: "0.35s",
    uso: "grid-template-rows 0fr → 1fr",
  },
  {
    nome: "Hover",
    valor: "300ms",
    uso: "transition-all duration-300 em toda interação",
  },
  {
    nome: "Lift / escala / nudge",
    valor: "−2px · 1.015 · 2px",
    uso: "hover do CTA: sobe, cresce e a seta avança",
  },
];

export const COMPORTAMENTOS_HOVER: Medida[] = [
  {
    nome: "CTA",
    valor: "sobe 2px · escala 1.015 · azul clareia para #3a678a",
    uso: "a sombra cresce e a seta avança 2px",
  },
  {
    nome: "Card link",
    valor: "sobe 2px",
    uso: "a borda vai de 16% para 30% de opacidade",
  },
  {
    nome: "Pílula de contorno",
    valor: "ganha véu azul de 6%",
    uso: "e a borda escurece",
  },
  {
    nome: "Links de texto",
    valor: "#36505f → #102232",
    uso: "com sublinhado quando estão dentro de parágrafo",
  },
  {
    nome: "Press",
    valor: "volta a translateY(0) scale(1)",
    uso: "sem cor de “pressed” própria",
  },
];

/* ------------------------------ Voz ------------------------------ */

export const PALAVRAS_DA_CASA: string[] = [
  "leveza",
  "sustentação",
  "profundidade",
  "presença",
  "ritmo",
  "padrões",
  "temperamento",
  "comportamento",
  "autoabandono",
  "exaustão",
  "desbloqueio",
  "mentorada",
  "camada",
  "escolha",
];

export const PALAVRAS_EVITADAS: string[] = [
  "hack",
  "escala",
  "funil",
  "jornada de compra",
  "alta performance",
  "transformação em 7 dias",
  "método infalível",
];

/* ------------------------- Onde o sistema vive ------------------------- */

export const ONDE_VIVE: Medida[] = [
  {
    nome: "app/styles.css",
    valor: "tokens do @theme + regras globais",
    uso: "grain, va-hero-glow, va-reveal, acordeão do FAQ, foco visível e o chevron dos selects",
  },
  {
    nome: "components/",
    valor: "as primitivas compartilhadas",
    uso: "Container, CtaButton, Eyebrow, Faq, RevealOnScroll, SpiralOrnament, Textarea e icons/InstagramIcon",
  },
  {
    nome: "lib/config.ts",
    valor: "canais e links de pagamento",
    uso: "Instagram, e-mail e Stripe — fonte única, nunca hardcode nas páginas",
  },
  {
    nome: "lib/faq-data.ts",
    valor: "as perguntas frequentes tipadas",
    uso: "cada página passa a sua lista para o componente Faq",
  },
  {
    nome: "lib/site-pages.ts",
    valor: "o catálogo de páginas",
    uso: "fonte única do painel interno — toda página nova entra aqui",
  },
];

/* ---------------------------- Lacunas ---------------------------- */

export const LACUNAS: { titulo: string; corpo: string }[] = [
  {
    titulo: "Vetor da logo",
    corpo:
      "Não existe SVG da logo no repositório — só PNG. Em tamanhos grandes o traço pode ficar macio; vale pedir o arquivo original.",
  },
  {
    titulo: "Imagens",
    corpo:
      "Existe uma única fotografia (o retrato institucional). Qualquer peça que precise de mais imagem depende de material novo.",
  },
  {
    titulo: "Fontes",
    corpo:
      "Cormorant Garamond e Inter vêm do Google Fonts via next/font em app/layout.tsx. Não há arquivo de fonte local — se a marca licenciar uma serifa própria, o ponto de troca é o layout.",
  },
  {
    titulo: "Nomes herdados",
    corpo:
      "Os tokens “silver” e “silver-mute” não são prata — são tons escuros de texto. O nome ficou por histórico.",
  },
];
