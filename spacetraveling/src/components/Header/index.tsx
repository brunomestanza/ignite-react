import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <Image alt="logo" src="/images/logo.svg" width="240" height="25" />
        </a>
      </Link>
    </div>
  );
}
