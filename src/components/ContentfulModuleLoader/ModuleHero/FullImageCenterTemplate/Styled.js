import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
    align-self: flex-end;
    color: ${({ theme }) => theme.palette.base[0]};

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
  min-height: 38em;
`;

export const MobileFade = styled.div`
  background: linear-gradient(to bottom, transparent, #000);
  display: flex;
  min-height: 38em;
  padding: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    background: none;
    display: block;
    padding: 0 ${({ theme }) => theme.space[2]};
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
    padding-left: 1em;
    padding-right: 1em;
    max-width: none;
  }
    
  ${mediaBreakpointUp('lg')} {
    width: 40%;
    margin: ${({ theme }) => theme.space[9]} auto;
  }
  
  > h1 {
    line-height: 1.25em;
    font-size: ${({ theme }) => theme.fontSizes[5]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0 auto;
    text-align: center;

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[6]};
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    padding-bottom: ${({ theme }) => theme.space[4]};
    
    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[4]};
      border-bottom: 1px solid ${({ theme }) => theme.palette.base[0]};
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
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[2]};

  > p {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
`;
