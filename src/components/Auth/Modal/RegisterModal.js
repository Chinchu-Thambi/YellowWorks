import React, {
  useState, useContext, useEffect,
} from 'react';
import { Flex, Box } from 'rebass/styled-components';

import Button from '../../Button';
import Spinner from '../../Spinner';
import Input from '../../formElements/Input';

import AuthContext from '../AuthContext';

import SocialLoginButtons from './components/SocialLoginButtons';
import { ErrorMessage } from './ModalMessage';
import {
  ModalFormContent, ModalHeader, logoSrc,
  HeaderContent, ModalBody, BodyContent,
  Separator,
} from './Styled';

/* ==================================================================
* Functional Component Register
* Registration form that contains cognito required fields, and calls
* AWS Amplify to initiate cognito User Registration flow.
================================================================== */
const RegisterModal = () => {
  const {
    register, showHideModal, state: { error },
  } = useContext(AuthContext) || {};

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsername = (event) => setUsername(event.target.value.trim());
  const handlePassword = (event) => setPassword(event.target.value);
  const handleFirstName = (event) => setFirstName(event.target.value);
  const handleLastName = (event) => setLastName(event.target.value);
  const handleConfirmPassword = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };

  // Handled form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    setDisplayError(true);
    // validation
    if (
      !username || !password || !firstName || !lastName
    ) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage('Password does not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(username, password, firstName, lastName);
    setIsSubmitting(false);

    if (result) {
      showHideModal({
        show: true,
        modalType: 'confirm',
        params: { username, password },
      });
    }
  };

  useEffect(() => {
    if (error && error.message) {
      if (error.message.includes('user_already_registered')) {
        setErrorMessage(
          'Whoops looks like this email address is already registered. '
          + 'If you\'ve previously signed up using Facebook / Google, '
          + 'please login again via the original method used.',
        );
      } else {
        setErrorMessage(error.message);
      }
    }
  }, [error]);

  return (
    <ModalFormContent>
      <ModalHeader>
        <HeaderContent>
          <img src={logoSrc} width="168" alt="Yellow Logo" />
          <h2>Sign up</h2>
        </HeaderContent>
      </ModalHeader>
      <ModalBody>
        <BodyContent>
          <h4>Enter your details</h4>
        </BodyContent>
        <>
          <form onSubmit={onSubmit}>
            <fieldset>
              <Flex mb={2} width={1} justifyContent="space-between">
                <Input
                  label="first name"
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={handleFirstName}
                  style={{ width: '100%' }}
                  required
                />
                  &nbsp;
                <Input
                  label="last name"
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={handleLastName}
                  style={{ width: '100%' }}
                  required
                />
              </Flex>
              <Input
                label="Business Email"
                placeholder="Business Email"
                type="email"
                value={username}
                onChange={handleUsername}
                required
              />
              <Flex mt={2} width={1} justifyContent="space-between">
                <Input
                  label="password"
                  placeholder="Password"
                  type="password"
                  style={{ width: '100%' }}
                  value={password}
                  onChange={handlePassword}
                  required
                />
                  &nbsp;
                <Input
                  label="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  style={{ width: '100%' }}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  required
                />
              </Flex>
            </fieldset>
            {displayError && errorMessage !== '' && (
            <ErrorMessage><p>{errorMessage}</p></ErrorMessage>
            )}

            <Flex
              my={3}
              flexDirection={['column', 'row']}
              alignItems={['center', 'start']}
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <Button
                size="sm"
                disabled={isSubmitting}
              >
                CREATE ACCOUNT
              </Button>
              <Box
                mt={[2, 0]}
                mb={2}
                as={Button}
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => {
                  showHideModal({
                    show: true,
                    modalType: 'confirm',
                    params: { username },
                  });
                }}
              >ALREADY GOT A CODE
              </Box>
              <Button
                size="sm"
                variant="tertiary"
                type="button"
                onClick={() => {
                  showHideModal({
                    show: true,
                    modalType: 'login',
                    params: { username },
                  });
                }}
              >BACK TO SIGN IN
              </Button>
            </Flex>

            <Separator>or</Separator>
            <SocialLoginButtons />

            {isSubmitting && (
            <Spinner size={16} />
            )}
          </form>
        </>
      </ModalBody>
    </ModalFormContent>
  );
};

RegisterModal.propTypes = {
};

export default RegisterModal;
