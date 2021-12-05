import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  padding: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const RightColumn = styled.div`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.space[4]};;
  width: 100%;
  ${mediaBreakpointUp('lg')} {
    width: 30%;
  }
`;

export const Content = styled(Box)`
  flex-grow: 2;
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  
  ${mediaBreakpointUp('lg')} {
    width: 60%;
    margin: ${({ theme }) => theme.space[4]};
  }

  a {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    color: ${({ theme }) => theme.colors.cerulean};
    text-decoration: none;

    ${mediaBreakpointUp('sm')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }
`;

export const Card = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background-color: ${({ theme }) => theme.palette.base[0]};
  border-radius: 33px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin: 0.67em 0;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    text-align: center;
    text-transform: capitalize;
    padding: ${({ theme }) => theme.space[4]};

    strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
      display: block;
      font-size: ${({ theme }) => theme.fontSizes[5]};;
      text-transform: none;
    }
  }

  img {
    width: 80%;
    padding-bottom: ${({ theme }) => theme.space[4]}
  }
`;

export const Quote = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background-color: ${({ theme }) => theme.palette.base[0]};
  border-radius: 33px;
  margin-top: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 ${({ theme }) => theme.space[4]};
  }

  span {
    padding-left: ${({ theme }) => theme.space[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[2]};
  }
`;

export const Description = styled.div`
  line-height: ${({ theme }) => theme.fontSizes[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  strong {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }

  > p {
    margin-top: ${({ theme }) => theme.space[2]};
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
  
  ul {
    margin-left: -${({ theme }) => theme.space[2]};
  }

  li {
    padding-left: ${({ theme }) => theme.space[2]};
    padding-bottom: ${({ theme }) => theme.space[2]};
  }
`;
