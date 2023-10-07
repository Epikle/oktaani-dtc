import { Loader2 } from 'lucide-react';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <article className={styles['loading-code']}>
      <div>
        <h2>
          <Loader2 className={styles.spin} />
        </h2>
      </div>
      <p>Loading content, please wait.</p>
      <button>LOADING...</button>
    </article>
  );
}
