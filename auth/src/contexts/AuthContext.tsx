import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'auth.token');
  destroyCookie(undefined, 'auth.refreshToken');
  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  // Poderiamos utilizar as informações do JWT para termos as infos do usuário, mas foi utilizada a estratégia de fazer a requisição para o BackEnd
  // porque garantimos que sempre vamos ter as informações do usuário carregadas, já que as infos podem alterar frequentemente
  useEffect(() => {
    const { 'auth.token': token } = parseCookies();
    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      }).catch(() => {
        signOut();
      });
    };
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', { email, password, });
      const { refreshToken, token, permissions, roles } = response.data;

      // O primeiro parâmetro é o contexto da request, que como é executado apenas pelo browser nesse caso, fica como undefined
      // O segundo é o nome do token, recomendado não colocar apenas token, mas sim algo como o appname.token, e o terceiro é o token
      // O quarto e ultimo é um object de opções
      setCookie(undefined, 'auth.token', token, {
        // O token possui um tempo de validação de um mês, porque o responsável por verificar se o token é válido ou não é o BackEnd
        maxAge: 60 * 60 * 24 * 30,
        path: '/', // Caminhos do app que tem acesso ao cookie
      });
      setCookie(undefined, 'auth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      setUser({ email, permissions, roles, });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
