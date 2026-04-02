import Link from 'next/link';
import styles from './Header.module.scss';

export default async function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <h1 className={styles.header__title}>PlantPunk</h1>
      </Link>
      <nav className={styles.header__nav}>
        <span>Search</span>
      </nav>
    </header>
  );
}