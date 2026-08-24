/*
 * Catálogo de todas as páginas do sistema — fonte única de verdade do /dashboard.
 * Ao criar uma rota nova, adicione-a aqui para que ela apareça no painel.
 * Rotas dinâmicas (ex.: /dashboard/respostas/[id]) e route handlers (ex.: o export CSV)
 * não entram: o catálogo lista só páginas com URL fixa navegável.
 */

import { BIGFIVE_FORM_URL } from "@/lib/config";

export type CategoriaPagina = "produto" | "formulario" | "outra" | "sistema";

export type SitePage = {
  /** Título exibido no card. */
  titulo: string;
  /** Caminho interno da rota (ex.: "/analise"). */
  href: string;
  /** Descrição curta, em pt-BR, do que é a página. */
  descricao: string;
  /** Categoria para agrupamento no painel. */
  categoria: CategoriaPagina;
  /** Observação opcional (ex.: preço, comportamento de redirect). */
  nota?: string;
};

export type GrupoPaginas = {
  categoria: CategoriaPagina;
  /** Título da seção (h2). */
  rotulo: string;
  /** Subtítulo da seção. */
  descricao: string;
};

export const SITE_PAGES: SitePage[] = [
  // ------------------------------- Produtos -------------------------------
  {
    titulo: "Análise de Temperamento e Comportamento",
    href: "/analise",
    descricao:
      "Landing da Análise de Temperamento: 2 sessões online, relatório personalizado e 10 dias de suporte. Oferece o combo como upsell.",
    categoria: "produto",
    nota: "R$ 497 · R$ 894 no combo",
  },
  {
    titulo: "Análise de Comportamento",
    href: "/comportamento",
    descricao:
      "Landing dedicada à Análise de Comportamento: mapeia os padrões que a mentorada repete, com 2 sessões online, relatório personalizado e 10 dias de suporte. Oferece o combo como upsell.",
    categoria: "produto",
    nota: "R$ 497 · R$ 894 no combo",
  },
  {
    titulo: "Tutoria Comportamental Mensal",
    href: "/tutoria",
    descricao:
      "Página de venda da tutoria contínua para mentoras: encontro mensal ao vivo, relatório individual e suporte.",
    categoria: "produto",
    nota: "R$ 1.800/mês · sem fidelidade",
  },

  // ------------------------------ Formulários ------------------------------
  {
    titulo: "Formulário Big Five",
    href: BIGFIVE_FORM_URL,
    descricao:
      "Questionário de personalidade Big Five usado nos produtos — hospedado em site/servidor separado.",
    categoria: "formulario",
    nota: "Externo · bigfive.valquiriaabreu.com",
  },
  {
    titulo: "Questionário Raio X",
    href: "/forms/raio-x",
    descricao:
      "Questionário de autoconhecimento (raio X): 19 perguntas que coletam o momento da pessoa, salvam no banco e enviam por e-mail à Valquiria.",
    categoria: "formulario",
    nota: "19 perguntas · salva no banco + e-mail",
  },
  {
    titulo: "Análise de Temperamento",
    href: "/forms/analise-temperamento",
    descricao:
      "Questionário de temperamento: 26 perguntas (abertas + múltipla escolha) que mapeiam o temperamento da pessoa, salvam no banco e enviam por e-mail à Valquiria.",
    categoria: "formulario",
    nota: "26 perguntas · salva no banco + e-mail",
  },
  {
    titulo: "Anamnese — Orientação Parental",
    href: "/forms/anamnese",
    descricao:
      "Formulário de anamnese da orientação parental: dados da família, gestação, comportamento, saúde, sono e teste de adversidades da infância (pontuação automática). Salva no banco e envia por e-mail à Valquiria.",
    categoria: "formulario",
    nota: "54 perguntas · salva no banco + e-mail",
  },
  {
    titulo: "Feedback da jornada",
    href: "/forms/feedback",
    descricao:
      "Formulário de feedback pós-jornada, no formato do Big Five: abertura, uma pergunta por tela e agradecimento no fim. Mede a nota de recomendação, o que marcou, o que faltou e a autorização de depoimento. Salva no banco e envia por e-mail à Valquiria.",
    categoria: "formulario",
    nota: "8 perguntas · só 2 obrigatórias · salva no banco + e-mail",
  },
  {
    titulo: "Formulário de exemplo (demo)",
    href: "/forms/exemplo",
    descricao:
      "Demonstração do padrão de formulários internos: coleta respostas, salva no banco e envia por e-mail à Valquiria. Descartável — serve de modelo para os formulários reais.",
    categoria: "formulario",
    nota: "Demo · descartável · salva no banco + e-mail",
  },

  // ----------------------------- Outras páginas ----------------------------
  {
    titulo: "Links (linktree)",
    href: "/linktree",
    descricao:
      "Página de links pública — reúne os canais da Valquiria e o acesso às páginas de produto.",
    categoria: "outra",
  },
  {
    titulo: "Design system",
    href: "/design",
    descricao:
      "Referência pública do design system da marca: voz, cor, tipografia, espaço, movimento, ícones e componentes — demonstrados na própria página.",
    categoria: "outra",
    nota: "Referência viva · a página é a demo dela mesma",
  },

  // -------------------------------- Sistema --------------------------------
  {
    titulo: "Início (raiz)",
    href: "/",
    descricao:
      "Home institucional da Valquiria — landing longa com a história, o porquê e os caminhos, no tema noturno do site.",
    categoria: "sistema",
  },
  {
    titulo: "Painel de páginas (este painel)",
    href: "/dashboard",
    descricao:
      "Ferramenta interna da equipe — lista todas as páginas do sistema reunidas em um só lugar.",
    categoria: "sistema",
    nota: "Uso interno · requer login",
  },
  {
    titulo: "Respostas dos formulários",
    href: "/dashboard/respostas",
    descricao:
      "Área interna com a lista das respostas recebidas pelos formulários: filtra por formulário, busca por nome/e-mail, ordena por data e exporta CSV. Cada resposta abre em página própria com o conteúdo completo, cópia e exclusão.",
    categoria: "sistema",
    nota: "Uso interno · requer login",
  },
];

/** Ordem e textos dos grupos no painel. */
export const GRUPOS_PAGINAS: GrupoPaginas[] = [
  {
    categoria: "produto",
    rotulo: "Páginas de produto",
    descricao: "As ofertas que apresentamos — cada uma com a sua página de venda.",
  },
  {
    categoria: "formulario",
    rotulo: "Formulários",
    descricao: "Formulários aplicados nos produtos — alguns hospedados fora deste site.",
  },
  {
    categoria: "outra",
    rotulo: "Outras páginas",
    descricao: "Páginas públicas que não são, em si, uma oferta.",
  },
  {
    categoria: "sistema",
    rotulo: "Sistema",
    descricao: "Rotas internas e de infraestrutura do site.",
  },
];
