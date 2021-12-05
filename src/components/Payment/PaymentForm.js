import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

import Input from '../formElements/Input';

import { PaymentContext } from './Context';
import { stripeStyle, PaymentStyled } from './Styled';
import withPayment from './withPayment';

const Payment = ({ ...props }) => {
  const {
    cardholder, setCardholder,
  } = React.useContext(PaymentContext) || {};

  return (
    <Box as={PaymentStyled} className="checkout" {...props}>
      <Flex alignItems="center" mb={2}>
        <Box flexGrow="1" mr={2}>
          <CardNumberElement placeholder="Card Number *" style={stripeStyle} />
        </Box>
        <CardExpiryElement placeholder="Expiry (MM/YY) *" style={stripeStyle} />
      </Flex>
      <Flex alignItems="center">
        <Box flexGrow="1" mr={2}>
          <Input
            id="cardholder-name"
            type="text"
            value={cardholder}
            onChange={(ev) => setCardholder(ev.target.value)}
            placeholder="Name on Card *"
            required
          />
        </Box>
        <CardCVCElement placeholder="CVC *" style={stripeStyle} />
      </Flex>
    </Box>
  );
};

export default withPayment(Payment);
