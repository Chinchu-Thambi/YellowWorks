import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';
import blackCheckmark from '../../../../assets/icons/black-checkmark.svg';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 1px 0;
`;

export const Content = styled.div`
  text-align: center;

  > h1 {
    line-height: 1.25em;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: ${({ theme }) => theme.space[3]};
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }
`;

export const Cards = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5em;
  list-style: none;
  padding: 0 ${({ theme }) => theme.space[2]};
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: space-between;
  }

  img {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;

export const HeaderImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.palette.base[0]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: 2em;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('xl')} {
    :last-child :not(:nth-child(3n+3)) {
      margin-right: auto;
      margin-left: ${({ theme }) => theme.space[6]};
    }
  }

  ${mediaBreakpointUp('xxl')} {
    :last-child :not(:nth-child(3n+3)) {
      margin-left: ${({ theme }) => theme.space[7]};
    }
  }

  ${mediaBreakpointUp('md')} {
    margin: 0 0 ${({ theme }) => theme.space[5]};
    max-width: 49%;
    min-width: 49%;
  }

  ${mediaBreakpointUp('xl')} {
    max-width: 30%;
    min-width: 30%;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
  }
  > div {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  ul {
    text-align: left;
    display: inline-block;
    margin: auto;
    list-style-image: url(${blackCheckmark});
    margin-left: -10px;

    li {
      line-height: ${({ theme }) => theme.fontSizes[4]};
    }
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

  img {
    max-width: 100%;
    height: auto;
    z-index: 1
  }
`;
