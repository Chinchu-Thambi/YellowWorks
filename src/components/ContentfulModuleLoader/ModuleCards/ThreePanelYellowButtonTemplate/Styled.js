import styled from 'styled-components';
import Button from '../../../Button';

import { mediaBreakpointUp } from '../../../../util';
import blackCheckmark from '../../../../assets/icons/black-checkmark.svg';

export const Background = styled.div`
  background-color: ${(props) => props.backgroundColor};
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
  padding: 0;
  padding-bottom: ${({ theme }) => theme.space[3]};
  margin: 0;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  ${mediaBreakpointUp('xl')} {
    justify-content: flex-start;
  }

  img {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
`;

export const HeaderImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[2]};
  line-height: 2;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0;

  :last-child {
    margin-right: 0;
  }

  ${mediaBreakpointUp('md')} {
    margin: 0 0 ${({ theme }) => theme.space[2]};
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[5]};
    max-width: 49%;
    min-width: 49%;
  }

  ${mediaBreakpointUp('xl')} {
    margin: 0 ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[2]};
    max-width: 30%;
    min-width: 30%;
  }

  ${mediaBreakpointUp('xxl')} {
    margin: 0 ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    margin: auto;
    margin-bottom: ${({ theme }) => theme.space[3]};
    width: 60%;

    ${mediaBreakpointUp('md')} {
      margin: 0;
      margin-bottom: ${({ theme }) => theme.space[3]};
      width: 100%;
    }
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

export const CustomButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space[4]};
`;
