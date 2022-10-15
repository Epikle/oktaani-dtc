import { useState, Fragment } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

import Modal from '../../shared/components/UI/Modal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { createDtc } from '../../shared/util/fetch';
import dtcSystems from '../../data/dtcSystems';

const AddDtc = ({ showModal, onCancel }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isSystemError, setIsSystemError] = useState(false);
  const queryClient = useQueryClient();
  const [formState, inputHandler] = useForm(
    {
      codeTitle: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      location: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const createDtcMutation = useMutation(
    async (dtcData) => {
      const accessToken = await getAccessTokenSilently();
      await createDtc(dtcData, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dtcList']);
      },
    }
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    const codeGroup =
      formState.inputs.codeTitle.value.substring(0, 3).toUpperCase() + 'XX';
    const codeGroupData = dtcSystems[codeGroup];

    if (!codeGroupData) {
      setIsSystemError(true);
      return;
    }

    const createdDtc = {
      system: {
        title: codeGroupData.system,
        subCode: codeGroup,
        subName: codeGroupData.subsystem,
      },
      code: {
        title: formState.inputs.codeTitle.value,
        description: formState.inputs.description.value,
        location: formState.inputs.location.value,
      },
    };

    createDtcMutation.mutate(createdDtc);
    onCancel();
  };

  return (
    <Modal
      show={showModal}
      onSubmit={submitHandler}
      onCancel={onCancel}
      header="Add new DTC"
      footerClass="place-item__modal-actions"
      footer={
        <Fragment>
          <Button inverse onClick={onCancel} type="button">
            CANCEL
          </Button>
          <Button
            danger
            onClick={submitHandler}
            disabled={!formState.isValid}
            type="submit"
          >
            ADD NEW
          </Button>
        </Fragment>
      }
    >
      {isSystemError && <p>Code system group not found in database.</p>}
      <Input
        id="codeTitle"
        element="input"
        type="text"
        label="Code Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid code title."
        onInput={inputHandler}
      />

      <Input
        id="description"
        element="input"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description."
        onInput={inputHandler}
      />

      <Input
        id="location"
        element="input"
        type="text"
        label="Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid location."
        onInput={inputHandler}
        initialValid={true}
      />
    </Modal>
  );
};

export default AddDtc;
