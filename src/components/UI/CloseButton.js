import React from 'react';
import styled from 'styled-components';

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

// eslint-disable-next-line react/jsx-props-no-spreading
const CloseButton = (props) => <StyledCloseButton {...props}>Close</StyledCloseButton>;

export default CloseButton;
