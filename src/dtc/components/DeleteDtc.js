import { Fragment } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UI/Modal';
import { deleteDtc } from '../../shared/util/fetch';

const DeleteDtc = ({ showModal, hideModal, id }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

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
    hideModal();
    deleteDtcMutation.mutate(id);
  };

  return (
    <Modal
      show={showModal}
      onCancel={hideModal}
      header="Are you sure?"
      footerClass="place-item__modal-actions"
      footer={
        <Fragment>
          <Button inverse onClick={hideModal} type="button">
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
  );
};

export default DeleteDtc;
