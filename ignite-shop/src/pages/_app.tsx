import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { CartProvider } from 'use-shopping-cart'
import { Handbag } from 'phosphor-react'
import { globalStyles } from '../styles/global'
import { CartContainer, Container, Header } from '../styles/pages/app'
import logoImg from '../assets/logo.svg'

globalStyles() // Colocado aqui porque se ele fica dentro da função app, ele vai acabar sendo executado novamente dentro de cada uma das páginas

const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${process.env.NEXT_URL}/`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      stripe={process.env.STRIPE_SECRET_KEY as string}
      cartMode="client-only"
      currency="BRL"
      shouldPersist
    >
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
          <CartContainer>
            <span>1</span>
            <Handbag size={48} weight="bold" />
          </CartContainer>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
