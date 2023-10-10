import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      2023 &copy;{' '}
      <a href="https://oktaani.com/" rel="noopener noreferrer" target="_blank">
        oktaani.com
      </a>
    </footer>
  );
}
