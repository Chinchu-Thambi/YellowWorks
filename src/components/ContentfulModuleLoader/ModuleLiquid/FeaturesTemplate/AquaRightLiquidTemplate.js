import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import aquaBackground from '../images/aquaBackground.svg';
import aquaLiquidMain from '../images/aquaLiquidMain.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
  margin: 2em 0;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: ${({ theme }) => theme.space[3]};
  padding-top: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    padding-top: ${({ theme }) => theme.space[2]};
    padding-bottom: ${({ theme }) => theme.space[2]};  
  } 
`;

export const Container = (props) => (
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const HeaderWrapper = styled.div`
  display: inline-block;
  margin-top: 4em;
`;

export const Content = styled(Box)`
  float: left;
  font-family: ${({ theme }) => theme.fonts.sans};
  z-index: 20;
  position: relative;

  ${mediaBreakpointUp('sm')} {
    padding-left: 1em;
    padding-right: 1em;
    max-width: none;
  }

  ${mediaBreakpointUp('md')} {
    margin-left: 4em;
  }

  ${mediaBreakpointUp('lg')} {
    width: 380px;
  }

  ${mediaBreakpointUp('xl')} {
    width: 480px;
  }
  
  h1 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[5]};

    ${mediaBreakpointUp('lg')} {
      width: 780px;
      margin-bottom: ${({ theme }) => theme.space[5]};
      font-size: ${({ theme }) => theme.fontSizes[6]};
      text-shadow:
        1px 0 2px ${({ theme }) => theme.colors.athensGray},
        0 1px 2px ${({ theme }) => theme.colors.athensGray},
        -1px 0 2px ${({ theme }) => theme.colors.athensGray},
        0 -1px 2px ${({ theme }) => theme.colors.athensGray}
      ;

    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[3]};

  > p {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
`;

export const ImageStack = styled.div`
    display: none;
    float: left;
    position: relative;
    width: 100%;
    height: 0;
    margin: 20px 53px 26px 0px;
    z-index: 10;

    ${mediaBreakpointUp('md')} {
      display: block;
      width: 505px;
      height: 446px;
      margin-left: 20px;
    }
`;

export const BaseLayer = styled.div`
  background: center / contain no-repeat url(${aquaBackground});
  width: 100%;
  height: 100%;
  position: absolute;
  top: -20px;
  left: 45px;
`;

export const ImageLayer = styled.div`
  background-image: url(${(props) => props.image.file.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 424px;
  mask: url(${aquaLiquidMain}) 0 0/100% auto no-repeat;
  width: 534px;
`;
