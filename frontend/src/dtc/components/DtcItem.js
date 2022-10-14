import { useContext, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import EditDtc from './EditDtc';
import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './DtcItem.css';

const DtcItem = ({ dtc, onDelete, setIsChanged, loading, error, notFound }) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDeleteHandler = () => setIsDeleting((prevS) => !prevS);
  const toggleEditHandler = () => setIsEditing((prevS) => !prevS);

  const confirmDeleteHandler = async () => {
    setIsDeleting(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/dtc/${dtc.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );

      onDelete(dtc.id);
    } catch (error) {}
  };

  if (loading) {
    return (
      <li>
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
    );
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

  const styles = auth.isLoggedIn
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

      <EditDtc
        showModal={isEditing}
        hideModal={toggleEditHandler}
        id={dtc.id}
        setIsChanged={setIsChanged}
      />

      <li>
        <article className={styles}>
          <div>
            <h3>
              <abbr title={dtc.system.title}>{dtc.code.title.charAt(0)}</abbr>
              {dtc.code.title.substring(1)}
            </h3>
            {auth.isLoggedIn && (
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
