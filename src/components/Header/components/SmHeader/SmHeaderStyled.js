import styled from 'styled-components';

import Button from '../../../Button';

import { theme, mediaBreakpointUp } from '../../../../util';

export const Container = styled.div`
  position: relative;
  z-index: ${theme.zIndex.fixed};
  left: 0;
  right: 0;
  top: 0;

  font-family: ${theme.fonts.sans};
  font-weight: ${theme.fontWeight[0]};

  ${mediaBreakpointUp('md')} {
    display: none;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: ${theme.palette.contrast[0]};
  }
`;

export const Fixed = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: ${theme.palette.base[0]};
  box-shadow: ${theme.shadows.medium};

  display: flex;
  justify-content: space-between;
  align-items: center;

  >a {
    padding: 0;
  }

  >a img {
    height: ${theme.space[4]};
    margin-right: ${theme.space[2]};
  }
`;

export const Toggler = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const Expanded = styled.div`
  box-shadow: 1px 0px ${theme.palette.base[3]};
  position: fixed;
  z-index: 10;
  width: 280px;
  left: -280px;
  top: 50px;
  bottom: 0;
  overflow-x: hidden;
  background: ${theme.palette.base[0]};
  font-size: ${theme.fontSizes[1]};
  padding: 0 ${theme.space[2]};

  transition: transform .3s;
  transform: ${({ menuScrolledDown }) => (menuScrolledDown
    ? 'translate(280px)' : 'translate(0px)')};
`;

export const SidebarWrapper = styled.div`
  >div {
    width: 100%;
    min-width: auto;
  }

  li {
    margin-top: ${theme.space[2]};
  }
`;

export const FollowUs = styled.div`
  > ul {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      width: ${theme.space[4]};
      height: ${theme.space[4]};  
      justify-content: center;
      align-items: center;
    }
  }
`;

export const IconButton = styled(Button)`
  && {
    text-transform: none;
    background: transparent;
    margin: ${theme.space[0]};
    padding: ${theme.space[0]};
  }

  :hover, :active, :focus {
    color: ${theme.palette.contrast[0]};
  }

  svg {
    padding-right: ${theme.space[2]};
    height: 30px;
    width: auto;
    position: relative;
    left: -1px;
    top: -1px;
  }
`;
