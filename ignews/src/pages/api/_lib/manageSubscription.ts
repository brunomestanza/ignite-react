import { fauna } from "../../../services/fauna";
import { query } from 'faunadb';
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Buscar o usuáriio no banco de dados do FaunaDB com o customerId
  const userRef = await fauna.query(
    query.Select( // Usamos o select já que o único campo que queremos é o da referência do usuário no fauna
      "ref",
      query.Get(
        query.Match(
          query.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // Salvar os dados da subscription no FaunaDB
  // Dados necessários que precisamos enviar para o fauna
  const subscriptionData = {
    id: subscription.id, // Id da subscription
    userId: userRef, // Id do user dentro do fauna, que usamos para liga-lo a subscription dele
    status: subscription.status, // Status da request do fauna
    price_id: subscription.items.data[0].price.id, // Preço do produto comprado, usamos o [0] porque podemos ter mais de um produto
  }
  if (createAction) {
    await fauna.query(
      query.Create(
        query.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    fauna.query(
      // Temos dois métodos para atualização de dados no fauna, Update e Replace que possuem algumas diferenças
      // Update atualiza um ou mais campos dentro do registro, replace substitui o document da collection por completo, através da ref dela
      query.Replace(
        query.Select(
          "ref",
          query.Get(
            query.Match(
              query.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        {data: subscriptionData}
      )
    )
  }
}
