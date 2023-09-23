import Link from 'next/link';
import styles from './InfoBubble.module.css';

export default function InfoBubble({}) {
  return (
    <Link href="/info" className={styles.bubble} scroll={false}>
      Want to learn
      <br />
      more about{' '}
      <strong>
        <abbr title="Diagnostic Trouble Code">DTC</abbr>
      </strong>
      &apos;s?
    </Link>
  );
}
