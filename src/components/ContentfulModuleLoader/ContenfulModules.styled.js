import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass/styled-components';

import { Container as GridContainer, BaseContainer } from '../Grid';
import { mediaBreakpointUp } from '../../util';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: ${({ theme }) => theme.space[2]} 0;
`;

export const InnerContainer = styled(BaseContainer)`
  text-align: center;
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: space-between;
    padding:  ${({ theme }) => theme.space[2]} 0;
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);



export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: auto;
  padding: 0 ${({ theme }) => theme.space[2]};
  display: flex;
  line-height: 1.5;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${mediaBreakpointUp('sm')} {
    padding: ${({ theme }) => theme.space[4]};
  }

  ${mediaBreakpointUp('lg')} {
    ${(props) => props.expanded}
    width: ${(props) => (props.expanded ? '80%' : '50%')};
  }

  h1 p, h2 p {
    margin: 0;
  }

  h2 {
    line-height: 1.5;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
    strong {
      line-height: ${({ theme }) => theme.fontSizes[3]};
      font-weight: ${({ theme }) => theme.fontWeight[1]};

      ${mediaBreakpointUp('lg')} {
        font-size: ${({ theme }) => theme.fontSizes[5]};
      }
    }
  }

  > span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }
`;
