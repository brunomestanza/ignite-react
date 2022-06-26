import Stripe from 'stripe';
import ProjectInfos from '../../package.json';

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY, // Chave do stripe
  {
    apiVersion: '2020-08-27', // Versão da API do stripe
    appInfo:{ // Informações de metadados
      name: 'Ignews', // Nome da aplicação que está fazendo as requisições
      version: ProjectInfos.version // Versão do projeto que está sendo buscada do package.json
    } 
  }
)
