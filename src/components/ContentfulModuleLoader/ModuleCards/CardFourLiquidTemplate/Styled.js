
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import Button from '../../../Button';

import { mediaBreakpointUp } from '../../../../util';

export const Container = styled(Flex)`
  font-family: ${({ theme }) => theme.fonts.mono}; // disable and inherit instead?
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
    line-height: 1.5em;
  }
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  text-align: center;
  width: 100%;
  margin: 0 auto; 

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[5]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    line-height: 1.5em;
    margin-bottom: ${({ theme }) => theme.space[4]};
    text-align: center;

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[6]};
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

export const ContentWapper = styled.div`
  width: 80%;
  margin: auto;

  a {
    width: 50%;
  }
`;

export const Cards = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 1.5;
  list-style: none;
  padding: 0;
  text-align: center;
  justify-content: center;

  ${mediaBreakpointUp('md')} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Card = styled.div`
  cursor: pointer;
  padding: 1em;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-radius: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 1.5;
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
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0 0 ${({ theme }) => theme.space[3]};
  }

  > img {
    margin: auto;
    margin-bottom: ${({ theme }) => theme.space[4]};
    max-width: 100%;
    height: auto;
  }
`;

export const CustomButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space[4]};
`;
