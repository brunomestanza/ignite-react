/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Usado para pegar a sessão, já que o hook do useSession só funciona em componentes React
import { fauna } from "../../services/fauna";
import { query } from 'faunadb';
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') { // Aceitamos apenas requests com o método HTTP POST, já que é uma criação
    const session = await getSession({ req: request }); // Informacões sobre a sessão do user, deve ter o nome obrigatóriamente de req
    const user = await fauna.query<User>(
      query.Get(
        query.Match(
          query.Index('user_by_email'),
          query.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id;

    if (!customerId) { // Se o usuário salvo no banco não tem um customer ID salvo
      const stripeCustomer = await stripe.customers.create({ //Criação do usuário dentro da plataforma do stripe
        email: session.user.email, // Email do usuário
        // metadata
      });

      await fauna.query(
        // Atualizamos o usuário para que agora ele possa ter o ID salvo juntamente com o Email que foi salvo anteriormente, isso não pode ser feito com índice
        query.Update(
          //Primeiro parâmetro é a referência do usuário, no caso, o ID dele no fauna
          query.Ref(query.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id;
    }
 
    const stripeCheckoutSession = await stripe.checkout.sessions.create({ // Criação do checkout caso o método seja POST
      customer: customerId, // Quem está comprando, importante lembrar que esse customer é do painel do stripe, e não do banco de dados
      payment_method_types: ['card'], // Pagamento aceito
      billing_address_collection: 'required', // Se requeremos o preenchimento de endereço pelo user (requised), ou se o stripe pode gerenciar isso (auto)
      line_items: [
        { price: 'price_1KPEECH0GMCNHpYOZXGzKSg8', quantity: 1 } // Colocamos a quantia e ID do preço de forma estática, por termos uma única opção
      ],
      mode: 'subscription', // Modo de pagamento, que nesse caso é pagamento recorrente
      allow_promotion_codes: true, // Permitir que o usuário usem cupons para descontos e afins
      success_url: process.env.STRIPE_SUCCESS_URL, // Aonde o usuário é direcionado em caso de sucesso
      cancel_url: process.env.STRIPE_CANCEL_URL // Aonde o usuário é direcionado se ele cancela a requisição
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id }) // Retorno de um status de sucesso
  } else {
    response.setHeader('Allow', 'POST'); // Retornamos ao Front, que aceitamos apenas requests do tipo POST
    response.status(405).end('Method not allowed'); // Retornamos um erro 405, de método não permitido
  }
}