import { useContext, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../shared/components/UI/Modal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import dtcSystems from '../../data/dtcSystems';

const AddDtc = (props) => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [isSystemError, setIsSystemError] = useState(false);

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

  //Add new Dtc to database
  const submitHandler = async (event) => {
    event.preventDefault();

    const found = dtcSystems.find((system) =>
      system.code
        .toLowerCase()
        .startsWith(
          formState.inputs.codeTitle.value.substring(0, 3).toLowerCase()
        )
    );

    if (!found) {
      setIsSystemError(true);
      return;
    }

    let responseData;

    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/dtc`,
        'POST',
        JSON.stringify({
          system: {
            title: found.system,
            subCode: found.code,
            subName: found.subsystem,
          },
          code: {
            title: formState.inputs.codeTitle.value,
            description: formState.inputs.description.value,
            location: formState.inputs.location.value,
          },
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onCancel();
      props.setIsChanged();
      navigate('/dtc/' + responseData.dtc._id);
    } catch (error) {}
  };

  return (
    <Modal
      show={props.showModal}
      onSubmit={submitHandler}
      onCancel={props.onCancel}
      header="Add new DTC"
      footerClass="place-item__modal-actions"
      footer={
        <Fragment>
          <Button inverse onClick={props.onCancel} type="button">
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
      {error && <p>{error}</p>}
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
