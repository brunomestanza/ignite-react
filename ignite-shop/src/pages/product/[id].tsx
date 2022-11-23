import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    formattedPrice: string
    description: string
    defaultPriceId: string
    price: number
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addItem } = useShoppingCart()

  // FIXME: Remove comment if not used
  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)
  //     // O axios usa a mesma base de URL do FrontEnd por padrão
  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
  //     })
  //     const { checkoutUrl } = response.data
  //     window.location.href = checkoutUrl // Fazemos dessa forma por se tratar de rota externa, em rotas internas pode ser com useRouter
  //   } catch (err) {
  //     setIsCreatingCheckoutSession(false)
  //     // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
  //     alert('Falha ao redirecionar ao checkout')
  //   }
  // }

  function addItemToCart() {
    addItem(
      {
        name: product.name,
        description: product.description,
        id: product.id,
        price: product.price,
        currency: 'BRL',
        image: product.imageUrl,
      },
      { count: 1 },
    )
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>
          <button onClick={addItemToCart}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

// Usamos getStaticPaths pra obtermos parâmetros em páginas estáticas, porque no momento da build não é possível obte-los
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Contêm objetos dos possíveis parâmetros estáticos, eles são gerados NO MOMENTO DA BUILD, colocar poucas coisas, pra build não demorar
    // Colocar apenas as coisas mais acessadas
    paths: [{ params: { id: 'prod_MpXWdf0eYOSKDv' } }],
    // O fallback pode receber 3 valores
    // False: Todos os paths não gerados no momento da build, retornam 404
    // True: Todos os paths não gerados no momento da build, são gerados na hora, porém a página é carregada sem essa informação estar pronta,
    // ou seja no caso dessa aplicação, a página tentaria ser gerada sem o product estar carregado, oque gera erro. É possível fazer um loading
    // pra isso através do isFallback que vem do useRouter do Next
    // Blocking: Todos os paths não gerados no momento da build, são gerados na hora, porém a página é carregada apenas depois que a informação é
    // recebida. Sendo assim, a página de produto só apareceria quando o produto fosse buscado da API do stripe, isso pode gerar loadings
    // mais demorados.
    // É importante dizer que no caso da página estar sendo acessada através de um Link do Next, ela só vai abrir após ter o conteúdo carregado, mas se
    // ela for acessada com o link diretamente, pode dar erro, como por exemplo um link de produto acesso diretamente no cliente
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        formattedPrice: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
        price: price.unit_amount,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
