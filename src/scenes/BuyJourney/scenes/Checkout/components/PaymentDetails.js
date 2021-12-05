import React from 'react';

import PaymentForm from '../../../../../components/Payment/PaymentForm';

import { Container } from './Styled';

const PaymentDetails = () => (
  <Container>
    <h3>Payment details</h3>
    <PaymentForm mb={3} />
  </Container>
);

export default PaymentDetails;
