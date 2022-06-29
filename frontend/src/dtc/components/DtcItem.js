import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditDtc from './EditDtc';
import Modal from '../../shared/components/UI/Modal';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './DtcItem.css';

const DtcItem = (props) => {
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
        process.env.REACT_APP_BACKEND_URL + `/dtc/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );

      props.onDelete(props.id);
    } catch (error) {}
  };

  if (props.loading) {
    return (
      <li>
        <article className="loading-code">
          <div>
            <h3>
              <abbr title="Loading...">L</abbr>0000
            </h3>
          </div>
          <p>Loading content, please wait. :)</p>
          <button className="more-code">Loading...</button>
        </article>
      </li>
    );
  }

  if (props.error) {
    return (
      <ul className="dtc-list">
        <li>
          <article className="e-code">
            <div>
              <h3>
                <abbr title="Error">R</abbr>error
              </h3>
            </div>
            <p>{props.error}</p>
            <button className="more-code">Error</button>
          </article>
        </li>
      </ul>
    );
  }

  if (props.notFound) {
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
    ? `${props.codeTitle.charAt(0).toLowerCase()}-code admin`
    : `${props.codeTitle.charAt(0).toLowerCase()}-code`;

  return (
    <React.Fragment>
      <Modal
        show={isDeleting}
        onCancel={toggleDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={toggleDeleteHandler} type="button">
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler} type="button">
              DELETE
            </Button>
          </React.Fragment>
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
        id={props.id}
        setIsChanged={props.setIsChanged}
      />

      <li>
        <article className={styles}>
          <div>
            <h3>
              <abbr title={props.systemTitle}>{props.codeTitle.charAt(0)}</abbr>
              {props.codeTitle.substring(1)}
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
          <p>{props.description}</p>
          <button
            className="more-code"
            onClick={() => {
              navigate('/dtc/' + props.id);
            }}
          >
            More info
          </button>
        </article>
      </li>
    </React.Fragment>
  );
};

export default DtcItem;
