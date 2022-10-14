import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../shared/util/validators';
import { useForm } from '../shared/hooks/form-hook';

import logo from '../shared/images/logo.svg';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/user/login',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login(responseData.userId, responseData.isAdmin, responseData.token);

      navigate('/');
    } catch (error) {}
  };

  return (
    <main>
      <div className="login">
        <img src={logo} className="login_logo" alt="oktaaniDTC" />
        <form onSubmit={authSubmitHandler}>
          <h1>Login</h1>
          {error && <p>{error}</p>}

          <Input
            id="name"
            element="input"
            type="text"
            label={<span className="material-icons">person</span>}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />

          <Input
            id="password"
            element="input"
            type="password"
            label={<span className="material-icons">password</span>}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
