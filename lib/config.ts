/*
 * Canais e links de pagamento — fonte única de verdade do site.
 * Antes estavam duplicados em cada página; alterar aqui reflete em todas.
 */

export const INSTAGRAM_URL = "https://www.instagram.com/valquiria_abreumentora";

// Formulário Big Five — hospedado em outro site/servidor.
export const BIGFIVE_FORM_URL = "https://bigfive.valquiriaabreu.com";

// E-mail de contato da Valquiria. Também é o destino (`to`) e o `replyTo` das respostas
// dos formulários (app/forms/*), enviadas pelo Strutura Email Gateway via a action em
// lib/forms/enviar.ts (ver EMAIL-GATEWAY.md).
export const EMAIL = "valquiria.abreu.mentora@gmail.com";
export const EMAIL_URL = `mailto:${EMAIL}`;

// Endpoint do Strutura Email Gateway (proxy HTTP que envia os e-mails dos formulários).
// A autenticação é por Bearer token na env EMAIL_GATEWAY_KEY — ver lib/forms/enviar.ts.
export const EMAIL_GATEWAY_URL = "https://email.strutura.ai/send";

// Display name do remetente dos formulários (app/forms/*). O gateway controla o domínio
// do From (sempre noreply@strutura.ai); aqui definimos só o nome exibido. O cabeçalho
// final fica "Formulários Valquiria <noreply@strutura.ai>".
export const FORM_FROM_NAME = "Formulários Valquiria";

// Links de pagamento (Stripe Checkout). O CtaButton abre em nova aba por serem "http".
export const STRIPE_COMBO_URL = "https://buy.stripe.com/4gM4gs2aK7paftp9R75Ne02"; // as duas juntas — R$894
export const STRIPE_TEMPERAMENTO_URL = "https://buy.stripe.com/cNi5kw2aK8teftp8N35Ne01"; // Análise de Temperamento — R$497
export const STRIPE_COMPORTAMENTAL_URL = "https://buy.stripe.com/dRm7sE4iSfVGdlh7IZ5Ne00"; // Análise de Comportamento — R$497
