import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Image from 'next/image';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [readTime, setReadTime] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.isFallback) {
      return 0;
    }

    const wordsReadPerMinute = 200;
    const contentWords = post.data.content.reduce(
      (summedContents, currentContent) => {
        const headingWords = currentContent.heading.split(/\s/g).length;
        const bodyWords = RichText.asText(currentContent.body).split(
          /\s/g
        ).length;

        return summedContents + headingWords + bodyWords;
      },
      0
    );
    const minutes = contentWords / wordsReadPerMinute;
    const totalReadTime = Math.ceil(minutes);
    setReadTime(totalReadTime);
  }, [post, router.isFallback]);

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }
  return (
    <>
      <Header />
      <img
        src={post.data.banner.url}
        alt="Post image"
        className={styles.postImage}
      />
      <article className={styles.post}>
        <h1>{post.data.title}</h1>
        <div className={styles.postInfos}>
          <FiCalendar />
          <time>
            {format(new Date(post.first_publication_date), 'd MMM y', {
              locale: ptBR,
            })}
          </time>
          <FiUser />
          <span>{post.data.author}</span>
          <FiClock />
          <span>{readTime} min</span>
        </div>
        {post.data.content.map(content => (
          <div key={content.heading} className={styles.postContent}>
            <h3>{content.heading}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body),
              }}
            />
          </div>
        ))}
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: 'como-utilizar-hooks' } },
      { params: { slug: 'criando-um-app-cra-do-zero' } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});
  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
