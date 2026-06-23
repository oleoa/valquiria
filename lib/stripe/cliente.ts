/*
 * Cliente Stripe — instanciado sob demanda, lendo STRIPE_SECRET_KEY em request (nunca no
 * topo do módulo, para o build não quebrar quando a env falta). Usado pelo webhook em
 * app/api/webhooks/stripe para verificar a assinatura e buscar os itens da compra.
 */

import Stripe from "stripe";

let cliente: Stripe | null = null;

/** Retorna o cliente Stripe (memoizado). Lança se a chave secreta não estiver configurada. */
export function getStripe(): Stripe {
  const chave = process.env.STRIPE_SECRET_KEY;
  if (!chave) {
    throw new Error("STRIPE_SECRET_KEY ausente.");
  }
  // Sem apiVersion explícita → usa o default do SDK/conta.
  return (cliente ??= new Stripe(chave));
}
