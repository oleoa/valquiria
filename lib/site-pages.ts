/*
 * Catálogo de todas as páginas do sistema — fonte única de verdade do /dashboard.
 * Ao criar uma rota nova, adicione-a aqui para que ela apareça no painel.
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
      "Página de venda da análise: 2 sessões online, relatório personalizado e 10 dias de suporte no WhatsApp.",
    categoria: "produto",
    nota: "R$ 397 cada · R$ 694 o combo",
  },
  {
    titulo: "Tutoria Comportamental Mensal",
    href: "/tutoria",
    descricao:
      "Página de venda da tutoria contínua para mentoras: encontro mensal ao vivo, relatório individual e suporte no WhatsApp.",
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
    titulo: "Formulário de exemplo (demo)",
    href: "/forms/exemplo",
    descricao:
      "Demonstração do padrão de formulários internos: coleta respostas e envia por e-mail à Valquiria. Descartável — serve de modelo para os formulários reais.",
    categoria: "formulario",
    nota: "Demo · descartável · envia por e-mail",
  },

  // ----------------------------- Outras páginas ----------------------------
  {
    titulo: "Links (linktree)",
    href: "/linkthree",
    descricao:
      "Página de links pública — reúne os canais da Valquiria e o acesso às páginas de produto.",
    categoria: "outra",
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
    nota: "Uso interno · fora do índice de busca",
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
