// Essa página é inserida dentro de uma pasta, para que possamos colocar a estilização aqui dentro, e também para que possamos colocar a URL específica
// de cada um dos posts aqui
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'; // Conversor do Prismic de texto para HTML
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

// Usamos o tipo abaixo por termos um array de posts, então tipamos como deve ser cada item do array abaixo
type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string,
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) { // Recebemos os posts como props do getStaticProps
  return (
    <>
      <Head>
        <title>Posts | ig.news </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.postList}>
           {posts.map(post => (
            //  O link abaixo possui a abertura de um post com uma URL única para cada post que acessamos utilizando o slug.
             <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<any>([
    // Na query abaixo buscamos por todos os documentos que o tipo for post, que é o que foi cadastrado no prismic
    // O predicates funciona como se fosse um where em banco de dados, e colocamos o código dentro de um array porque podemos ter mais de um deles
    Prismic.predicates.at('document.type', 'post')
  ], {
    // Passamos os dados que queremos buscar da publicação, a data e o ID do post vem em todos por padrão
    fetch: ['post.title', 'post.content'],
    pageSize: 100, // Quantos dados queremos buscar, lembrando que sempre devemos ter paginação por motivos de performance
  });

  // Utilizamos o código abaixo para que possamos ver dentro do terminal um objeto em cascata, que é o motivo de termos o 2 no código
  // No caso o objeto em cascata é um objeto que tem outro objeto dentro de si
  // console.log(JSON.stringify(response, null, 2));

  const posts = response.results.map(post => {
    return {
      slug: post.uid, // URL específica daquele POST
      title: RichText.asText(post.data.title),
      // Nessa linha, buscamos pelo content que tenha o tipo como parágrafo, e caso ele exista retornamos o seu texto, caso não, uma string vazia
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', { // Formatação da data
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts,
    }
  }
}