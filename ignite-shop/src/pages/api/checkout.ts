import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

interface FormattedData {
  id: string
  name: string
  image: string
  formattedPrice: string
  quantity: number
  priceId: string
}

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { formattedData } = req.body

  if (req.method !== 'POST') {
    // Por padrão o next deixa as rotas serem acessadas com qualquer método
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!formattedData) {
    // Caso a rota seja acessada sem priceId
    return res.status(400).json({ error: 'CarDetails not found.' })
  }

  const lineItems = formattedData.map((item: FormattedData) => {
    return {
      price: item.priceId,
      quantity: item.quantity,
    }
  })

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment', // Modo de pagamento
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: lineItems, // Informações sobre os produtos comprados, podem ser criados produtos por aqui também que não estão no stripe
  })

  console.log(checkoutSession)

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
