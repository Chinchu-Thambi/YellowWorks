import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
    align-self: flex-end;
    color: ${({ theme }) => theme.palette.contrast[0]};

    ${mediaBreakpointUp('lg')} {
    align-self: unset;
  }
`;

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
  background-image: url(${({ image }) => image && image.file.url});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  max-width: 100%;
  
  ${mediaBreakpointUp('lg')} {
    min-height: 38em;
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
  text-align: center;
  margin: ${({ theme }) => theme.space[4]} auto;

  ${mediaBreakpointUp('sm')} {
    padding-left: ${({ theme }) => theme.space[3]};
    padding-right: ${({ theme }) => theme.space[3]};
    max-width: none;
  }
  
  > h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0 auto;
    padding-bottom: ${({ theme }) => theme.space[3]};
    text-align: center;

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    line-height: ${({ theme }) => theme.space[3]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
  }

  > img {
    display: block;
    margin: auto;
    max-width: 100%;
    height: auto;
    max-height: 600px;
  }
`;

export const Description = styled.div`
  line-height: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[2]};

  > p {
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }
`;
