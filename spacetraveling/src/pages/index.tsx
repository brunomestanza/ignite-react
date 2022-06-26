import { useState } from 'react';
import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [posts, setPosts] = useState(postsPagination.results);

  async function getNewPosts() {
    const postsResponse = await fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => {
        return data;
      });
    console.log(postsResponse);
    setNextPage(postsResponse.next_page);
    const newPosts = postsResponse.results;
    setPosts(oldState => [...oldState, ...newPosts]);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {posts.map(post => (
          <div className={styles.post} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>{post.data.title}</a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div>
              <FiCalendar className={styles.icon} />
              <time>
                {format(new Date(post.first_publication_date), 'd MMM y', {
                  locale: ptBR,
                })}
              </time>
              <FiUser className={styles.icon} />
              <span>{post.data.author}</span>
            </div>
          </div>
        ))}
        {nextPage === null ? (
          ''
        ) : (
          <button
            className={styles.nextPage}
            type="button"
            onClick={getNewPosts}
          >
            Carregar mais posts
          </button>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: [],
      pageSize: 1,
    }
  );
  const nextPage = postsResponse.next_page;
  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: nextPage,
    results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
