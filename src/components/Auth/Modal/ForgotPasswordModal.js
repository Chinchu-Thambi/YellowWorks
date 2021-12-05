import React, {
  useState, useContext,
} from 'react';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../AuthContext';
import Button from '../../Button';
import Input from '../../formElements/Input';
import { ErrorMessage } from './ModalMessage';

import {
  ModalFormContent, ModalHeader, logoSrc,
  HeaderContent, ModalBody, BodyContent,
} from './Styled';

const Container = styled.div`
  text-align: center;
`;

/* ==================================================================
* Functional Component ForgotPassword
* Contains Username and Password/Confirm Password field, and calls
* AWS Amplify to authenticate with cognito.
================================================================== */

export const ForgotPasswordModalResetPassword = () => {
  const {
    forgotPasswordSubmit, showHideModal, state: { modal: { params } },
  } = useContext(AuthContext) || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { username } = params || {};

  const handleVerificationCode = (event) => setVerificationCode(event.target.value);
  const handleNewPassword = (event) => setNewPassword(event.target.value);
  const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setErrorMessage('You need to fill the verification code.');
      return;
    }

    if (!newPassword) {
      setErrorMessage('You need to fill the new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Confirmation needs to match password.');
      return;
    }

    const result = await forgotPasswordSubmit(
      username, verificationCode, newPassword,
    );

    if (result.error) {
      setErrorMessage(result.error.message);
      return;
    }

    showHideModal({
      show: true,
      modalType: 'success',
      params: {
        username,
        password: newPassword,
        message: 'Your password has been reset.',
      },
    });
  };

  return (
    <>
      <ModalFormContent>
        <ModalHeader>
          <HeaderContent>
            <img src={logoSrc} width="168" alt="Yellow Logo" />
            <h2>Reset Password</h2>
          </HeaderContent>
        </ModalHeader>
        <ModalBody>
          <BodyContent>
            <h4>
              We have sent you an email with a 6 digit verification code.
              Please enter this code, followed by your new password.
            </h4>
          </BodyContent>
          <Container>
            <form>
              <p>{username}</p>
              <Box as="fieldset" width={0.5} mx="auto" mb={3}>
                <Input
                  label="verificationCode"
                  placeholder="Verification Code"
                  type="text"
                  style={{ width: '100%' }}
                  value={verificationCode}
                  onChange={handleVerificationCode}
                />
                <Box my={2}>
                  <Input
                    label="New Password"
                    placeholder="New Password"
                    type="password"
                    style={{ width: '100%' }}
                    value={newPassword}
                    onChange={handleNewPassword}
                  />
                </Box>
                <Input
                  label="Confirm"
                  placeholder="Confirm Password"
                  type="password"
                  style={{ width: '100%' }}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </Box>

              {errorMessage && (
                <p>{errorMessage}</p>
              )}

              <div>
                <Box mr={2} mb={2}>
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                  >CONFIRM NEW PASSWORD
                  </Button>
                </Box>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    showHideModal({
                      show: true,
                      modalType: 'fpemail',
                      params: {
                        ...params,
                        username,
                      },
                    });
                  }}
                >BACK
                </Button>
              </div>
            </form>
          </Container>
        </ModalBody>
      </ModalFormContent>
    </>
  );
};

ForgotPasswordModalResetPassword.propTypes = {
};

export const ForgotPasswordModalGetEmail = () => {
  const {
    forgotPassword, showHideModal, state: { modal: { params } },
  } = useContext(AuthContext) || {};
  const [username, setUsername] = useState(params?.username);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsername = (event) => setUsername(event.target.value.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessage('You need to fill in the email address.');
      return;
    }

    const response = await forgotPassword(username);

    if (response.error) {
      if (response.error.code === 'UserNotFoundException') {
        setErrorMessage('Email address not found.');
      } else {
        setErrorMessage(response.error.message);
      }
    } else {
      NotificationManager.success('Reset password code was successfully submitted.');
      showHideModal({
        show: true,
        modalType: 'fpreset',
        params: { username },
      });
    }
  };

  return (
    <ModalFormContent>
      <ModalHeader>
        <HeaderContent>
          <img src={logoSrc} width="168" alt="Yellow Logo" />
          <h2>Reset password</h2>
        </HeaderContent>
      </ModalHeader>
      <ModalBody>
        <BodyContent>
          <h4>
            Enter the email address associated with your account, and we will email you a code
            to reset your password
          </h4>
        </BodyContent>
        <Container>
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <Input
                label="Business Email"
                placeholder="Business Email"
                type="text"
                style={{ width: '100%' }}
                value={username}
                onChange={handleUsername}
              />
            </Box>
            {errorMessage !== ''
              ? (
                <>
                  <ErrorMessage>
                    {errorMessage}
                  </ErrorMessage>
                  <br />
                </>
              )
              : null}

            <Flex
              my={3}
              flexDirection={['column', 'row']}
              alignItems={['center', 'start']}
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <Button
                size="sm"
              >SEND CODE
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
                    modalType: 'fpreset',
                    params: {
                      ...params,
                      username,
                    },
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
          </form>
        </Container>
      </ModalBody>
    </ModalFormContent>
  );
};

ForgotPasswordModalGetEmail.propTypes = {
};

export const SystemForgotPasswordModal = () => {
  const {
    forgotPassword, showHideModal, state: { modal: { params } },
  } = useContext(AuthContext) || {};

  const [username, setUsername] = useState(params?.username);

  return (
    <>
      <ModalFormContent>
        <ModalHeader>
          <HeaderContent>
            <img src={logoSrc} width="168" alt="Yellow Logo" />
            <h2>Hello!</h2>
          </HeaderContent>
        </ModalHeader>
        <ModalBody>
          <BodyContent>
            <p>
              It’s time for you to update your password with Yellow.
              It’s pretty easy, we’ll email you a 6-digit code to verify your account.
              All you need to do is choose a new password, input the code and you’re all set!
            </p>
          </BodyContent>
          <Container>
            <form>
              <Input
                label="Business Email"
                placeholder="Business Email"
                type="text"
                style={{ width: '100%' }}
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
              />
              <Flex justifyContent="space-evenly" mt={3}>
                <Button
                  size="sm"
                  variant="tertiary"
                  outline="true"
                  onClick={async (e) => {
                    e.preventDefault();
                    showHideModal({
                      show: true,
                      modalType: 'login',
                    });
                  }}
                >BACK TO SIGN IN
                </Button>
                <Button
                  size="sm"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (await forgotPassword(username)) {
                      showHideModal({
                        show: true,
                        modalType: 'fpreset',
                        params: { username },
                      });
                    }
                  }}
                >SEND CODE
                </Button>
              </Flex>
            </form>
          </Container>
        </ModalBody>
      </ModalFormContent>
    </>
  );
};
