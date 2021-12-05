import React, {
  useState, useContext,
} from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass/styled-components';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../AuthContext';
import Button from '../../Button';
import Spinner from '../../Spinner';
import Input from '../../formElements/Input';

import { InfoText, InfoTextBig, ErrorMessage } from './ModalMessage';
import {
  ModalFormContent, ModalHeader, logoSrc,
  HeaderContent, ModalBody, BodyContent,
} from './Styled';

const Container = styled.div`
  text-align: center;
`;

const DigitInput = styled(Input)`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  text-align: center;
  flex-grow: 0;
  margin: auto;
`;

/* ==================================================================
* Functional Component Confirm Registration
* Confirm Registration form that contains Username and Code field, and calls
* AWS Amplify to confirm registration with emailed code to cognito.
================================================================== */
const ConfirmModal = () => {
  // Global state
  const {
    confirmSignUp, resendCode, showHideModal, login, state: { modal: { params } },
  } = useContext(AuthContext) || {};
  const { password } = params ?? {};

  // Local state
  const [username, setUsername] = useState(params?.username || '');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleUsername = (event) => setUsername(event.target.value.trim());
  const handleCode = (event) => setCode(event.target.value.trim().slice(0, 6));

  // Handled form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const result = await confirmSignUp(username, code);
    if (result.success) {
      await login(username, password);
      showHideModal({
        show: true,
        loggingOut: false,
        modalType: 'success',
        params: {
          ...params,
          message: 'Account successfully activated',
        },
      });
    } else {
      setErrorMessage('Invalid authorization code');
    }
    setIsSubmitting(false);
  };

  const handleResendCode = async () => {
    setErrorMessage();
    setIsSubmitting(true);

    const { success, error } = await resendCode(username);

    if (success) {
      NotificationManager.success('Activation code was successfully submitted.');
    } else if (error?.message) {
      if (error?.code === 'UserNotFoundException') {
        setErrorMessage('Email address not found.');
      } else {
        setErrorMessage(error?.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <ModalFormContent>
      <ModalHeader>
        <HeaderContent>
          <img src={logoSrc} width="168" alt="Yellow Logo" />
          <h2>Thanks for registering</h2>
        </HeaderContent>
      </ModalHeader>
      <ModalBody>
        <BodyContent>
          <h4>
            Thanks for creating an online account with Yellow.
            A confirmation email containing the 6 digit activation code has been sent.
          </h4>
        </BodyContent>
        <Container>
          <form onSubmit={onSubmit}>
            <Box mb={4} as="fieldset">
              <Input
                label="username"
                placeholder="Business Email"
                type="text"
                style={{ width: '100%' }}
                value={username}
                onChange={handleUsername}
              />
              <InfoText>Head over to your inbox to get the activation code.</InfoText>
              <InfoTextBig>Enter the 6 digit activation code.</InfoTextBig>
              <DigitInput
                label="code"
                placeholder="_ _ _ _ _ _"
                type="text"
                value={code}
                onChange={handleCode}
                // initial value is undefined so that user can just paste values on it
                maxLength={code !== '' ? 6 : undefined}
                size={10}
              />
              {errorMessage !== ''
                ? <ErrorMessage>{errorMessage}</ErrorMessage>
                : null}
            </Box>

            {isSubmitting && (
              <Spinner size={16} />
            )}

            <Flex
              my={3}
              flexDirection={['column', 'row']}
              alignItems={['center', 'start']}
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <Box mr={2} mb={2}>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                >ACTIVATE ACCOUNT
                </Button>
              </Box>
              <Box
                mt={[2, 0]}
                mb={2}
                as={Button}
                size="sm"
                variant="secondary"
                type="button"
                onClick={handleResendCode}
              >RESEND CODE
              </Box>
              <Button
                size="sm"
                variant="tertiary"
                type="button"
                onClick={() => {
                  showHideModal({
                    show: true,
                    modalType: 'register',
                    params: { username },
                  });
                }}
              >BACK TO SIGN UP
              </Button>
            </Flex>
          </form>
        </Container>
      </ModalBody>
    </ModalFormContent>
  );
};

ConfirmModal.propTypes = {
};

export default ConfirmModal;
