import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';
import { Container } from '../../../Grid';

export const CustomContainer = styled(Container)`
`;

export const InnerContainer = styled(Container)`
  display: flex;
  min-height: ${({ backgroundHeight }) => backgroundHeight}px;
  padding-top: ${({ theme }) => theme.space[4]};
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-repeat: no-repeat;
  background-position: 50% 0%;
  background-size: 80%;
  margin-top: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('xl')} {
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-repeat: no-repeat;
    background-position: 0% 60%;
    background-size: unset;
    margin-top: unset;
  }
`;

export const Content = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  padding-bottom: ${({ theme }) => theme.space[5]};
  text-align: center;

  > h2 {
    color: ${({ theme }) => theme.palette.contrast[2]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-bottom: 0;
    text-align: center;

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }

    > strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
    }
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.palette.contrast[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.space[4]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  text-align: center;
`;

export const Cards = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  list-style: none;
  text-align: center;
  padding-left: 0;

  ${mediaBreakpointUp('lg')} {
    display: flex;
  }

  ${mediaBreakpointUp('xl')} {
    padding-left: initial;
  }
`;

export const Card = styled.div`
  border-radius: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  justify-content: flex-start;
  line-height: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[2]};

  :last-child {
    margin-right: 0;
  }

  ${mediaBreakpointUp('md')} {
    margin-right: ${({ theme }) => theme.space[4]};
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  > a {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    color: ${({ theme }) => theme.colors.cerulean};
    text-decoration: none;
    text-transform: uppercase;
    margin-top: ${({ theme }) => theme.space[3]};
  }
  
  span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
  }

  img {
    justify-content: center;
    max-width: 100%;
    height: auto;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding-top: ${({ backgroundHeight, backgroundWidth }) => (backgroundWidth < backgroundHeight ? '85%' : '50%')};
  
  ${mediaBreakpointUp('xl')} {
    padding-top: 0;
    padding-left: ${({ backgroundWidth }) => backgroundWidth}px;
  }
`;
