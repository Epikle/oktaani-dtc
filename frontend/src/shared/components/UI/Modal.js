import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  footerClass,
  footer,
  children,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = ({ show, onCancel, ...props }) => {
  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      {show && <ModalOverlay {...props} />}
    </Fragment>
  );
};

export default Modal;
