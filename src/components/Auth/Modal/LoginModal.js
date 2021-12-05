/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState, useContext,
} from 'react';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import AuthContext from '../AuthContext';
import Button from '../../Button';
import Input from '../../formElements/Input';

import SocialLoginButtons from './components/SocialLoginButtons';
import { ErrorMessage, ErrorMessageBold } from './ModalMessage';
import {
  ModalFormContent, ModalHeader, logoSrc,
  HeaderContent, ModalBody, Separator,
} from './Styled';

const Fieldset = styled.fieldset`
  && {
    clear: both;
    margin-top: ${({ theme }) => theme.space[3]};
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto ${({ theme }) => theme.space[4]};
  width: 150px;
  text-align: center;
`;

const LinkButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  margin-bottom: 24px;
  background: none;
`;

const Agreement = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5;
`;

/* ==================================================================
* Functional Component Login
* Login form that contains Username and Password field, and calls
* AWS Amplify to authenticate with cognito.
================================================================== */
const LoginModal = () => {
  // Global state
  const {
    login, loginYellow, state: { modal: { params, target } },
    showHideModal,
  } = useContext(AuthContext) || {};


  // Local state
  const [username, setUsername] = useState(params?.username);
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Handlers
  const handleUsername = (event) => {
    event.preventDefault();
    const { value } = event.target;

    setUsername(value.trim());
    const yellowDomain = value?.endsWith('@yellow.co.nz');
    if (yellowDomain) {
      setPasswordVisibility(false);
    } else {
      setPasswordVisibility(true);
    }
  };

  const handlePassword = (event) => setPassword(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if it is a yellow domain. If so, do a federated signin with Yellow
    if (username.endsWith('@yellow.co.nz')) {
      loginYellow();
    } else {
      const { success, error } = await login(username, password);

      if (success) {
        if (target) navigate(target);

        // case for ristretto users migrated to nw cognito:
      } else if (error && error.code && error.code.includes('PasswordResetRequiredException')) {
        showHideModal({
          show: true,
          modalType: 'systemForgotPassword',
          params: { username },
        });
      } else {
        setErrorMessage('Please check your email and password. If your previously signed up with Google or Facebook, click the links to access the Yellow account');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    showHideModal({
      show: true,
      modalType: 'register',
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    showHideModal({
      show: true,
      modalType: 'fpemail',
      params: { username },
    });
  };

  return (
    <ModalFormContent>
      <ModalHeader>
        <HeaderContent>
          <img src={logoSrc} width="168" alt="Yellow Logo" />
          <h2>Sign in</h2>
        </HeaderContent>
      </ModalHeader>
      <ModalBody>
        {errorMessage !== '' && (
          <ErrorMessage>
            <ErrorMessageBold>
              Unable to login?
            </ErrorMessageBold>
            <p>{errorMessage}</p>
          </ErrorMessage>
        )}

        <form onSubmit={onSubmit}>
          <SocialLoginButtons />
          <Separator>or</Separator>
          <Fieldset>
            <Input
              label="username"
              placeholder="Business Email"
              type="email"
              style={{ width: '100%' }}
              value={username}
              onChange={handleUsername}
              required
            />
            <Box my={2}>
              {passwordVisibility && (
                <Input
                  label="password"
                  placeholder="Password"
                  type="password"
                  style={{ width: '100%' }}
                  value={password}
                  onChange={handlePassword}
                  required
                />
              )}
            </Box>
          </Fieldset>

          <StyledButton size="sm">SIGN IN</StyledButton>
        </form>
        <Flex justifyContent="space-around" width={1} mb={3}>
          <LinkButton onClick={handleRegister} tabIndex={0}>Create Account</LinkButton>
          <LinkButton style={{ float: 'right' }} onClick={handleForgotPassword} tabIndex={0}>Forgot Password</LinkButton>
        </Flex>
        <Agreement>
          By signing up I agree to Yellow Terms of Use, Privacy Policy and (where applicable) the Terms of Business
        </Agreement>

      </ModalBody>
    </ModalFormContent>
  );
};

LoginModal.propTypes = {
};

export default LoginModal;
