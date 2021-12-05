import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`

display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;

${mediaBreakpointUp('lg')} {
  margin-top: ${({ theme }) => theme.space[3]};
  flex-wrap: nowrap;
}
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  padding: ${({ theme }) => theme.space[3]};
  margin-top: -20px;

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
  
  ${mediaBreakpointUp('lg')} {
    margin-left: ${({ theme }) => theme.space[4]};
  }
  
  > h1 strong {
    display: block;
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: ${({ theme }) => theme.space[1]};
    margin-bottom: ${({ theme }) => theme.space[1]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[1]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.contrast[3]};
    text-align: center;
    
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
      margin-bottom: ${({ theme }) => theme.space[1]};
      width: 40%;
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
