import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  // Chave pública do Stripe que é configurada nas variáveis ambientes para ser pública, tendo NEXT_PUBLIC no começo dela
  // Fazemos isso porque variáveis de ambiente que não são públicas, não podem ser utilizadas fora do servidor do Next
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return stripeJs;
}
