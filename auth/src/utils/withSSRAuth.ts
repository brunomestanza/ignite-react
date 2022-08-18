// Função utilizada em páginas que só podem ser usadas por autorizados (pessoas logadas)
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";
import decode from 'jwt-decode';
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P extends { [key: string]: any; }>(func: GetServerSideProps<P>, options?: WithSSRAuthOptions){
  // Essa função retorna uma função porque o Next espera que getServerSideProps seja uma função, não a execução de uma
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // Agora como a função é chamada pelo lado do servidor, é passado o contexto da aplicação no backend do next
    const cookies = parseCookies(ctx);
    const token = cookies['auth.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false // Utilizado apenas para código HTTP
        },
      };
    };
   if (options) {
    const user = decode<{ permissions: string[], roles: string[], }>(token);
    const { permissions, roles } = options;
    const userHasValidPermissions = validateUserPermissions({ user, permissions, roles });
    if (!userHasValidPermissions) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    };
   };

    try {
      // Caso não possamos redirecionar o usuário para o dash na falta da existência do cookie, nós executamos a função que é salva como parâmetro
      return await func(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'auth.token');
        destroyCookie(ctx, 'auth.refreshToken');
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      };
    }; 
  };
};
