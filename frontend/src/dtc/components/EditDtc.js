import { Fragment } from 'react';

import Modal from '../../shared/components/UI/Modal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

const EditDtc = ({ dtc, hideModal, showModal }) => {
  const [formState, inputHandler] = useForm(
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

  // useEffect(() => {
  //   const fetchDtc = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/dtc/${props.id}`
  //       );
  //       setLoadedDtc(responseData);
  //       setFormData(
  //         {
  //           systemTitle: {
  //             value: responseData.dtc.system.title,
  //             isValid: true,
  //           },
  //           subCode: {
  //             value: responseData.dtc.system.subCode,
  //             isValid: true,
  //           },
  //           subName: {
  //             value: responseData.dtc.system.subName,
  //             isValid: true,
  //           },
  //           codeTitle: {
  //             value: responseData.dtc.code.title,
  //             isValid: true,
  //           },
  //           description: {
  //             value: responseData.dtc.code.description,
  //             isValid: true,
  //           },
  //           location: {
  //             value: responseData.dtc.code.location,
  //             isValid: true,
  //           },
  //         },
  //         true
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (props.showModal && !loadedDtc) {
  //     fetchDtc();
  //   }
  // }, [sendRequest, props.id, setFormData, props.showModal, loadedDtc]);

  //Edit Dtc to database
  const submitHandler = async (event) => {
    event.preventDefault();
    // try {
    //   await sendRequest(
    //     process.env.REACT_APP_BACKEND_URL + '/dtc/' + props.id,
    //     'PATCH',
    //     JSON.stringify({
    //       system: {
    //         title: formState.inputs.systemTitle.value,
    //         subCode: formState.inputs.subCode.value,
    //         subName: formState.inputs.subName.value,
    //       },
    //       code: {
    //         title: formState.inputs.codeTitle.value,
    //         description: formState.inputs.description.value,
    //         location: formState.inputs.location.value,
    //       },
    //     }),
    //     {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + auth.token,
    //     }
    //   );
    //   props.hideModal();
    //   props.setIsChanged();
    // } catch (error) {}
  };

  return (
    <Fragment>
      <Modal
        show={showModal}
        onCancel={hideModal}
        header="Edit DTC"
        footer={
          <Fragment>
            <Button inverse onClick={hideModal} type="button">
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
          </Fragment>
        }
      >
        <Fragment>
          <Input
            id="systemTitle"
            element="input"
            type="text"
            label="System Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid system title."
            onInput={inputHandler}
            initialValue={dtc.system.title}
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
            initialValue={dtc.system.subCode}
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
            initialValue={dtc.system.subName}
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
            initialValue={dtc.code.title}
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
            initialValue={dtc.code.description}
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
            initialValue={dtc.code.location}
            initialValid={true}
          />
        </Fragment>
      </Modal>
    </Fragment>
  );
};

export default EditDtc;
