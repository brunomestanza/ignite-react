// Todas as requests que fazemos no fauna, não mantemos uma conexão ativa com o banco de dados, oque é ideal para um projeto serverless
// É muito custoso para o banco de dados ter que criar uma nova conexão toda vez que a função serverless
// Sendo assim, quando usamos serverless, usamos bancos que não precisam manter uma conexão direta
import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
})
