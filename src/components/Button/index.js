import { Link } from 'rebass/styled-components';
import { Link as InnerLink } from 'gatsby';
import styled from 'styled-components';

import Button from './Button';

export default Button;

// TODO: Remove references to exports that use DeprecatedButton
const DeprecatedButton = styled(Link)`
  -webkit-appearance: inherit;
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  padding: 20px 40px;
  border-radius: 40px;
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  font-family: ${({ theme }) => theme.fonts.sans};
  cursor: pointer;
  text-align: center;
  border: 0;
`;

export const LinkButton = styled(DeprecatedButton)`
  && {
    background: transparent;
    display: flex;
    border: 3px;
    color: ${({ theme }) => theme.colors.cerulean};
  }
`;

export const InnerLinkButton = styled(InnerLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.cerulean};
  display: inline-block;
  padding: ${({ theme }) => theme.space[2]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
`;

export const SignInHeaderButton = styled(Button)`
  && { 
    border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
    color: ${({ theme }) => theme.palette.contrast[2]};
    background: transparent;
    height: 40px ;
    margin: ${({ theme }) => theme.space[0]};
    padding: ${({ theme }) => theme.space[0]};
    padding-right: 16px;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    white-space: nowrap;
}
  }

  &:hover {
    background: ${({ theme }) => theme.palette.contrast[5]};
  }

  svg {
    margin-right: ${({ theme }) => theme.space[2]};
    height: calc(100% + 2px);
    width: auto;
    position: relative;
    left: -1px;
  }
`;
