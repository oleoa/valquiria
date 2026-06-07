# CLAUDE.md — Valquiria

Site institucional/landing de **Valquiria Abreu**, mentora comportamental. Tudo em **pt-BR**:
conteúdo, copy, comentários de código e este documento.

## Produto

Público: **mentoras** e suas **mentoradas**. A proposta é dar sustentação comportamental
contínua onde a mentoria de negócio já entregou o que tinha de entregar. Dois serviços:

- **Tutoria comportamental mensal** (`/tutoria`) — R$1.800/mês, sem fidelidade. Acompanhamento
  emocional/comportamental contínuo + encontro ao vivo + suporte no WhatsApp.
- **Análise de Temperamento / Comportamental** (`/analise`) — R$397 cada ou R$694 o combo.
  2 sessões online + relatório personalizado + 10 dias de suporte no WhatsApp.

Conversão acontece via WhatsApp e (em construção) checkout do Stripe — veja [Roadmap](#foco-atual--roadmap).

## Stack

- **Next.js 16.2.7** (App Router) + **React 19** + **TypeScript** strict (target ES2017)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — tokens definidos no `@theme` de
  [app/styles.css](app/styles.css). **Não há `tailwind.config.js`.**
- **pnpm** (workspace) · **ESLint** (`eslint-config-next`, core-web-vitals + typescript)
- `lucide-react` (ícones) · `clsx` + `tailwind-merge` (helper `cn`)

## Comandos

```bash
pnpm dev      # servidor de desenvolvimento
pnpm build    # build de produção
pnpm start    # servir o build
pnpm lint     # ESLint
```

Não há testes configurados — não existe runner nem script `test`.

## Estrutura e convenções de pasta

A refatoração atual estabeleceu este padrão — **siga-o**:

- `app/` — rotas do App Router: `/` ([app/page.tsx](app/page.tsx)), `/analise`, `/tutoria`,
  `/links`, `/dashboard` ([app/dashboard/page.tsx](app/dashboard/page.tsx) — painel interno que
  cataloga todas as páginas). Layout raiz em [app/layout.tsx](app/layout.tsx); CSS global em
  [app/styles.css](app/styles.css).
- `components/` — componentes compartilhados (`Container`, `CtaButton`, `Eyebrow`, `Faq`,
  `RevealOnScroll`, `SpiralOrnament`). Ícones de marca em `components/icons/`.
- `lib/` — [cn.ts](lib/cn.ts) (clsx + twMerge), [config.ts](lib/config.ts) (canais/links —
  **fonte única de verdade**), [faq-data.ts](lib/faq-data.ts) (FAQs tipadas),
  [site-pages.ts](lib/site-pages.ts) (catálogo de páginas — **fonte única de verdade do
  `/dashboard`**).
- Import alias: `@/*` → raiz. Ex.: `import Container from "@/components/Container"`,
  `import { WHATSAPP_URL } from "@/lib/config"`.

## Convenções de código

- **Server Components por padrão.** Use `"use client"` só quando há estado/efeito —
  ex.: [Faq.tsx](components/Faq.tsx) (accordion) e [RevealOnScroll.tsx](components/RevealOnScroll.tsx)
  (IntersectionObserver).
- **Nunca hardcode** WhatsApp, Instagram ou Stripe nas páginas — sempre importe de
  [lib/config.ts](lib/config.ts).
- **Estilo:** classes Tailwind inline + tokens `--color-va-*`. Use `cn()` para merge
  condicional. Headlines em **Cormorant Garamond** (serifa); corpo em **Inter** (ambas
  carregadas em [app/layout.tsx](app/layout.tsx)).
- **Animações:** CSS + IntersectionObserver via `RevealOnScroll`, respeitando
  `prefers-reduced-motion`. **Sem** framer-motion.
- **Idioma:** todo texto visível e comentários em pt-BR.
- **Grafia do nome:** é **"Valquiria"** (sem acento no "i") — nunca "Valquíria". Vale para
  copy, metadata, comentários e qualquer texto.

## Dashboard / catálogo de páginas

O `/dashboard` ([app/dashboard/page.tsx](app/dashboard/page.tsx)) é um painel interno que lista
todas as páginas do site a partir de `SITE_PAGES` em [lib/site-pages.ts](lib/site-pages.ts) — a
**fonte única de verdade** do catálogo. Cada entrada tem `titulo`, `href`, `descricao`,
`categoria` e o `nota` opcional (onde aparecem os **preços**). Mantenha o painel em dia:

- **Toda página nova** precisa incluir — no plano e na implementação — a adição da entrada
  correspondente em [lib/site-pages.ts](lib/site-pages.ts). Sem isso, a página não aparece no
  painel. Planos de novas páginas **devem listar essa edição como passo obrigatório**.
- **Toda mudança importante** em algo já catalogado — preço, copy de venda, `href`/rota — precisa
  atualizar a entrada em `site-pages.ts` no mesmo passo, ou o painel fica defasado. Ex.: ao mudar
  o preço de um produto em `/analise` ou `/tutoria`, atualize também o `nota` correspondente (já
  aconteceu de o card seguir mostrando o preço antigo por esquecer este passo).

## Design system

Paleta noturna "quiet luxury": azul-aço (`--color-va-blue` `#386082`) + prata
(`--color-va-silver`) sobre fundo profundo (`--color-va-bg` `#0e1823`). Todos os tokens estão
no `@theme` de [app/styles.css](app/styles.css), junto com o grain sutil, o `va-hero-glow`,
a animação `va-reveal` e o `:focus-visible` global de acessibilidade.

## Foco atual / roadmap

**Integração Stripe.** Os links de pagamento em [lib/config.ts](lib/config.ts) ainda são
placeholders `"#"` (`STRIPE_COMBO_URL`, `STRIPE_TEMPERAMENTO_URL`, `STRIPE_COMPORTAMENTAL_URL`).
Enquanto forem `"#"`, o `CtaButton` fica inerte (não abre nova aba) — basta trocar pelos links
reais. Observação: os preços (R$397/R$694/R$1.800) hoje aparecem hardcoded nas páginas
`/analise` e `/tutoria`; ao mexer em pagamento, conferir consistência com o Stripe **e com o
`nota` da entrada correspondente em [lib/site-pages.ts](lib/site-pages.ts)** (preço do `/dashboard`).

## Deploy

**Vercel**, domínio `valquiriaabreu.com` (`metadataBase` em [app/layout.tsx](app/layout.tsx)).
