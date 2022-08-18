// Função utilizada em páginas que só podem ser usadas por visitantes (pessoas não logadas)

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P extends { [key: string]: any; }>(func: GetServerSideProps<P>){
  // Essa função retorna uma função porque o Next espera que getServerSideProps seja uma função, não a execução de uma
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // Agora como a função é chamada pelo lado do servidor, é passado o contexto da aplicação no backend do next
    const cookies = parseCookies(ctx);

    if (cookies['auth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false // Utilizado apenas para código HTTP
        },
      };
    };

    // Caso não possamos redirecionar o usuário para o dash na falta da existência do cookie, nós executamos a função que é salva como parâmetro
    return await func(ctx);
  };
};
