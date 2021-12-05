import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`
  text-align: center;

  ${mediaBreakpointUp('lg')} {
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: space-between;
  }
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const ImageWrapper = styled.div`
  justify-content: center;
  display: none;

  img {
    max-width: 100%;
  }

  ${mediaBreakpointUp('lg')} {
    width: 50%;
    display: flex;
  }
`;

export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  z-index: 20;
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.space[3]} 0;

  a {
    width: 100%;
  }

  img {
    display: flex;
    max-width: 100%;
    margin: auto;
  }

  > h1 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    margin: auto;

    ${mediaBreakpointUp('lg')} {
      line-height: 1.25;
      margin-bottom: ${({ theme }) => theme.space[5]};
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
        margin-top: 0;
        margin-bottom: ${({ theme }) => theme.space[5]};
        line-height: 1.25;
        font-size: ${({ theme }) => theme.fontSizes[6]};
      }
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: 0 ${({ theme }) => theme.space[4]};
    
    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[4]};
    }

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[4]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  } 

  ${mediaBreakpointUp('lg')} {
    float: right;
    width: 50%;
    padding: ${({ theme }) => theme.space[5]} 0;
    margin-top: 0;

    img {
      display: none;
    }
  }

  ${mediaBreakpointUp('md')} {
    a {
      width: unset;
    }
  }
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[4]};

  a {
    margin: 0;
    text-decoration: none;
  }

  > p {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
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
