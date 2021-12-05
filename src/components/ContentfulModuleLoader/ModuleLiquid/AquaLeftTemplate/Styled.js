import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import aquaHeroMain from '../../../../assets/shapes/liquidAquaMask.svg';
import aquaBottomLayer from '../../../../assets/shapes/liquidAquaBackground.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: visible;
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  padding: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    padding: ${({ theme }) => theme.space[4]};
  } 
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);

export const HeaderWrapper = styled.div`
  ${mediaBreakpointUp('lg')} {
    margin-top: ${({ theme }) => theme.space[6]};
  }
`;

export const Content = styled(Box)`
  text-align: center;

  ${mediaBreakpointUp('md')} {
    text-align: left;
  }

  ${mediaBreakpointUp('lg')} {
    padding-right: ${({ theme }) => theme.space[8]};
    margin-left: 5%;
    width: 45%;
  }
  
  h1 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[0]};
    font-size: ${({ theme }) => theme.fontSizes[5]};

    ${mediaBreakpointUp('lg')} {
      margin-bottom: ${({ theme }) => theme.space[1]};
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    line-height: ${({ theme }) => theme.space[3]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
`;

export const Description = styled.div`
  line-height: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};

  > p {
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  strong {
    display: block;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }
`;

export const ImageStack = styled.div`
  background: center / contain no-repeat url(${aquaBottomLayer});
  text-align: center;

  ${mediaBreakpointUp('lg')} {
    width: 50%;
  }

  img {
    background-image: url(${({ image }) => image && image.file.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    mask: url(${aquaHeroMain}) 0 0/100% auto no-repeat;
    max-height: 300px;
    position: relative;

    ${mediaBreakpointUp('lg')} {
      left: 5%;
      top: 5%;
      max-height: unset;
      width: 75%;
    }
  }
`;
