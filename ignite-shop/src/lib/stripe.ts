import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15', // Pegar sempre a sugerida
  // Usamos o appInfo para termos o log da aplicação que fez a requisição
  appInfo: {
    name: 'Ignite Shop',
  },
})
