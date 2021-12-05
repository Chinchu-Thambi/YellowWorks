
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

import quoteIcon from '../../../../assets/icons/quoteIcon.svg';

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
    font-size: ${({ theme }) => theme.fontSizes[4]};
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
    color: ${({ theme }) => theme.palette.contrast[0]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin-bottom: ${({ theme }) => theme.space[2]};

    ${mediaBreakpointUp('md')} {
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
`;

export const Description = styled.div`
  line-height: 2em;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const Cards = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
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
  cursor: pointer;
  padding: 1em;
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: ${({ theme }) => theme.fontSizes[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  flex: 1 0 20%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;

  :last-child {
    margin-right: 0;
  }
  ${mediaBreakpointUp('md')} {
    margin-right: ${({ theme }) => theme.space[4]};
    max-width: 33.33%;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  h3:before {
    display: inline-block;
    content: ' ';
    background-image: url(${quoteIcon});
    background-size: 34px 34px;
    height: 34px;
    width: 34px;
    margin-right: ${({ theme }) => theme.space[1]};
    margin-bottom: -${({ theme }) => theme.space[2]};
  }
  
  h4 {
    color: ${({ theme }) => theme.palette.contrast[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  > a {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    color: ${({ theme }) => theme.colors.cerulean};
    text-decoration: none;
    text-transform: uppercase;
    margin-top: ${({ theme }) => theme.space[3]};
  }

  > img {
    margin-bottom: ${({ theme }) => theme.space[6]};
    max-width: 100%;
    height: auto;
  }
`;
