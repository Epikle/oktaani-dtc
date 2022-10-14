import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = ({ onClear, error }) => (
  <Modal
    onCancel={onClear}
    header="An Error Occurred!"
    show={!!error}
    footer={
      <Button onClick={onClear} type="button">
        Okay
      </Button>
    }
  >
    <p>{error}</p>
  </Modal>
);

export default ErrorModal;
