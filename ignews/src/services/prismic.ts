import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req, // Requisição que pode ser recebida como parâmetro da função
      accessToken: process.env.PRISMIC_ACESS_TOKEN, // Access token do prismic
    }
  )

  return prismic;
}
