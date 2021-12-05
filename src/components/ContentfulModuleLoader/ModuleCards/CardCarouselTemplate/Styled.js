import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import { BaseContainer, Container } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

import screenSrc from '../images/screen.png';
import arrowRight from '../images/arrow-right.svg';
import mobileArrowRight from '../../../../assets/icons/scrolling-right.png';
import mobileArrowLeft from '../../../../assets/icons/scrolling-left.png';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

export const CustomContainer = styled(Container)`
  flex-wrap: wrap;
  justify-content: center;
`;

export const ExtendedContainer = styled(BaseContainer)`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};

  > h1 {
    text-align: center;
    margin: 0 auto ${({ theme }) => theme.space[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};

    ${mediaBreakpointUp('lg')} {
      width: 460px;
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }

    ${mediaBreakpointUp('xl')} {
      width: 580px;
    }
  }
`;

export const Description = styled.div`
  text-align: center;
  margin: 0 auto ${({ theme }) => theme.space[4]};
  line-height: 2;

  ${mediaBreakpointUp('lg')} {
    width: 460px;
  }

  ${mediaBreakpointUp('xl')} {
    width: 580px;
  }
`;

export const Cards = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  position: relative;

  ${mediaBreakpointUp('lg')} {
    flex-direction: row;
  }
`;

export const Screen = styled.div`
  background: url(${screenSrc}) 0 0/ 100% auto no-repeat;
  width: 90%;
  align-self: center;
  display: flex;
  justify-content: center;

  > img {
    background: url(${({ src }) => src}) 50% 10%/auto auto no-repeat;
    border-radius: ${({ theme }) => theme.space[1]};
    width: 95%;
    height: 68%;
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: 30%;
  }

  ${mediaBreakpointUp('lg')} { 
    width: unset;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  
  > h4 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: auto;

    ${mediaBreakpointUp('lg')} {
      margin: 0 ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]} 0;
    }
  }
  
  > div {
    line-height: 2;
    width: 80%;
    margin: auto;

    ${mediaBreakpointUp('lg')} {
      margin: 0 0 ${({ theme }) => theme.space[4]};
    }
  }

  > nav {
    text-align: center;
  }

  ${mediaBreakpointUp('lg')} {
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 70px;
    width: 50%;
    text-align: left;
  }
`;

export const ArrowNav = styled.button`
  display: none;

  ${mediaBreakpointUp('lg')} {
    display: block;
    position: absolute;
    right: 0;
    background: transparent url(${arrowRight}) no-repeat 0 50%/100% auto;
    border: 0;
    width: 60px;
    height: 118px;
    margin-top: -60px;
    top: 50%;
  }

  ${mediaBreakpointUp('xl')} {
    width: 80px;
    height: 156px;
    margin-top: -80px;
  }
`;

export const MobileBackNav = styled.button`
  background: transparent url(${mobileArrowLeft}) no-repeat 0 50%/100% auto;
  border: 0;
  width: 60px;
  height: 60px;
  position: absolute;
  left: -5px;
  bottom: 30%;

  ${mediaBreakpointUp('md')} {
    bottom: 40%;
  }

  ${mediaBreakpointUp('lg')} {
    display: none;
  }
`;

export const MobileNextNav = styled.button`
  background: transparent url(${mobileArrowRight}) no-repeat 0 50%/100% auto;
  border: 0;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 30%;
  right: -5px;

  ${mediaBreakpointUp('md')} {
    bottom: 40%;
  }

  ${mediaBreakpointUp('lg')} {
    display: none;
  }
`;

export const Counter = styled.button`
  background: ${({ active, theme }) => theme.palette.contrast[active ? 0 : 3]};
  width: ${({ theme }) => theme.space[3]};
  height: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[2]};
  border: 0;
  margin-right: ${({ theme }) => theme.space[2]};
  display: none;

  ${mediaBreakpointUp('lg')} {
    display: inline-block;
  }
`;

export const CarouselCounter = ({ currentIndex, nItems, goTo }) => (
  R.range(0, nItems).map((i) => (
    <Counter
      type="button"
      active={i === currentIndex}
      key={i}
      onClick={() => goTo(i)}
    />
  ))
);
