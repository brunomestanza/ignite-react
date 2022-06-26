// Esse arquivo é uma subrota da rota de posts, ou seja, pode ser acessado em posts/preview/slug do post

import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
    // router e post.slug não terão seus valores alterados, por isso não precisam estar no array de depêndencias
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[session]);

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
          <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content }}/>
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

// É utilizado em páginas estáticas que tem parâmetros dinâmicos, para que possamos passar páginas que serão geradas de forma estática
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      // As páginas que forem colocadas aqui, são criadas de forma estática durante o build e não no primeiro acesso
    ],
    // Pode receber true (se a página for acessada, e não tiver sido gerada de forma estática ainda, a tela será aberta, e as requisições serão feitas após a tela ter sido carregada, oque gera 2 problemas, ele causa layout shift, aonde a página é carregada sem o conteúdo, e depois o conteúdo é carregado com delay e ele não é muito bom para SEO, porque os posts porém não estar disponíveis no acesso dos motores de busca), false (se o post não foi gerado de forma estática ainda, ele retorna 404, e somente isso, pode ser utilizado quando não teremos novos registros, e quando tudo é gerado de forma estática no momento da build) e blocking (parece com o true, mas quando o conteúdo que ainda não foi gerado de forma estática tenta ser acessado, ele usa server side rendering, carregando o conteúdo na camada do Next, pra só então mostrar ele em tela, oque corrige os problemas da opção true)
    fallback: 'blocking',
  }
}

// Diferente da página de post completa, essa página é publica, por isso pode ser gerada de forma estática
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic  = getPrismicClient();
  // Como a tipagem do slug e de uma string ou um array, convertemos para string para ter certeza que receberemos uma string
  // O terceiro parâmetro abaixo é utilizado para que possamos passar itens adicionais de forma opicional, mas o parâmetro deve ser passado mesmo que vazio
  const response = await prismic.getByUID<any>('post', String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', { // Formatação da data
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutos
  }  
}
