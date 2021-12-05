import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import styled from 'styled-components';

import VisaIcon from '../../../../../assets/icons/visa.svg';
import MasterCardIcon from '../../../../../assets/icons/mastercard.svg';
import { mediaBreakpointUp } from '../../../../../util';

import { Container } from './Styled';

const cardIcons = {
  VISA: VisaIcon,
  MASTERCARD: MasterCardIcon,
};

const PaymentContainer = styled(Container)`
  img {
    width: 60px;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  p {
      margin: 0 0 ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('md')} {
    margin-bottom: ${({ theme }) => theme.space[3]};

    img {
      margin-bottom: 0;
    }

    p {
      color: ${({ theme }) => theme.palette.contrast[2]};
      margin: 0 0 0 ${({ theme }) => theme.space[4]};
    }
  }
`;

const ExistingCard = ({
  brand,
  expirationMonth,
  expirationYear,
  lastDigits,
}) => (
  <PaymentContainer>
    <h3>Payment details</h3>
    <Flex
      alignItems={['left', 'center']}
      flexDirection={['column', 'row']}
    >
      {brand && (
        <img src={cardIcons[brand]} alt="Card Brand" />
      )}
      {lastDigits && (
        <p>XXXX-XXXX-XXXX-{lastDigits}</p>
      )}
      {expirationMonth && expirationYear && (
        <p>Exp: {expirationMonth}/{expirationYear}</p>
      )}
    </Flex>
  </PaymentContainer>
);

ExistingCard.propTypes = {
  brand: PropTypes.string.isRequired,
  expirationMonth: PropTypes.number.isRequired,
  expirationYear: PropTypes.number.isRequired,
  lastDigits: PropTypes.string.isRequired,
};

export default ExistingCard;
