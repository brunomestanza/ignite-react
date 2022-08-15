import { GetStaticProps } from 'next';
import Head  from 'next/head';
import Image from 'next/image';
import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      {/* Tudo que é passado dentro deste Head, é anexado ao _document da aplicação, junto as informações que temos lá */}
      {/* Podemos utilizar isso para SEO, título da página, e qualquer outra informação */}
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <Image
          alt="Girl coding"
          height="521"
          src="/images/avatar.svg"
          width="336"
        />
      </main>
    </>
  )
}

// O código abaixo é um código SSR, que consiste em um código que é executado dentro do servidor Next antes da página ser renderizada
// Pode apenas ser utilizado dentro de pages
// Pode ser utilizada para que possamos realizar algo ANTES da página ser renderizada
// export const getServerSideProps: GetServerSideProps = async () => {
//   Code...
// }

// O código abaixo é um exemplo de uma aplicação em SSG, que faz tudo oque o SSR faz, mas além disso gera uma página HTML estática que é salva no servidor
// Pode apenas ser utilizada dentro de pages
// Pode ser utilizada apenas para páginas com informações compartilhadas por todos os usuários
export const getStaticProps: GetStaticProps = async () => {
  // Usamos retrieve quando queremos buscar apenas um preço, e passamos pro stripe o ID do preço que configuramos no stripe
  // Por mais que não esteja no código, podemos usar o expand para recebermos informações do produto, no caso o preço, como descrição e afins
  // Isso pode ser acessado através de price.product
  const price = await stripe.prices.retrieve('price_1KPEECH0GMCNHpYOZXGzKSg8');
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    // O reavalidate, diz quanto tempo em segundos o servidor mantêm a página estática, antes de a reavalidar, ou seja, de a renderizar do zero novamente
    revalidate: 60 * 60 * 24, // 24 hours  
  }
}
