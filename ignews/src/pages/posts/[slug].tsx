// Esse arquivo no caso é uma subrota da rota de posts, ou seja, temos /posts/slug do post

import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {/* O dangerouslySetInnerHTML é utilizado para que o React interprete HTML diretamente, porém deve ser usado com cautela por conta das tags de script, podemos usar nesse caso porque o prismic tem tratativa pra isso, passamos pra ele um objeto que tem o __html, que recebe o html */}
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }}/>
        </article>
      </main>
    </>
  )
}

// Páginas geradas de forma estática no next, com getStaticProps não são protegidas, por isso usamos getServerSideProps
// Params recebe os parâmetros passados por uma rota dinâmica
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  // Pegamos a sessão do usuário para podermos saber se ele está logado ou não
  const session = await getSession({ req });
  const { slug } = params;
  if (!session?.activeSubscription) {
    // Quando usamos getServerSideProps, ao invés de direcionarmos as props, podemos direcionar o usuário para outro local do fluxo usando o redirect
    return {
      redirect: {
        destination: `/posts/preview/${slug}`, // Local da aplicação para onde o usuário vai
        permanent: false, // Se o redirect é permanente para essa aba ou não, se ele vai conseguir acessar novamente ou não
      }
    }
  }
  const prismic  = getPrismicClient(req);
  // Como a tipagem do slug e de uma string ou um array, convertemos para string para ter certeza que receberemos uma string
  // O terceiro parâmetro abaixo é utilizado para que possamos passar itens adicionais de forma opicional, mas o parâmetro deve ser passado mesmo que vazio
  const response = await prismic.getByUID<any>('post', String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', { // Formatação da data
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    }
  }
}
