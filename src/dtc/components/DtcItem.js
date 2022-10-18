import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import EditDtc from './EditDtc';
import DeleteDtc from './DeleteDtc';

import './DtcItem.css';

const DtcItem = ({ dtc }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDeleteHandler = () => setIsDeleting((prevS) => !prevS);
  const toggleEditHandler = () => setIsEditing((prevS) => !prevS);

  const styles = isAuthenticated
    ? `${dtc.code.title.charAt(0).toLowerCase()}-code admin`
    : `${dtc.code.title.charAt(0).toLowerCase()}-code`;

  return (
    <Fragment>
      <DeleteDtc
        showModal={isDeleting}
        hideModal={toggleDeleteHandler}
        id={dtc.id}
      />
      <EditDtc showModal={isEditing} hideModal={toggleEditHandler} dtc={dtc} />

      <li>
        <article className={styles}>
          <div>
            <h2>
              <abbr title={dtc.system.title}>{dtc.code.title.charAt(0)}</abbr>
              {dtc.code.title.substring(1)}
            </h2>
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
