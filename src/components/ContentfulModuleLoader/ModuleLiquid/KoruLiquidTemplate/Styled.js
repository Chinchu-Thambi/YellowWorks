import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`

background-image: none;
display: flex;
justify-content: flex-end;
align-items: center;

${mediaBreakpointUp('lg')} {
  background-image: url(${({ backgroundImage }) => backgroundImage && backgroundImage.file.url});
  background-position: 0% 50%;
  background-repeat: no-repeat;
  min-height: ${({ minHeight }) => minHeight}px;
  margin-top: ${({ theme }) => theme.space[3]};
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
  font-family: ${({ theme }) => theme.fonts.sans};
  z-index: 20;
  position: relative;
  width: 100%;
  
  ${mediaBreakpointUp('lg')} {
    float: right;
    width: 50%;
  }
  
  > h1 {
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      width: 780px;
      margin-bottom: ${({ theme }) => theme.space[5]};
      font-size: ${({ theme }) => theme.fontSizes[5]};
      text-shadow:
        1px 0 2px ${({ theme }) => theme.palette.contrast[5]},
        0 1px 2px ${({ theme }) => theme.palette.contrast[5]},
        -1px 0 2px ${({ theme }) => theme.palette.contrast[5]},
        0 -1px 2px ${({ theme }) => theme.palette.contrast[5]}
      ;

    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
      margin-bottom: ${({ theme }) => theme.space[4]};
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
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[4]};

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
