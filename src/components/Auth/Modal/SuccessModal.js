import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import AuthContext from '../AuthContext';
import Button from '../../Button';
import { InfoTextVeryBig } from './ModalMessage';

import {
  ModalFormContent,
} from './Styled';

const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space[4]};
`;

const SuccessModal = ({ message }) => {
  const {
    login, state: { modal: { target, params } },
    showHideModal,
  } = React.useContext(AuthContext) || {};

  const handleClick = async (e) => {
    e.preventDefault();
    const { username, password } = params;
    if (username && password) {
      await login(username, password);
    }

    showHideModal({ show: false });
    if (target) navigate(target);
  };

  return (
    <div>
      <ModalFormContent>
        <InfoTextVeryBig>
          {message}<br />
          <StyledButton onClick={handleClick}>CONTINUE</StyledButton>
        </InfoTextVeryBig>
      </ModalFormContent>
    </div>
  );
};

export default SuccessModal;

SuccessModal.propTypes = {
  message: PropTypes.string.isRequired,
};
