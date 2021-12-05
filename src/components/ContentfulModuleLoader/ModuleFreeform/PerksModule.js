import React from 'react';
import styled from 'styled-components';

import check from './images/check.svg';
import background from './images/background.png';

import { Container } from '../../Grid';
import { mediaBreakpointUp, theme } from '../../../util';

const Background = styled.div`
  background-color: ${theme.palette.base[1]};
  padding: 1px;
`;

const Wrapper = styled.div`
    background-image: url(${background});
    background-position: center ${theme.space[6]};
    background-size: 55%;
    background-repeat: no-repeat;

    ${mediaBreakpointUp('md')} {
      background-size: 44%;
      background-position: center 10%;
    }

    ${mediaBreakpointUp('lg')} {
      background-position: 96%;
    }

  h1 {
    font-weight: ${theme.fontWeight[1]};
    font-size: ${theme.fontSizes[5]};
    text-align: center;
    padding: ${theme.space[3]};
  }

  ul {
    color: ${theme.palette.contrast[2]};;
    font-size: ${theme.fontSizes[2]};
    margin: 50% 0 0;
    padding: 0;

    ${mediaBreakpointUp('sm')} {
      display: flex;
      flex-flow: wrap;
      margin-top: 30%;
    }

    ${mediaBreakpointUp('lg')} {
      margin: 0;
      width: 56%;
    }
  }

  ul li {
    background: url(${check}) no-repeat center top;
    line-height: ${theme.space[4]};
    list-style: none;
    margin: 0 calc(12% / 4) ${theme.space[3]};
    min-height: ${theme.space[5]};
    padding-top: ${theme.space[4]};
    text-align: center;
    width: 100%;

    ${mediaBreakpointUp('md')} {
      margin: 0 calc(22% / 6) ${theme.space[4]};
      min-height: ${theme.space[3]};
      width: 26%;
    }

    ${mediaBreakpointUp('lg')} {
      margin: 0 calc(12% / 4) ${theme.space[4]};
      min-height: ${theme.space[3]};
      padding-top: ${theme.space[4]};
      width: 44%;
    }

    ${mediaBreakpointUp('xl')} {
      margin: 0 calc(22% / 6) ${theme.space[4]};
      min-height: ${theme.space[7]};
      width: 26%;
    }

  }
`;

const PerksModule = () => (
  <Background>
    <Container as="section" width={theme.containerWidth}>
      <Wrapper>
        <h1>
          Your benefits
        </h1>
        <ul>
          <li>Two extra paid days off over Christmas</li>
          <li>Flexible working hours</li>
          <li>A paid day off for your birthday</li>
          <li>Fresh fruit on Tuesdays</li>
          <li>A paid volunteer day off each year, for you to do your bit for the community</li>
          <li>Employee Assistance Programme</li>
          <li>Discounted health insurance (Southern Cross, Marram)</li>
          <li>Subsidised Marram Trust Membership (Holiday and healthcare support)</li>
          <li>Additional lump-sum payments for parents returning from extended parental leave</li>
        </ul>
      </Wrapper>
    </Container>
  </Background>
);

export default PerksModule;
