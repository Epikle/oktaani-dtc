import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import { getDtcList } from '../../shared/util/fetch';

const ShowDtc = ({ id }) => {
  const [dtcModal, setDtcModal] = useState(true);
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(['dtcList'], getDtcList);

  const closeDtcModalHandler = () => {
    setDtcModal(false);
    navigate('/');
  };

  if (isLoading) return null;
  if (isError) {
    console.log(error);
    return null;
  }

  const dtc = data.length > 0 ? data.filter((dtc) => dtc.id === id) : [];

  if (dtc.length === 0) navigate('/');

  return (
    <Fragment>
      <Modal
        show={dtcModal}
        onCancel={closeDtcModalHandler}
        header={
          <Fragment>
            {dtc[0].code.title} <span>/ {dtc[0].system.title}</span>
          </Fragment>
        }
        headerClass={dtc[0].code.title.charAt(0).toLowerCase() + '-code'}
        footer={
          <Button inverse onClick={closeDtcModalHandler} type="button">
            CLOSE
          </Button>
        }
      >
        <div>
          <p>
            <strong>Subsystem</strong>
            <br /> {dtc[0].system.subName} ({dtc[0].system.subCode})
          </p>
          <p>
            <strong>Code Description</strong>
            <br />
            {dtc[0].code.description}
          </p>
          <p>
            {dtc[0].code.location && (
              <>
                <strong>Code Location</strong>
                <br /> {dtc[0].code.location}
              </>
            )}
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ShowDtc;
