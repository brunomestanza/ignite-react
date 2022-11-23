import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { Header } from '../components/Header'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles() // Colocado aqui porque se ele fica dentro da função app, ele vai acabar sendo executado novamente dentro de cada uma das páginas

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      stripe={process.env.STRIPE_SECRET_KEY as string}
      cartMode="checkout-session"
      currency="BRL"
      shouldPersist
    >
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
