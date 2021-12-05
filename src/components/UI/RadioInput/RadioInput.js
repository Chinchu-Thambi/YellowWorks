import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: ${({ theme }) => theme.space[4]};
  height: ${({ theme }) => theme.space[4]};
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  display: block;
  position: absolute;
  top: 5px;
  left: 5px;

  + span {
    position: absolute;
    top: 0;
    left: 0;
  }

  + span::before,
  + span::after {
    position: relative;
    z-index: 10;
    content: '';
    display: block;
    width: ${({ theme }) => theme.space[4]};
    height: ${({ theme }) => theme.space[4]};
    background: ${({ theme }) => theme.palette.base[3]};
    border-radius: ${({ theme }) => theme.space[4]};
  }

  + span::before {
    display: none;
  }

  :checked + span::before,
  :checked + span::after {
    background: ${({ theme }) => theme.palette.base[0]};
    border: 8px solid ${({ theme }) => theme.palette.contrast[0]};
    width: ${({ theme }) => theme.space[4]};
    height: ${({ theme }) => theme.space[4]};
  }

  :focus + span::before,
  :focus + span::after {
    box-shadow: 0 2px 4px ${({ theme }) => theme.palette.contrast[2]};
  }
`;

const RadioInput = (props) => (
  <Container>
    <StyledInput
      type="radio"
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
    <span />
  </Container>
);

export default RadioInput;
