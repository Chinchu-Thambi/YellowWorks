import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  text-align: center;

  ${mediaBreakpointUp('lg')} {
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: space-between;
    padding-bottom: 0;
  }
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;
  padding: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
    background-position: center bottom;
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const HeaderWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space[5]};

  h1 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-top: ${({ theme }) => theme.space[3]};
    width: 90%;
    margin: auto;
    text-align: center;

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
      width: 100%;
    }

    p {
      margin: 0;
    }

    strong {
      display: block;
      font-weight: ${({ theme }) => theme.fontWeight[1]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
      margin-top: ${({ theme }) => theme.space[1]};
      margin-bottom: ${({ theme }) => theme.space[2]};

      ${mediaBreakpointUp('lg')} {
        line-height: ${({ theme }) => theme.fontSizes[6]};
        font-size: ${({ theme }) => theme.fontSizes[6]};
      }
    }
  }
`;

export const ImageWrapper = styled.div`
  justify-content: center;
  display: none;

  img {
    max-width: 100%;
  }

  ${mediaBreakpointUp('lg')} {
    width: 50%;
    display: flex;
    align-items: center;
  }
`;

export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  z-index: 20;
  position: relative;
  width: 100%;
  margin-top: ${({ theme }) => theme.space[3]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[5]};

  a {
    margin-top: ${({ theme }) => theme.space[2]};
  }

  img {
    max-width: 100%;
    padding-top: ${({ theme }) => theme.space[3]};
  }

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    width: 90%;
    margin: auto;

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
      font-size: ${({ theme }) => theme.fontSizes[5]};
      width: 100%;
    }

    p {
      margin: 0;
    }
  }

  ${mediaBreakpointUp('lg')} {
    float: right;
    width: 50%;
    padding: ${({ theme }) => theme.space[5]} 0;
    margin-top: 0;
    margin-bottom: 0;

    img {
      display: none;
    }
  }
`;
