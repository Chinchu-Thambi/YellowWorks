import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import waveBottom from '../../../../assets/shapes/waveBottom.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
`;

export const Wrapper = styled.div`
  position: relative;
  margin-top: -0.15rem;
`;

export const Background = styled.div`
  background-color: ${({ theme }) => theme.palette.base[1]};
  padding-bottom: ${({ theme }) => theme.space[1]};
  position: relative;
`;

export const Mask = styled.div`
  box-sizing: content-box;
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  background-image: url(${waveBottom});
  background-size: cover;
  background-repeat: no-repeat;
  height: 6vw;
  background-position: bottom;
  position: relative;
  top: -2px;
`;

const ContainerBase = (props) => styled(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />,
);

export const Container = styled(ContainerBase)`
  margin-bottom: 0;
`;

export const Content = styled(Box)`
  color: ${({ theme }) => theme.palette.contrast[2]};
  flex-grow: 2;
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin-bottom: 0;
  text-align: center;

  h1 {
    line-height: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[6]};
    }
  }

  h2 {
    line-height: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      margin-bottom: ${({ theme }) => theme.space[5]};
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }
`;
