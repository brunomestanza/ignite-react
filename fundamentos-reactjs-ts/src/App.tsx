import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { posts } from "./data/posts";
import styles from './styles/App.module.css';
import './styles/global.css';

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post key={post.id} author={post.author} content={post.content} publishedAt={post.publishedAt} />
            )
          })}
        </main>
      </div>
    </div>
  )
};
