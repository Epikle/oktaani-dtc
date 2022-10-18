import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';

import './AboutDtcs.css';

const AboutDtcs = ({ isAboutDtc, onCancel }) => (
  <Modal
    show={isAboutDtc}
    onCancel={onCancel}
    header="More about DTCs"
    footer={
      <Button inverse onClick={onCancel} type="button">
        CLOSE
      </Button>
    }
  >
    <p className="more-dtc">
      <strong>ISO/SAE controlled codes (core DTCs)</strong>
      <br />
      ISO/SAE-controlled diagnostic trouble codes are those codes where industry
      uniformity has been achieved. These codes were felt to be common enough
      across most manufacturers’ applications that a common number and fault
      message could be assigned.
    </p>
    <p className="more-dtc">
      Check out{' '}
      <a href="https://en.wikipedia.org/wiki/On-board_diagnostics">
        the Wikipedia article
      </a>{' '}
      for more information.
    </p>
  </Modal>
);

export default AboutDtcs;
