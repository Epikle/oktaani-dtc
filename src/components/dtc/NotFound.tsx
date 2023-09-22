import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <article className={styles['f-code']}>
      <div>
        <h2>
          <abbr title="Not Found">?</abbr>Search
        </h2>
      </div>
      <p>Search didn&apos;t find anything. Try again.</p>
      <button>Not Found</button>
    </article>
  );
}
