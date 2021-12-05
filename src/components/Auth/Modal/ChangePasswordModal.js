import React from 'react';
import styled from 'styled-components';

import Button from '../../Button';

import AuthContext from '../AuthContext';
import Input from '../../formElements/Input';

const Container = styled.form`
  text-align: center;
  width: 280px;
  word-wrap: normal;
`;

const ChangePasswordModal = () => {
  const authState = React.useContext(AuthContext);

  const [password, setPassword] = React.useState({
    previous: '', proposed: '', confirmation: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password.previous) {
      setErrorMessage('You need to provide your current password.');
      return;
    }

    if (!password.proposed) {
      setErrorMessage('You need to set a new password.');
      return;
    }

    if (password.proposed !== password.confirmation) {
      setErrorMessage('Confirmation doesn\'t match password.');
      return;
    }

    try {
      await authState.changePassword({
        previousPassword: password.previous,
        proposedPassword: password.proposed,
      });

      authState.showHideModal({
        show: true,
        modalType: 'changeConfirmation',
        params: {
          message: 'Password successfully changed',
        },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // remove error message on user input
  React.useEffect(() => {
    setErrorMessage('');
  }, [password]);

  return (
    <Container onSubmit={submitHandler}>
      <Input
        className="form-control"
        type="password"
        value={password.previous}
        onChange={(e) => setPassword({
          ...password,
          previous: e.target.value,
        })}
        placeholder="Current password"
      />
      <Input
        className="form-control"
        type="password"
        value={password.proposed}
        onChange={(e) => setPassword({
          ...password,
          proposed: e.target.value,
        })}
        placeholder="Enter new password"
      />
      <Input
        className="form-control"
        type="password"
        value={password.confirmation}
        onChange={(e) => setPassword({
          ...password,
          confirmation: e.target.value,
        })}
        placeholder="Re-enter new password"
      />
      <p>
        {errorMessage}
      </p>
      <Button>Confirm</Button>
    </Container>
  );
};

export default ChangePasswordModal;
