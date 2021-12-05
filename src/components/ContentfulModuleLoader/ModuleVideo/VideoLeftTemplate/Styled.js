import React from 'react';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import check from '../../../../assets/icons/black-checkmark.svg';

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;

  ${mediaBreakpointUp('md')} {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

const InnerContainer = styled(BaseContainer)`
  text-align: center;

  ${mediaBreakpointUp('lg')} {
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: space-between;
  }

  iframe {
    max-width: 100%;

    ${mediaBreakpointUp('lg')} {
      flex-basis: 40%;
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

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

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
