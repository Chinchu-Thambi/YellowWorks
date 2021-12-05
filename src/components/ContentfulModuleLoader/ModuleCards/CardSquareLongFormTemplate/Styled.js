
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const Container = styled(Flex)`
  font-family: ${({ theme }) => theme.fonts.mono};
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding-left: 0;
    padding-right: 0;
  }

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.5em;
  }
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  text-align: center;
  width: 100%;
  margin: 0 auto; 
  
  ${mediaBreakpointUp('md')} {
    width: 60%;
  }

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    line-height: 1.5em;
    margin-bottom: ${({ theme }) => theme.space[4]};
    text-align: center;

    ${mediaBreakpointUp('lg')} {
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
`;

export const Cards = styled.div`
  color: ${({ theme }) => theme.palette.contrast[2]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5em;
  list-style: none;
  padding: 0;
  text-align: left;

  ${mediaBreakpointUp('md')} {
    display: flex;
    flex-wrap: wrap;
  }


  img {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Card = styled.div`
  padding: 1em;
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: ${({ theme }) => theme.fontSizes[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  flex: 1 0 30%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: start;
  margin-bottom: ${({ theme }) => theme.space[3]};

  :last-child {
    margin-right: 0;
  }
  ${mediaBreakpointUp('md')} {
    margin-right: ${({ theme }) => theme.space[4]};
    margin-bottom: 0;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
    text-align: center;
    
  }

  > a {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    color: ${({ theme }) => theme.colors.cerulean};
    text-decoration: none;
    text-transform: uppercase;
    margin-top: ${({ theme }) => theme.space[3]};
  }

  > img {
    margin-bottom: ${({ theme }) => theme.space[3]};
    max-width: 100%;
    height: auto;

    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[6]};
    }
`;
