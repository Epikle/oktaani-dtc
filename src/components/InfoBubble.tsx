import { useState } from 'react';

import Portal from './Portal';
import Modal from './Modal';

import styles from './InfoBubble.module.css';

export default function InfoBubble({}) {
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((prevS) => !prevS);
  }

  return (
    <>
      {show && (
        <Portal selector="#bubble">
          <Modal
            show={show}
            onCancel={toggleShow}
            header="More about DTCs"
            footer={<button onClick={toggleShow}>CLOSE</button>}
          >
            <p className="more-dtc">
              <strong>ISO/SAE controlled codes (core DTCs)</strong>
              <br />
              ISO/SAE-controlled diagnostic trouble codes are those codes where
              industry uniformity has been achieved. These codes were felt to be
              common enough across most manufacturers’ applications that a
              common number and fault message could be assigned.
            </p>
            <p className="more-dtc">
              Check out{' '}
              <a href="https://en.wikipedia.org/wiki/On-board_diagnostics">
                the Wikipedia article
              </a>{' '}
              for more information.
            </p>
          </Modal>
        </Portal>
      )}
      <button className={styles.bubble} onClick={toggleShow}>
        Want to learn
        <br />
        more about{' '}
        <strong>
          <abbr title="Diagnostic Trouble Code">DTC</abbr>
        </strong>
        &apos;s?
      </button>
    </>
  );
}
