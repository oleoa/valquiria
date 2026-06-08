/*
 * Canais e links de pagamento — fonte única de verdade do site.
 * Antes estavam duplicados em cada página; alterar aqui reflete em todas.
 */

// WhatsApp da Valquiria — Portugal +351 932 696 474 (mensagem de parceria/tutoria).
export const WHATSAPP_URL =
  "https://wa.me/351932696474?text=Ol%C3%A1%20Valquiria%2C%20sou%20mentora%20e%20quero%20conhecer%20a%20parceria%20para%20minhas%20mentoradas";

// WhatsApp para dúvidas específicas da Análise de Temperamento.
export const WHATSAPP_DUVIDAS_URL =
  "https://wa.me/351932696474?text=Ol%C3%A1%20Valquiria%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20An%C3%A1lise%20de%20Temperamento";

export const INSTAGRAM_URL = "https://www.instagram.com/valquiria_abreumentora";

// Formulário Big Five — hospedado em outro site/servidor.
export const BIGFIVE_FORM_URL = "https://bigfive.valquiriaabreu.com";

// E-mail de contato da Valquiria. Também é o destino das respostas dos formulários
// (app/forms/*), enviadas via Resend pela action em lib/forms/enviar.ts.
export const EMAIL = "valquiria.abreu.mentora@gmail.com";
export const EMAIL_URL = `mailto:${EMAIL}`;

// Remetente dos formulários (app/forms/*). Precisa ser de um domínio verificado no
// Resend. Enquanto valquiriaabreu.com não estiver verificado, troque por
// "onboarding@resend.dev" — no modo de teste o Resend entrega só para o e-mail dono
// da conta, que aqui é justamente o EMAIL acima (destino dos formulários).
export const FORM_FROM_EMAIL = "Formulários Valquiria <formularios@valquiriaabreu.com>";

// TODO(Leonardo): colar os links de pagamento do Stripe quando criar.
// Enquanto for "#", o CtaButton fica inerte (não abre nova aba) — basta trocar depois.
export const STRIPE_COMBO_URL = "#"; // as duas juntas — R$694
export const STRIPE_TEMPERAMENTO_URL = "#"; // Análise de Temperamento — R$397
export const STRIPE_COMPORTAMENTAL_URL = "#"; // Análise Comportamental — R$397
