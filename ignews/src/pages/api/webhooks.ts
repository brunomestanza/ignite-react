/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'; // Utilizado para que a leitura de uma requisição possa ser feita de forma parcial, porque o stripe não manda todos os dados de uma vez
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

// A função abaixo recebe uma readable string, cria um array chamado chunks que são os pedaços da string, e percorre para que cada vez que seja recebido um valor ele seja armazenado
// O chunks são aguardados para serem adicionados com o for await, e depois concatenados para um buffer
async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ?  Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

// O código abaixo é utilizado para desabilitar o entendimento padrão do Next, que espera um json na maioria dos casos, já que estamos trabalhando com stream
export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([ // O Set é semelhante ao array, porém não pode ter dados duplicados
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const buf = await buffer(request); // A request é um readable por padrão, e agora o buf possui dentro dele o conteúdo da requisição
    const secret = request.headers['stripe-signature']; // Aqui buscamos pelo header stripe-signature, que é o enviado pelo stripe
    let event: Stripe.Event; // Tipamos a variável com os tipos de evento do stripe
    try {
      // Tentamos fazer um match do secret que veio na requisição com oque temos nas variáveis ambiente para que possamos analisar requisições indesejadas
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return response.status(400).send(`Webhook error: ${err.message}`);
    }
    const type = event.type; // Retorna o tipo do evento de checkout, como por exemplo checkout.session.completed
    if (relevantEvents.has(type)) {
      try {
        switch(type) {
          // Os 2 cases que temos juntos, fazem com que caso haja resultado com algum dos 3, eles tenham a mesma lógica
          // Não usamos o created abaixo, porque a unica maneira do usuário se inscrever no app é através do site, e o método de session completed
          // é o método utilizado pra isso, utilizariamos o método de created para caso a inscrição fosse criada de outras formas
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
            )
            break;
          case 'checkout.session.completed':
            // Adicionamos a tipagem do stripe checkout session, para que ele não tenha uma tipagem genérica igual o event tem acima
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            await saveSubscription(
              // Passamos o toString apenas para a tipagem ignorar o erro
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true,
            )
            break;
          default:
            throw new Error('Unhandled event.');
        }
      } catch (err) {
        // Não passamos status de erro porque caso o stripe receba um status de erro, ele vai tentar fazer a requisição outra vez
        // Esse erro deve ficar assim, por ser algo que apenas não foi tratado
        return response.json({ error: 'Webhook handler failed.' });
      }
    }

    response.json({ recevied: true }); // Não precisamos passar o status de 200 porque ele é o padrão para esse tipo de requisição
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}