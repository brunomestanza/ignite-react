import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession(); // Retorna informações se o usuário tem uma sessão ativa ou não

  return session ? (
    <button
      className={styles.signInButton}
      onClick={() => signOut()}
      type="button"
    >
      <FaGithub color="#04d361" />
      {session.user.name }
      <FiX
        className={styles.closeIcon}
        color="#737380"
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() => signIn('github')}
      type="button"
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}