import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';

import Spinner from '../../../../../components/Spinner';
import { BaseContainer } from '../../../../../components/Grid';
import { mediaBreakpointUp } from '../../../../../util';


export const TermsContainer = styled.section`
  display: block;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[3]};
  line-height: 1em;

  > div {
    margin: 0 ${({ theme }) => theme.space[4]};
  }

  input {
    display: none;
  }

  label {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes[0]};
    margin-bottom: 30px;
  }

  img {
    margin-right: 20px;
  }
`;


export const Separator = styled.div`
  width: calc(100% - 2 * ${({ theme }) => theme.space[3]});
  height: 1px;
  margin: ${({ theme }) => theme.space[3]};
  margin-top: 0;
  background: ${({ theme }) => theme.colors.gallery};
`;

export const Loading = () => (
  <div>
    <p>Processing your order, please wait.</p>
    <Spinner />
  </div>
);

export const ExtendedContainer = styled(BaseContainer)`
  justify-content: space-between;

  > h1 {
    text-align: center;
  }
`;

export const Details = styled.div`
  width: 100%;
  ${mediaBreakpointUp('lg')} {
    width: 45%;
  };
`;

export const DetailsContainer = styled.div`
  box-shadow: 0px 0px 15px rgba(0, 107, 167, 0.2);
  border-radius: ${({ theme }) => theme.space[1]};
  background: ${({ theme }) => theme.palette.base[0]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[3]} 0;
  width: 100%;
  ${mediaBreakpointUp('lg')} {
    margin-left: ${({ theme }) => theme.space[3]};
    margin-top: 0;
  };
`;

export const CheckoutContainer = styled.div`
  display: block;
  ${mediaBreakpointUp('lg')} {
    display: flex;
    justify-content: space-between;
    align-items: start;
  };

  label {
    span, p {
      width: 100%;
      display: inline-block;
      font-size: ${({ theme }) => theme.fontSizes[1]};
      margin-bottom: 0;
    }
  }
`;

export const ExistingDetailsContainer = styled.div`
  line-height: 1.5;

  > h6 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  > p {
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  > address {
    font-style: normal;
    margin-bottom: ${({ theme }) => theme.space[3]};

    + p {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }
`;


//
//
//
//
//
//
// ================ REMOVE styles below this line ===================================


export const Form = styled.form`
  flex-grow: 1;
  margin: auto;

  input[type=text], select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    border-radius: 3px;
    padding: ${({ theme }) => theme.space[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background: ${({ theme }) => theme.palette.base[0]};
    min-height: 39px;

    ::placeholder {
      color: ${({ theme }) => theme.palette.contrast[2]};
    }
  }

  select {
    width: auto;
    padding-right: 25px;
  }

  label {
    width: 100%;
    ${mediaBreakpointUp('md')} {
      width: 48%;
    }
    display: inline-block;
    margin: 0 ${({ theme }) => theme.space[1]};

    span {
      width: 100%;
      display: inline-block;
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }

  ${Flex} {
    > input {
      width: 48%;
    }
  }

  p {
    margin-top: 0;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.section`
  display: block;
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.space[3]};

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: 1.5em;
    margin-top: 0;
  }
`;
