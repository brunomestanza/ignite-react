import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../lib/stripe'
import {
  SuccessContainer,
  ImageContainer,
  ProductsContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imagesUrl: string[]
  }
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart, cartDetails } = useShoppingCart()
  useEffect(() => {
    if (cartDetails !== undefined && Object.keys(cartDetails).length !== 0) {
      clearCart()
    }
  }, [clearCart, cartDetails])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        {/* A meta abaixo faz com que os crawlers não indexem essa página */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ProductsContainer>
          {products.imagesUrl.map((image, index) => {
            return (
              <ImageContainer key={image} css={{ zIndex: index }}>
                <Image src={image} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ProductsContainer>
        <h1>Compra efetuada</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {products.imagesUrl.length} camisetas já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    // O código abaixo é para dar expand no produto
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details!.name
  const product = session.line_items!.data[0].price?.product as Stripe.Product
  const products = session.line_items!.data.map((item) => {
    if (item.price !== null) {
      return item.price.product
    } else {
      return ''
    }
  }) as Stripe.Product[]
  const productsImages = products.map((product) => {
    return product.images[0]
  })

  return {
    props: {
      customerName,
      products: {
        name: product.name,
        imagesUrl: productsImages,
      },
    },
  }
}
