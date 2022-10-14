import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className={styles.loadingwrapper}>
    <div className={styles.loading}></div>
  </div>
);

export default LoadingSpinner;
