import Image from 'next/image';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from './SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}> 
        <Image
          alt="ig.news"
          height="31"
          src="/images/logo.svg"
          width="110"
        />
        <nav>
          {/* As tags de ancora não devem ser substituidas, mas sim englobadas pela tag Link do Next */}
          {/* A tag Link recebe o href que a tag ancora normalmente teria, e também pode receber a tag prefetch */}
          {/* O prefetch faz com que a página seja pre carregada, isso é feito antes da página em si ser acessada */}
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a href="#">Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
};
