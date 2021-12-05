import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: ${({ theme }) => theme.space[3]} 0;

  iframe {
    max-width: 100%;
    width: 560px;
    height: 315px;

    ${mediaBreakpointUp('lg')} {
      width: 800px;
      height: 450px;
    }
  }

  img {
    float: left;
    margin: ${({ theme }) => theme.space[3]} 0;

    ${mediaBreakpointUp('lg')} {
      margin-right: ${({ theme }) => theme.space[5]};
    }
  }
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('lg')} {
    padding-left: ${({ theme }) => theme.space[4]};
  }

  > h1 {
    line-height: 1.25em;
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
    max-width: 100%;

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[6]};
    }

    strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[5]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }

  button {
    margin-right: ${({ theme }) => theme.space[2]};
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
`;

export const Description = styled.div`
  margin-bottom: ${({ theme }) => theme.space[2]};

  ${mediaBreakpointUp('lg')} {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  p {
    margin: ${({ theme }) => theme.space[3]} 0;
  }
  
  ul {
    list-style-image: url(${check});
    margin-left: -10px;
  }

  li {
    padding-left: 10px;
    padding-bottom: 10px;
  }
`;
