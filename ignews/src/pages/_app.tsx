// Este é um componente que sempre fica por volta de todas as páginas da aplicação, e é o responsável por renderiza-las
// O app é recarregado toda vez que o usuário troca de tela
import { SessionProvider as NextAuthProvider } from 'next-auth/react'; // Renomeamos o provedor, porque podemos ter múltiplos
import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/global.scss';

// O Component na função abaixo possui o conteúdo da página
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Utilizamos o provider como um contexto, que armazena se o usuário está logado ou não, que podemos utilizar em quaisquer componente
    <NextAuthProvider session={pageProps.session}> {/* As informações sobre o usuário estar logado ou não, chegam através do pageProps.session */}
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
