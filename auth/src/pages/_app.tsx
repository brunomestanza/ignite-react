// A estratégia de autenticação consiste em fazermos tudo do lado do servidor, para que caso o cliente esteja com o JS desativado, ele não
// consiga ver o conteúdo de nenhuma forma

import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
