import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  margin-bottom: 0;
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  padding: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const Content = styled(Box)`
  color: ${({ theme }) => theme.palette.contrast[2]};
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: ${({ theme }) => theme.space[4]};
  display: flex;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  text-align: left;
  align-content: center;
  justify-content: center;
  align-items: center;

  h1 {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin: 0;
    text-transform: uppercase;
    padding: 0 ${({ theme }) => theme.space[4]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};

    ${mediaBreakpointUp('lg')} {
      width: 20%;
      border-right: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    }

    strong {
      display: block;
    }
  }

  > span {
    font-style: italic;
    padding: 0 ${({ theme }) => theme.space[4]};
    width: 100%;
    
    ${mediaBreakpointUp('lg')} {
      width: 50%;
    }

    strong {
      display: block;
    }
  }
`;
