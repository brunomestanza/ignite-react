// Precisamos ter 2 arquivos de API, porque ele é feito pra funcionar pelo servidor, e pelo client, já que o nookies precisa do ctx quando
// os cookies forem utilizados pelo backend, sendo assim, temos 2 arquivos para temos 2 chamadas, um pelo server, e um pelo client
import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from '../errors/AuthTokenError';

interface AxiosErrorResponse {
  code?: string;
}

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['auth.token']}`
    },
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError<AxiosErrorResponse>) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        // Renova o token, por ele ter expirado
        cookies = parseCookies();
        const { 'auth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config; // COnfiguração inicial da request
        if (!isRefreshing) {
          isRefreshing = true;
          api.post('/refresh', { refreshToken }).then(response => {
            const newToken = response.data.token;
            const newRefreshToken = response.data.token;
            setCookie(ctx, 'auth.refreshToken', newToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });
            setCookie(ctx, 'auth.refreshToken', newRefreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });
            api.defaults.headers['Authorization'] = `Bearer ${newToken}`;
            // Pegamos a lista das requests com falha e lançamos a request novamente
            failedRequestsQueue.forEach(request => request.onSuccess(newToken));
            failedRequestsQueue = [];
            }).catch(error => {
              // Pegamos a lista das requests com falha e lançamos um erro
              failedRequestsQueue.forEach(request => request.onFailure(error));
              failedRequestsQueue = [];
              if (typeof window !== 'undefined') { // Verifica se a chamada é feita no browser do cliente ao invés do server
                signOut();
              } else {
                return Promise.reject(new AuthTokenError());
              }
            }).finally(() => {
            isRefreshing = false;
          });
        }
  
        // Utilizamos a promise para que o código aguarde a requisição ser finalizada, e as requests tenham todas o token atualizado
        // Temos assim uma fila de requisições
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            // O onSuccess consiste no que acontece quando o token termina de atualizar, no caso, todas as requests serão lançadas novamente
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalConfig));
            },
            // O onFailure é oque ocorre caso o processo de refresh do token tenha dado falha
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          })
        });
      } else {
        // Deslogar o usuário, por ter ocorrido quaisquer outro tipo de erro
        if (typeof window !== 'undefined') { // Verifica se a chamada é feita no browser do cliente ao invés do server
          signOut();
        }
      };
    };
  
    // Repasssamos o erro para que as chamadas do axios, possam tratar o erro da melhor forma possível, dentro dos catchs da chamada
    return Promise.reject(error);
  });


  return api;
}