import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
    display: flex;

    ${mediaBreakpointUp('lg')} {
    flex-direction: column;
    justify-content: center;
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
    padding: 0 ${({ theme }) => theme.space[2]};
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;

  ${mediaBreakpointUp('sm')} {
    padding-left: ${({ theme }) => theme.space[2]};
    padding-right: ${({ theme }) => theme.space[2]};
    max-width: none;
  }

  ${mediaBreakpointUp('lg')} {
    float: right;
    width: 45%;
    align-self: flex-end;
    display: block;
    text-align: left;
  }
  
  > h1 {
    line-height: 1.25em;
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      margin-bottom: ${({ theme }) => theme.space[5]};
      font-size: ${({ theme }) => theme.fontSizes[6]};
    }
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[5]};
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
`;

export const Description = styled.div`
  line-height:  ${({ theme }) => theme.fontSizes[4]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[2]};

  ${mediaBreakpointUp('md')} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  > p {
    margin-top: ${({ theme }) => theme.fontSizes[4]};
    margin-bottom: ${({ theme }) => theme.fontSizes[4]};
  }
`;
