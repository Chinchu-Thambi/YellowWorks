
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

export const Container = styled(Flex)`
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.mono}; // why? 
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  margin-bottom: 0;

  padding-left: 10px;
  padding-right: 10px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding-left: 0;
    padding-right: 0;
  }

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: ${({ theme }) => theme.space[3]};
  }
`;

export const Content = styled.div`

  text-align: center;
  width: 100%;
  margin: 0 auto; 
  
  ${mediaBreakpointUp('lg')} {
    width: 60%;
  }

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

  > h2 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[2]};

    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
`;

export const Description = styled.div`
  a {
    color: ${({ theme }) => theme.palette.accent[2][0]};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }

  a:hover {
    color: ${({ theme }) => theme.palette.accent[2][2]};
  }
`;

export const Cards = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5em;
  list-style: none;
  padding: 0;
  text-align: center;
  flex-wrap: wrap;

  ${mediaBreakpointUp('lg')} {
    display: flex;
  }


  img {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.palette.base[0]};
  color: ${({ theme }) => theme.palette.contrast[2]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  flex: 1 0 20%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-around;
  margin: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    margin-left: 0;
    margin-right: ${({ theme }) => theme.space[4]};

    :last-child {
      margin-right: 0;
    }
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[0]};
  }

  h4 {
    color: ${({ theme }) => theme.palette.accent[2][0]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
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
  }
`;
