import styles from './Error.module.css';

export default function Error({ error }: { error: string }) {
  return (
    <article className={styles['e-code']}>
      <div>
        <h2>Error</h2>
      </div>
      <p>{error}</p>
      <button>Error</button>
    </article>
  );
}
