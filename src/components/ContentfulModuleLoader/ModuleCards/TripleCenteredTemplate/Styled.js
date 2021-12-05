import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const Content = styled.div`
  > h1 {
    color: ${({ theme }) => theme.palette.contrast[2]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    line-height: 1.5em;
    margin-bottom: ${({ theme }) => theme.space[4]};
    text-align: center;

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }

    > strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
    }
  }
`;

export const Cards = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5em;
  list-style: none;
  padding: 0;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: flex;
  }


  img {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeaderImage = styled.div`
  bottom: -90px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: -1;
`;

export const Card = styled.div`
  cursor: pointer;
  padding: 1em;
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: 2em;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-around;

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
`;
