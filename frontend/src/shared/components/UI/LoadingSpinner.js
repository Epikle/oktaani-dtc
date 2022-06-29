import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return (
    <div className={styles.loadingwrapper}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default LoadingSpinner;
