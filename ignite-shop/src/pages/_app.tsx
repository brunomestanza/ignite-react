import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'

globalStyles() // Colocado aqui porque se ele fica dentro da função app, ele vai acabar sendo executado novamente dentro de cada uma das páginas

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
