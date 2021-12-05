import React from 'react';
import PropTypes from 'prop-types';

import CreditCardDetailsForm from '../../../../AccountSettings/components/modals/CreditCardDetailsForm';
import {
  Wrapper,
} from './CreditCardModal.styled';


const CreditCardModal = ({ onDismiss }) => (
  <Wrapper>
    <CreditCardDetailsForm onSave={onDismiss} />
  </Wrapper>
);

CreditCardModal.defaultProps = {
  onDismiss: () => {},
};
CreditCardModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default CreditCardModal;
