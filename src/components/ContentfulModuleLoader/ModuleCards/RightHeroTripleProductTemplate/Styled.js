import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';
import { Container } from '../../../Grid';


export const InnerContainer = styled(Container)`
    display: flex;
    padding-top: ${({ theme }) => theme.space[4]};
`;

export const Content = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};

  > h1 {
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

  > h2 {
    color: ${({ theme }) => theme.palette.contrast[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.space[4]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    text-align: center;
  }
`;

export const Cards = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  list-style: none;
  text-align: center;

  img {
    margin-left: auto;
    margin-right: auto;
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
  justify-content: space-between;
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
`;
