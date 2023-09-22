import styles from './Modal.module.css';

type Props = {
  show: boolean;
  onCancel(): void;
  header: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
};

export default function Modal({
  show,
  onCancel,
  header,
  children,
  footer,
  className,
  style,
  headerClass,
  contentClass,
  footerClass,
}: Props) {
  if (!show) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onCancel} />
      <div className={[styles.modal, className].join(' ')} style={style}>
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
