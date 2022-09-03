import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const ShowDtc = (props) => {
  const [loadedDtc, setLoadedDtc] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [dtcModal, setDtcModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDtc = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/dtc/${props.id}`
        );
      } catch (error) {
        console.log(error);
      }
      setLoadedDtc(responseData);
    };

    fetchDtc();
  }, [sendRequest, props.id]);

  const closeDtcModalHandler = () => {
    setDtcModal(false);
    navigate('/');
  };

  return (
    <React.Fragment>
      <Modal
        show={dtcModal}
        onCancel={closeDtcModalHandler}
        header={
          !isLoading && loadedDtc ? (
            <>
              {loadedDtc.dtc.code.title}{' '}
              <span>/ {loadedDtc.dtc.system.title}</span>
            </>
          ) : (
            'Loading...'
          )
        }
        headerClass={
          !isLoading && loadedDtc
            ? loadedDtc.dtc.code.title.charAt(0).toLowerCase() + '-code'
            : ''
        }
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDtcModalHandler} type="button">
              CLOSE
            </Button>
          </React.Fragment>
        }
      >
        {error && (
          <p>
            <strong>Error:</strong> {error}
          </p>
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && loadedDtc && (
          <div>
            <p>
              <strong>Subsystem</strong>
              <br /> {loadedDtc.dtc.system.subName} (
              {loadedDtc.dtc.system.subCode})
            </p>
            <p>
              <strong>Code Description</strong>
              <br />
              {loadedDtc.dtc.code.description}
            </p>
            <p>
              {loadedDtc.dtc.code.location && (
                <>
                  <strong>Code Location</strong>
                  <br /> {loadedDtc.dtc.code.location}
                </>
              )}
            </p>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default ShowDtc;
