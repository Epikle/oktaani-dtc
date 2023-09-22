import { useState } from 'react';

import styles from './InfoBubble.module.css';

export default function InfoBubble({}) {
  const [show, setShow] = useState(false);

  return (
    <button
      className={styles.bubble}
      onClick={() => setShow((prevS) => !prevS)}
    >
      Want to learn
      <br />
      more about{' '}
      <strong>
        <abbr title="Diagnostic Trouble Code">DTC</abbr>
      </strong>
      &apos;s?
    </button>
  );
}
