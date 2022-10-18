import { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { getDtcList } from '../../shared/util/fetch';

const ShowDtc = ({ id }) => {
  const [dtcModal, setDtcModal] = useState(true);
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(['dtcList'], getDtcList);

  const dtc = data?.length > 0 ? data.filter((dtc) => dtc.id === id) : [];

  useEffect(() => {
    if ((!isLoading && dtc.length === 0) || isError) {
      setDtcModal(false);
      return navigate('/');
    }
  }, [isError, dtc.length, isLoading, navigate]);

  const closeDtcModalHandler = () => {
    setDtcModal(false);
    navigate('/');
  };

  return (
    <Fragment>
      <Modal
        show={dtcModal}
        onCancel={closeDtcModalHandler}
        header={
          <Fragment>
            {isLoading || dtc.length === 0 ? (
              'Loading...'
            ) : (
              <>
                {dtc[0].code.title} <span>/ {dtc[0].system.title}</span>
              </>
            )}
          </Fragment>
        }
        headerClass={
          !isLoading &&
          dtc.length === 1 &&
          dtc[0].code.title.charAt(0).toLowerCase() + '-code'
        }
        footer={
          <Button inverse onClick={closeDtcModalHandler} type="button">
            CLOSE
          </Button>
        }
      >
        {isLoading || dtc.length === 0 ? (
          <LoadingSpinner />
        ) : (
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
                <Fragment>
                  <strong>Code Location</strong>
                  <br /> {dtc[0].code.location}
                </Fragment>
              )}
            </p>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default ShowDtc;
