'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  header: string;
  footer?: React.ReactNode;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
};

export default function Modal({
  children,
  header,
  footer,
  className,
  headerClass,
  contentClass,
  footerClass,
}: Props) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <div className={styles.backdrop} onClick={onDismiss} />
      <div className={[styles.modal, className].join(' ')}>
        <header className={[styles.header, headerClass].join(' ')}>
          <h2>{header}</h2>
        </header>
        <div className={[styles.content, contentClass].join(' ')}>
          {children}
        </div>
        <footer className={[styles.footer, footerClass].join(' ')}>
          {footer}
        </footer>
      </div>
    </>
  );
}
