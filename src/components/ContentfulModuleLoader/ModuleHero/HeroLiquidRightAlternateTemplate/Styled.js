import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/light/white-checkmark.svg';

const InnerContainer = styled(BaseContainer)`
  background-image: url(${({ backgroundImage }) => backgroundImage && backgroundImage.file.url});
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center 100%;
  text-align: center;

${mediaBreakpointUp('lg')} {
  background-position-x: right;
  margin-top: 0;
  display: flex;
  align-items: center;
  text-align: left;
  background-position-y: bottom;
  background-size: 50%;
}
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;
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
  color: ${({ theme }) => theme.palette.base[0]};
  font-family: ${({ theme }) => theme.fonts.sans};
  z-index: 20;
  position: relative;
  width: 100%;

  ${mediaBreakpointUp('sm')} {
    padding-left: 1em;
    padding-right: 1em;
    max-width: none;
  }
  
  ${mediaBreakpointUp('md')} {
    padding-left: 0;
    padding-right: 0;
  }

  ${mediaBreakpointUp('lg')} {
    float: left;
    text-align: left;
    width: 50%;
  }
  
  > h1 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    margin: auto;

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
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
        line-height: ${({ theme }) => theme.fontSizes[6]};
        font-size: ${({ theme }) => theme.fontSizes[6]};
      }
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[4]};
    }

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[4]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  }

  > img {
    display: block;
    margin: auto;
    max-width: 100%;
    height: auto;

    ${mediaBreakpointUp('lg')} {
      display: none;
    }
  }

  button {
    z-index: 100;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    width: 100%;

    ${mediaBreakpointUp('lg')} {
      font-size: unset;
      margin-right: ${({ theme }) => theme.space[2]};
      width: unset;
    }
  }
`;

export const ButtonWrapper = styled.div`
  padding-top: 80%;

  ${mediaBreakpointUp('lg')} {
    padding-top: 0;
  }
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[4]};
  text-align: left;
  
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
