import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 420px;
  text-align: center;
`;

const RegistrationsDisabled = () => (
  <Container>
    <p>
      New user registrations are currently disabled whilst we are applying some enhancements to
      our customer portal. Please try again later.
    </p>
  </Container>
);

export default RegistrationsDisabled;
