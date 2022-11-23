import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from '../styles/pages/home'
import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  // Keen slider NÃO funciona com espaçamentos dentro do CSS, como gap e padding, se for usar o keen, remover os espaçamentos
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              // O prefetch é relacionado ao pré carregamento de Links do Next, por padrão como true, faz com que TODOS os Links, tenham seu conteúdo
              // pré carregado antes de serem acessadas quando são reenderizadas em tela, porém isso se torna inviável com muitos itens em tela.
              // Como false, eles são pré-carregados APENAS com o hover do mouse do usuário sobre o Link.
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

// É importante lembrar que em DEV o getStaticProps funciona IGUAL o getServerSideProps, justamente pra não atrapalhar o desenvolvimento
// Diferente do getServerSideProps, que tem informações do contexto da requisição, o getStaticProps, não tem nada
// O SSG faz com que toda vez que o projeto roda da primeira vez, ou seja no build, a página estática é gerada
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'], // Usamos o expand pra podermos ter as informações do produto, que não vem por padrão, em forma de lista
  })
  // Fazemos uma formatação da response em products, para enviarmos apenas oque vai ser utilizado
  const products = response.data.map((product) => {
    // Usamos a tipagem do price porque por padrão o stripe envia o ID do price, mas através do expand nós vamos pegar todas as infos do preço
    const price = product.default_price as Stripe.Price // Price se torna o objeto com todas as infos do preço

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0], // A imagem é retornada num array porque podem ter múltiplas imagens
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100), // Objeto com todos os dados do preço, pegamos apenas o preço em si, ele vem em centavos, recomendado usar em bancos
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
