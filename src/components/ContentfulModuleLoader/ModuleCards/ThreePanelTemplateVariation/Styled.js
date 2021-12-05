import styled from 'styled-components';
import { Box } from 'rebass/styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

export const Content = styled(Box)`
  font-family: ${({ theme }) => theme.fonts.sans};
  width: 100%;
  margin: auto;
  padding: 0 ${({ theme }) => theme.space[2]};
  display: flex;
  line-height: 1.5;
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

  h2 {
    line-height: ${({ theme }) => theme.fontSizes[3]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      line-height: ${({ theme }) => theme.fontSizes[5]};
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  }

  > span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

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
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.5;
  list-style: none;
  padding: 0;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: center;
  }

  img {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeaderImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Card = styled.div`
  padding: 1em;
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  :last-child {
    margin-right: 0;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  ${mediaBreakpointUp('md')} {
    margin: 0 ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
    max-width: 30%;
    min-width: 30%;
  }

  ${mediaBreakpointUp('xxl')} {
    margin: 0 ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
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
  }
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const Subheading = styled.h3`
  color: ${({ theme }) => theme.palette.accent[2][0]};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;
