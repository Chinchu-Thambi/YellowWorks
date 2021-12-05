import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;

  ${mediaBreakpointUp('lg')} {
    display: table;
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
  z-index: 20;
  position: relative;
  vertical-align: middle;
  display: table-cell;
  max-width: 100%;
  line-height: 2;
  
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
  p {
    line-height: 1.5;
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
