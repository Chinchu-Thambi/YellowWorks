import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  display: flex;
`;

const BaseGridContainer = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const Container = styled(BaseGridContainer)`
  margin-bottom: 0;
  padding: 0;

  ${mediaBreakpointUp('lg')} {
    padding: ${({ theme }) => theme.space[4]} 0 0;
  }
`;

export const Content = styled(Box)`
  color: ${({ theme }) => theme.palette.accent[5][0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${mediaBreakpointUp('sm')} {
    padding: ${({ theme }) => theme.space[4]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 50%;
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }

  img {
    height: ${({ theme }) => theme.space[4]};
    padding: ${({ theme }) => theme.space[2]};

    ${mediaBreakpointUp('lg')} {
      height: ${({ theme }) => theme.space[5]};
    }
  }

  img:nth-of-type(2) {
    transform: scale(-1);
  }
`;
