# CLAUDE.md — Valquiria

Site institucional/landing de **Valquiria Abreu**, mentora comportamental. Tudo em **pt-BR**:
conteúdo, copy, comentários de código e este documento.

## Produto

Público: **mentoras** e suas **mentoradas**. A proposta é dar sustentação comportamental
contínua onde a mentoria de negócio já entregou o que tinha de entregar. Dois serviços:

- **Tutoria comportamental mensal** (`/tutoria`) — R$1.800/mês, sem fidelidade. Acompanhamento
  emocional/comportamental contínuo + encontro ao vivo + suporte direto.
- **Análise de Temperamento / Comportamental** (`/analise`) — R$497 cada ou R$894 o combo.
  2 sessões online + relatório personalizado + 10 dias de suporte. Há ainda uma
  landing dedicada à **Análise de Comportamento** (`/comportamento`), que vende o produto
  isolado (R$497) e oferece o combo (R$894) como upsell.

Conversão acontece via checkout do Stripe; o contato/atendimento é pelo Instagram e a conversa
com a mentorada acontece **após a compra** — veja [Roadmap](#foco-atual--roadmap).

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
  `import { INSTAGRAM_URL } from "@/lib/config"`.

## Convenções de código

- **Server Components por padrão.** Use `"use client"` só quando há estado/efeito —
  ex.: [Faq.tsx](components/Faq.tsx) (accordion) e [RevealOnScroll.tsx](components/RevealOnScroll.tsx)
  (IntersectionObserver).
- **Nunca hardcode** Instagram ou Stripe nas páginas — sempre importe de
  [lib/config.ts](lib/config.ts).
- **Sem WhatsApp.** O projeto **não usa WhatsApp** como canal — não adicione links `wa.me`,
  botões, ícone nem copy mencionando WhatsApp. Contato/atendimento é pelo **Instagram**
  (`INSTAGRAM_URL`) e e-mail; a conversa com a mentorada acontece **após a compra** (checkout
  Stripe). Não recrie `WHATSAPP_URL`/`WHATSAPP_DUVIDAS_URL` em [lib/config.ts](lib/config.ts).
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
`categoria` e o `nota` opcional (onde aparecem os **preços**). **Todo o `/dashboard` agora exige
login** — ver [Área interna protegida](#área-interna-protegida-autenticação). Mantenha o painel em dia:

- **Toda página nova** precisa incluir — no plano e na implementação — a adição da entrada
  correspondente em [lib/site-pages.ts](lib/site-pages.ts). Sem isso, a página não aparece no
  painel. Planos de novas páginas **devem listar essa edição como passo obrigatório**.
- **Toda mudança importante** em algo já catalogado — preço, copy de venda, `href`/rota — precisa
  atualizar a entrada em `site-pages.ts` no mesmo passo, ou o painel fica defasado. Ex.: ao mudar
  o preço de um produto em `/analise` ou `/tutoria`, atualize também o `nota` correspondente (já
  aconteceu de o card seguir mostrando o preço antigo por esquecer este passo).

## Área interna protegida (autenticação)

Todo o `/dashboard` é **protegido por senha única de admin** (sem provedor externo — proporcional a
um único acesso, o da Valquiria). O esquema é **senha + cookie httpOnly assinado + proxy** (o antigo
middleware do Next):

- **Helper único** [lib/auth/sessao.ts](lib/auth/sessao.ts) — **fonte única** da lógica de auth.
  É um módulo **puro**: usa só **Web Crypto** (`crypto.subtle`) e `process.env`; **não** importa
  `next/headers` nem `node:crypto`, para rodar tanto no `proxy.ts` (o antigo middleware) quanto em
  Server Actions/route handlers. Expõe `tokenSessao()` (HMAC-SHA256 do payload fixo versionado com
  `ADMIN_SESSION_SECRET` — valor esperado do cookie), `cookieValido(valor)` e `verificarSenha(senha)`
  (ambos em **tempo constante** sobre digests), além de `COOKIE_SESSAO` (`va_admin`) e `opcoesCookie()`
  (httpOnly, `secure` só em produção, sameSite lax, path `/dashboard`, ~30 dias).
- **Server Actions** [lib/auth/acoes.ts](lib/auth/acoes.ts): `entrar(senha)` valida e seta o cookie,
  retornando `{ ok }` — **não** redireciona (o client navega só no sucesso, padrão dos forms);
  `sair()` apaga o cookie e `redirect()` para o login.
- **Proxy** [proxy.ts](proxy.ts) (raiz, matcher `/dashboard` + `/dashboard/:path*`; é o antigo
  "middleware" — a partir do Next 16 a convenção chama-se `proxy.ts` + função `proxy`): deixa passar
  só `/dashboard/login`; nas demais rotas exige cookie válido, senão redireciona para
  `/dashboard/login?next=<rota>`. **Defesa em profundidade:** a action de excluir e o route de export
  revalidam a sessão por conta própria (`cookieValido`) — não confie só no proxy.
- **Login** em [app/dashboard/login/](app/dashboard/login/) (page Server Component + `LoginForm`
  client). O `next` é **sanitizado** (só caminhos internos `/dashboard…`) para evitar open-redirect.

**Página de respostas** `/dashboard/respostas` ([app/dashboard/respostas/](app/dashboard/respostas/)):
consulta as submissões gravadas em `form_submissions` — filtra por formulário, busca por nome/e-mail,
ordena por data, abre as respostas completas, **exporta CSV** (`/dashboard/respostas/export`) e
**exclui** com confirmação. A leitura usa a camada **única** [lib/forms/consultar.ts](lib/forms/consultar.ts)
(`listarSubmissoes`/`contarSubmissoes`/`listarFormularios`/`excluirSubmissao`) — que **reusa
`obterSql`** de [lib/db/cliente.ts](lib/db/cliente.ts) (**não recrie conexão**); é a contraparte de
leitura de `salvarSubmissao` (escrita). Filtros dinâmicos usam `sql.query(texto, params)` com
placeholders `$1,$2…` (valores sempre bindados; direção da ordenação por whitelist).

**Env:** `ADMIN_PASSWORD` (senha de login) e `ADMIN_SESSION_SECRET` (string aleatória longa que
assina o cookie — ex. `openssl rand -hex 32`), lidas **em request** (nunca no topo do módulo). Em
`.env.local` (template em `.env.example`) e na Vercel (Production + Preview). Trocar o
`ADMIN_SESSION_SECRET` invalida todas as sessões abertas.

## Formulários

Formulários internos ficam em `app/forms/<slug>/`. **Cada formulário é criado à mão, com
design próprio e conteúdo hardcoded** — não é um sistema dinâmico data-driven. O único código
compartilhado é o envio de e-mail e a persistência das respostas no banco.

Estrutura de cada formulário (duas páginas + o form client):

- `app/forms/<slug>/page.tsx` — **perguntas**. Server Component com a casca on-brand
  (header/hero/footer no padrão das outras páginas) + `metadata`; renderiza o form client.
- `app/forms/<slug>/<NomeDoForm>.tsx` — o `<form>` interativo (`"use client"`), bespoke por form.
- `app/forms/<slug>/obrigado/page.tsx` — **agradecimento**. Server Component estático, mostrado
  após o envio dar certo.

Use [app/forms/exemplo/](app/forms/exemplo/) como modelo (é uma demo descartável).

**Envio de e-mail (fonte única).** O "encanamento" do envio (POST autenticado + retry) mora em
[lib/email/gateway.ts](lib/email/gateway.ts) (`enviarEmail` + `escaparHtml`) — usado pelos
formulários **e** pelo webhook de compras do Stripe. **Não recrie lógica de e-mail em outro
lugar.** Os formulários passam pela Server Action `enviarFormulario` em
[lib/forms/enviar.ts](lib/forms/enviar.ts), que monta o HTML e delega o e-mail a `enviarEmail`. Ela
envia pelo **Strutura Email Gateway** (`POST` em `EMAIL_GATEWAY_URL`, ver
[EMAIL-GATEWAY.md](EMAIL-GATEWAY.md)) para o `EMAIL` da Valquiria, com display name de remetente
`FORM_FROM_NAME` (tudo em [lib/config.ts](lib/config.ts) — nunca hardcode e-mail/endpoint na
página). O gateway controla o domínio do From (sempre `noreply@strutura.ai`) e aceita só `html`
(sem `text`); o envio faz retry em erro transitório (5xx/429). Fluxo no client: monta as
respostas, chama a action e **só** navega para `/forms/<slug>/obrigado` (via `router.push` de
`next/navigation`) quando o retorno é `{ ok: true }`; em erro, mostra a mensagem e reabilita o
botão. Não use `redirect()` dentro da action.

**Persistência no banco (fonte única).** Além do e-mail, a mesma action grava cada submissão no
**Neon Postgres** (tabela `form_submissions`). A conexão mora em
[lib/db/cliente.ts](lib/db/cliente.ts) (`obterSql` — driver HTTP `@neondatabase/serverless`, lê
`DATABASE_URL` em request, nunca no topo do módulo; **não recrie lógica de conexão em outro
lugar**) e o insert em [lib/forms/salvar.ts](lib/forms/salvar.ts) (`salvarSubmissao`). As respostas
completas vão num campo **JSONB** (`respostas`, fonte de verdade); `nome`/`email`/`telefone` são
extraídos best-effort (regex no rótulo da pergunta) para colunas próprias — facilita consulta/CRM e
ficam `null` se o form não pedir. A action roda banco + e-mail em paralelo (`Promise.allSettled`) e
considera a submissão capturada se **qualquer um dos dois** der certo — só retorna erro à usuária se
**ambos** falharem (loga alto em qualquer falha de canal). O schema versionado está em
[lib/db/schema.sql](lib/db/schema.sql); para mexer no schema, altere a tabela no Neon **e** esse
arquivo. Como a persistência mora na action compartilhada, todo form novo já grava no banco de
graça — basta reusar `enviarFormulario`.

**Env:** `EMAIL_GATEWAY_KEY` (Bearer token do gateway) e `DATABASE_URL` (connection string
**pooled** do Neon, `sslmode=require`) em `.env.local` (template em `.env.example`) e na Vercel
(Production + Preview). A chave do gateway é gerada/entregue pelo mantenedor; nunca integre
Resend/SMTP/SES direto — sempre passe pelo gateway.

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

**Webhook de compras.** A cada compra, a Valquiria recebe um e-mail com os detalhes pelo webhook
[app/api/webhooks/stripe/route.ts](app/api/webhooks/stripe/route.ts): ele valida a assinatura,
extrai os dados (via `lib/stripe/cliente.ts`) e envia pelo gateway compartilhado (via
[lib/stripe/email-compra.ts](lib/stripe/email-compra.ts) → `enviarEmail`). Trata
`checkout.session.completed`/`async_payment_succeeded` (compra; só quando pago — cobre boleto/Pix)
e `invoice.paid` (renovação de assinatura, só no ciclo). **Env:** `STRIPE_SECRET_KEY` e
`STRIPE_WEBHOOK_SECRET` no `.env.local` e na Vercel (Production + Preview); o endpoint e os
eventos são configurados no painel do Stripe (ver `.env.example`). O webhook **não** entra em
`site-pages.ts` (não é página do site).

## Deploy

**Vercel**, domínio `valquiriaabreu.com` (`metadataBase` em [app/layout.tsx](app/layout.tsx)).
