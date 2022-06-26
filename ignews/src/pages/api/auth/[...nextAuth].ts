// Todas as API Routes do Next são serverless, que fazem com que o server não fique online 24hrs, mas apenas suba quando recebe alguma request
// Para a criação de rotas dinâmicas, podemos criar uma pasta para a rota, e dentro dela, criarmos um arquivo dentro de colchetes
// A partir disso, tudo que nós passarmos por parâmetro na URL, nós recebemos dentro da request, através de request.query, como por exemplo um ID
// Nós podemos usar o spread operator (...) antes dos colchetes, passarmos não apenas um parâmetro, mas sim múltiplos parâmetros, como por exemplo edit e ID
// Podemos fazer um rota para log in e log out por exemplo, ao invés de duas rotas, e usamos o parâmetro para direcionarmos a funcionalidade no código
import NextAuth from "next-auth"; // Salvamos as informações de login do usuário dentro dos cookies do navegador
import GithubProvider from "next-auth/providers/github";
import { query } from 'faunadb';
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user', // Podemos passar diversos escopos, dependendo da permissão que necessitemos para a aplicação dentro do scope
        },
      },
    }),
  ],
  callbacks: { // Essa função de callback sempre é executada quando o user interage com a aplicação
    // Abaixo nos estamos alterando as informações que são salvas na sessão do usuário, porque precisamos passar se ele possui inscrição ou não
    async session({ session }) {
      try {
        const userActiveSubscription = await fauna.query(
          query.Get(
            // A intersection faz com que os 2 matches tenham que retornar true para ocorrer a busca
            query.Intersection([
              query.Match(
                query.Index('subscription_by_user_ref'),
                query.Select(
                  'ref',
                  query.Get(
                    query.Match(
                      query.Index('user_by_email'),
                      query.Casefold(session.user.email)
                    )
                  )
                )
              ),
              query.Match(
                query.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )
  
        return {
          // Retornamos todos os dados que temos da session normalmente, e o activeSubscription
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user;
      try {
        await fauna.query(
          // Verifica se existe um usuário que dê match
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  // Todas as buscas que são feitas no fauna precisam ser feita sem um index, indices utilizam o valor da sua criação como a chave da busca
                  // No exemplo desse projeto, os índices são os emails dos usuários
                  query.Index("user_by_email"),
                  query.Casefold(user.email)
                )
              )
            ),
            query.Create( // Método de inserção de dados
              query.Collection('users'), // 1 param, nome da collection
              { data: { email } } // Inserimos o email que vem da autenticação
            ),
            query.Get(
              query.Match(
                query.Index("user_by_email"),
                query.Casefold(user.email)
              )
            )
          )
        )
        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  }
});