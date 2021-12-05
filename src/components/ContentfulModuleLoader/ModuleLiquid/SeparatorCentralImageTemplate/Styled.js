import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  display: flex;
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  padding: ${({ theme }) => theme.space[3]} 0;

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

const BaseGridContainer = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const Container = styled(BaseGridContainer)`
  margin-bottom: 0;
  padding: 0;
  line-height: ${({ theme }) => theme.fontSizes[4]};

  ${mediaBreakpointUp('lg')} {
    padding: ${({ theme }) => theme.space[4]} 0 0;
  }
`;

export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: auto;
  padding: 0 ${({ theme }) => theme.space[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${mediaBreakpointUp('sm')} {
    padding: ${({ theme }) => theme.space[4]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 50%;
  }

  h2 {
    line-height: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  }

  > span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  img {
    width: inherit;

    ${mediaBreakpointUp('md')} {
      width: auto;
  }
  }
`;
