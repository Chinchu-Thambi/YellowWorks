/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { Link } from 'gatsby';

import { mediaBreakpointUp } from '../../../../util';

export const Header = styled.div`
  text-align: center;
  line-height: 1.25em;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;
export const Content = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  text-align: center;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.space[3]}; 
  
  ${mediaBreakpointUp('md')} {
    width: 60%;
  }

  > h1 {
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

  p button {
    padding: 0 ${({ theme }) => theme.space[1]};
    text-transform: none;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
  }

  video {
    max-width: 100%;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.accent[3][0]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;
