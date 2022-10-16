import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import EditDtc from './EditDtc';
import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import { deleteDtc } from '../../shared/util/fetch';

import './DtcItem.css';

const DtcItem = ({ dtc, loading, error, notFound, placeholderCount = 6 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDeleteHandler = () => setIsDeleting((prevS) => !prevS);
  const toggleEditHandler = () => setIsEditing((prevS) => !prevS);

  const deleteDtcMutation = useMutation(
    async (id) => {
      const accessToken = await getAccessTokenSilently();
      await deleteDtc(id, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dtcList']);
      },
    }
  );

  const confirmDeleteHandler = () => {
    setIsDeleting(false);
    deleteDtcMutation.mutate(dtc.id);
  };

  if (loading) {
    const loadingPlaceholders = Array.from(
      Array(placeholderCount),
      (_, idx) => (
        <li key={idx}>
          <article className="loading-code">
            <div>
              <h3>
                <abbr title="Loading...">L</abbr>0000
              </h3>
            </div>
            <p>Loading content, please wait.</p>
            <button className="more-code">Loading...</button>
          </article>
        </li>
      )
    );

    return loadingPlaceholders;
  }

  if (error) {
    return (
      <ul className="dtc-list">
        <li>
          <article className="e-code">
            <div>
              <h3>
                <abbr title="Error">R</abbr>error
              </h3>
            </div>
            <p>{error}</p>
            <button className="more-code">Error</button>
          </article>
        </li>
      </ul>
    );
  }

  if (notFound) {
    return (
      <ul className="dtc-list">
        <li>
          <article className="e-code">
            <div>
              <h3>
                <abbr title="Not Found">?</abbr>Search
              </h3>
            </div>
            <p>Search didn't find anything. Try again.</p>
            <button className="more-code">Not Found</button>
          </article>
        </li>
      </ul>
    );
  }

  const styles = isAuthenticated
    ? `${dtc.code.title.charAt(0).toLowerCase()}-code admin`
    : `${dtc.code.title.charAt(0).toLowerCase()}-code`;

  return (
    <Fragment>
      <Modal
        show={isDeleting}
        onCancel={toggleDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={toggleDeleteHandler} type="button">
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler} type="button">
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this DTC?
          <br />
          Please note that it can't be undone.
        </p>
      </Modal>

      <EditDtc showModal={isEditing} hideModal={toggleEditHandler} dtc={dtc} />

      <li>
        <article className={styles}>
          <div>
            <h3>
              <abbr title={dtc.system.title}>{dtc.code.title.charAt(0)}</abbr>
              {dtc.code.title.substring(1)}
            </h3>
            {isAuthenticated && (
              <div className="control-code">
                <button onClick={toggleEditHandler}>
                  <span className="material-icons"> edit </span>
                </button>
                <button className="delete" onClick={toggleDeleteHandler}>
                  <span className="material-icons"> delete </span>
                </button>
              </div>
            )}
          </div>
          <p>{dtc.code.description}</p>
          <button
            className="more-code"
            onClick={() => {
              navigate('/dtc/' + dtc.id);
            }}
          >
            More info
          </button>
        </article>
      </li>
    </Fragment>
  );
};

export default DtcItem;
