import React from 'react';

import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';

const AboutDtcs = (props) => {
  return (
    <Modal
      show={props.isAboutDtc}
      onCancel={props.onCancel}
      header="More about DTCs"
      footer={
        <React.Fragment>
          <Button inverse onClick={props.onCancel} type="button">
            CLOSE
          </Button>
        </React.Fragment>
      }
    >
      <p>
        <strong>ISO/SAE controlled codes (core DTCs)</strong>
        <br />
        ISO/SAE-controlled diagnostic trouble codes are those codes where
        industry uniformity has been achieved. These codes were felt to be
        common enough across most manufacturers’ applications that a common
        number and fault message could be assigned.
      </p>
    </Modal>
  );
};

export default AboutDtcs;
