# CLAUDE.md — Valquiria

Site institucional/landing de **Valquiria Abreu**, mentora comportamental. Tudo em **pt-BR**:
conteúdo, copy, comentários de código e este documento.

## Produto

Público: **mentoras** e suas **mentoradas**. A proposta é dar sustentação comportamental
contínua onde a mentoria de negócio já entregou o que tinha de entregar. Dois serviços:

- **Tutoria comportamental mensal** (`/tutoria`) — R$1.800/mês, sem fidelidade. Acompanhamento
  emocional/comportamental contínuo + encontro ao vivo + suporte no WhatsApp.
- **Análise de Temperamento / Comportamental** (`/analise`) — R$497 cada ou R$894 o combo.
  2 sessões online + relatório personalizado + 10 dias de suporte no WhatsApp. Há ainda uma
  landing dedicada à **Análise de Comportamento** (`/comportamento`), que vende o produto
  isolado (R$497) e oferece o combo (R$894) como upsell.

Conversão acontece via WhatsApp e checkout do Stripe — veja [Roadmap](#foco-atual--roadmap).

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

## Formulários

Formulários internos ficam em `app/forms/<slug>/`. **Cada formulário é criado à mão, com
design próprio e conteúdo hardcoded** — não é um sistema dinâmico data-driven. O único código
compartilhado é o envio de e-mail.

Estrutura de cada formulário (duas páginas + o form client):

- `app/forms/<slug>/page.tsx` — **perguntas**. Server Component com a casca on-brand
  (header/hero/footer no padrão das outras páginas) + `metadata`; renderiza o form client.
- `app/forms/<slug>/<NomeDoForm>.tsx` — o `<form>` interativo (`"use client"`), bespoke por form.
- `app/forms/<slug>/obrigado/page.tsx` — **agradecimento**. Server Component estático, mostrado
  após o envio dar certo.

Use [app/forms/exemplo/](app/forms/exemplo/) como modelo (é uma demo descartável).

**Envio de e-mail (fonte única).** Toda submissão passa pela Server Action `enviarFormulario`
em [lib/forms/enviar.ts](lib/forms/enviar.ts) — **não recrie lógica de e-mail nas páginas**. Ela
envia via **Resend** para o `EMAIL` da Valquiria, com remetente `FORM_FROM_EMAIL` (ambos em
[lib/config.ts](lib/config.ts) — nunca hardcode e-mail na página). Fluxo no client: monta as
respostas, chama a action e **só** navega para `/forms/<slug>/obrigado` (via `router.push` de
`next/navigation`) quando o retorno é `{ ok: true }`; em erro, mostra a mensagem e reabilita o
botão. Não use `redirect()` dentro da action.

**Env:** `RESEND_API_KEY` em `.env.local` (template em `.env.example`) e na Vercel
(Production + Preview). O `from` de domínio próprio (`formularios@valquiriaabreu.com`) só entrega
com o domínio verificado no Resend; enquanto isso, use `onboarding@resend.dev` no `FORM_FROM_EMAIL`.

**Ao criar um formulário novo (passos obrigatórios):**
1. Criar as duas páginas (`page.tsx` + `obrigado/page.tsx`) e o form client.
2. Reaproveitar a action `enviarFormulario` — não duplicar o envio.
3. Registrar a entrada em [lib/site-pages.ts](lib/site-pages.ts) com `categoria: "formulario"`,
   senão o formulário não aparece no `/dashboard`. (A página `obrigado` não entra no catálogo.)

## Design system

Paleta clara "quiet luxury": fundo **areia** (bege quente — `--color-va-bg` `#f0e6d2`) com
**detalhes no azul da marca** (`--color-va-blue` `#2f5878`). Todos os tokens estão no `@theme`
de [app/styles.css](app/styles.css), junto com o grain sutil, o `va-hero-glow`, a animação
`va-reveal` e o `:focus-visible` global de acessibilidade. **Atenção aos nomes:** os tokens
`--color-va-silver` (`#36505f`) e `--color-va-silver-mute` (`#6b7886`) mantêm o nome "silver"
por histórico, mas hoje são **tons escuros de texto** (secundário e apagado) sobre o fundo
claro — não são mais prata. O texto primário é `--color-va-text` `#102232` (azul quase preto).

**Selects:** todo `<select>` é estilizado globalmente em [app/styles.css](app/styles.css)
(regra `.va-root select`) — a seta nativa é trocada por um chevron cinza-azulado com respiro lateral
(`background-position: right 1rem` + `padding-inline-end`). Não precisa repetir isso por form;
vale para qualquer select novo automaticamente.

## Foco atual / roadmap

**Integração Stripe.** Os links de pagamento em [lib/config.ts](lib/config.ts)
(`STRIPE_COMBO_URL`, `STRIPE_TEMPERAMENTO_URL`, `STRIPE_COMPORTAMENTAL_URL`) já apontam para os
checkouts reais do Stripe. Como agora são `http...`, o `CtaButton` abre cada um em nova aba
automaticamente (lógica `external = href.startsWith("http")`). Observação: os preços
(R$497/R$894/R$1.800) ainda aparecem hardcoded nas páginas `/analise`, `/comportamento` e
`/tutoria`; ao mexer em pagamento, conferir consistência com o Stripe **e com o `nota` da
entrada correspondente em [lib/site-pages.ts](lib/site-pages.ts)** (preço do `/dashboard`).

## Deploy

**Vercel**, domínio `valquiriaabreu.com` (`metadataBase` em [app/layout.tsx](app/layout.tsx)).
