import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;

  ${mediaBreakpointUp('lg')} {
    display: table;
  }

  img {
    float: right;
    margin: ${({ theme }) => theme.space[3]} 0;

    ${mediaBreakpointUp('lg')} {
      margin-left: ${({ theme }) => theme.space[5]};
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
  z-index: 20;
  position: relative;
  line-height: 2;
  vertical-align: middle;
  display: table-cell;
  max-width: 100%;
  
  > h1 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
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

  button {
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;

export const Description = styled.div`
  ul {
    list-style-image: url(${check});
    margin-left: -10px;
  }

  li {
    padding-left: 10px;
    padding-bottom: 10px;
  }
`;
