import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const Content = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${mediaBreakpointUp('sm')} {
    padding: ${({ theme }) => theme.space[4]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 50%;
  }
  > h1 {
    line-height: ${({ theme }) => theme.fontSizes[3]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }

    > strong {
      font-weight: ${({ theme }) => theme.fontWeight[1]};
    }
  }
  
  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    margin-bottom: ${({ theme }) => theme.space[0]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;

export const Cards = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5em;
  list-style: none;
  padding: 0 ${({ theme }) => theme.space[2]};;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mediaBreakpointUp('md')} {
    flex-direction: row;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.space[4]};

  > div {
    padding-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const Card = styled.div`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: 2em;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('lg')} {
    flex-basis: 31%;
    max-width: 31%;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    padding-bottom: ${({ theme }) => theme.space[3]};
    margin-top: 0;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
  }

  a, button {
    max-width: 80%;
    align-self: center;
    margin-bottom: 1rem;
  }
`;
