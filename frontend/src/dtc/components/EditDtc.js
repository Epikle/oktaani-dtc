import React, { useState, useContext, useEffect } from 'react';

import Modal from '../../shared/components/UI/Modal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';

const EditDtc = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [loadedDtc, setLoadedDtc] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      systemTitle: {
        value: '',
        isValid: false,
      },
      subCode: {
        value: '',
        isValid: false,
      },
      subName: {
        value: '',
        isValid: false,
      },
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

  useEffect(() => {
    const fetchDtc = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/dtc/${props.id}`
        );
        setLoadedDtc(responseData);
        setFormData(
          {
            systemTitle: {
              value: responseData.dtc.system.title,
              isValid: true,
            },
            subCode: {
              value: responseData.dtc.system.subCode,
              isValid: true,
            },
            subName: {
              value: responseData.dtc.system.subName,
              isValid: true,
            },
            codeTitle: {
              value: responseData.dtc.code.title,
              isValid: true,
            },
            description: {
              value: responseData.dtc.code.description,
              isValid: true,
            },
            location: {
              value: responseData.dtc.code.location,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    if (props.showModal && !loadedDtc) {
      console.log('API LOADED: GET: /DTC/', props.id);
      fetchDtc();
    }
  }, [sendRequest, props.id, setFormData, props.showModal, loadedDtc]);

  //Edit Dtc to database
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/dtc/' + props.id,
        'PATCH',
        JSON.stringify({
          system: {
            title: formState.inputs.systemTitle.value,
            subCode: formState.inputs.subCode.value,
            subName: formState.inputs.subName.value,
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
      props.hideModal();
      props.setIsChanged();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={props.showModal}
        onCancel={props.hideModal}
        header="Edit DTC"
        footer={
          <React.Fragment>
            <Button inverse onClick={props.hideModal} type="button">
              CANCEL
            </Button>
            <Button
              danger
              onClick={submitHandler}
              disabled={!formState.isValid}
              type="submit"
            >
              EDIT DTC
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
          <React.Fragment>
            <Input
              id="systemTitle"
              element="input"
              type="text"
              label="System Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid system title."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.system.title}
              initialValid={true}
            />

            <Input
              id="subCode"
              element="input"
              type="text"
              label="Subcode"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid subcode."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.system.subCode}
              initialValid={true}
            />

            <Input
              id="subName"
              element="input"
              type="text"
              label="Subname"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid subname."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.system.subName}
              initialValid={true}
            />

            <Input
              id="codeTitle"
              element="input"
              type="text"
              label="Code Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid code title."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.code.title}
              initialValid={true}
            />

            <Input
              id="description"
              element="input"
              type="text"
              label="Description"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid description."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.code.description}
              initialValid={true}
            />

            <Input
              id="location"
              element="input"
              type="text"
              label="Location"
              validators={[]}
              errorText="Please enter a valid location."
              onInput={inputHandler}
              initialValue={loadedDtc.dtc.code.location}
              initialValid={true}
            />
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default EditDtc;
