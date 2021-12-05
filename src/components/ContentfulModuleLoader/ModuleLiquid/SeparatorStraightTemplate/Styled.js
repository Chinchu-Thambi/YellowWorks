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

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const Content = styled(Box)`
  color: ${({ theme }) => theme.palette.contrast[2]};
  flex-grow: 2;
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: ${({ theme }) => theme.space[4]};
  text-align: center;

  h1 {
    line-height: 1.25em;
    font-size: ${({ theme }) => theme.fontSizes[5]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[6]};
    }
  }

  h2 {
    line-height: 1.25em;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      margin-bottom: ${({ theme }) => theme.space[5]};
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }
`;
