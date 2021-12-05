import styled from 'styled-components';

import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
} from '@reach/menu-button';

import triangleSVG from './triangle.svg';

const MenuLink = ReachMenuLink;
const MenuItem = ReachMenuItem;
const Menu = ReachMenu;
const MenuButton = ReachMenuButton;

const MenuList = styled(ReachMenuList)`
  border: 1px solid ${({ theme }) => theme.palette.accent[3][3]};
  background: ${({ theme }) => theme.palette.base[0]};
  padding: ${({ theme }) => theme.space[3]} 0;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  right: ${({ theme }) => theme.space[3]};
  top: 26px; 
  display: block;
  outline: none;
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  border-radius: ${({ theme }) => theme.space[1]};
  position: relative;
  white-space: nowrap;
  text-transform: uppercase;
  /* 
    Do not add in here a min-width as this is 
    calculated by the library to display the element correctly. 
  */

  &:before {
    content: '';
    position: absolute;
    top: -32px;
    right: 22px;
    width: 50px;
    height: 36px;
    background: url(${triangleSVG}) no-repeat;
  }

  /*
    The dom structure of a MenuLink is reach-menu-item > a,
    so to target all items we can use 'data-reach - menu - item'
  */
  [data-reach-menu-item] {
    display: block;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-decoration: initial;
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};

    &[data-selected] {
      background: ${({ theme }) => theme.palette.accent[3][3]};
      color: ${({ theme }) => theme.palette.contrast[0]};
      outline: none;
    }
  }

  a[role="menuitem"] {
    &.active,
    &:hover {
      background-color: ${({ theme }) => theme.palette.accent[3][3]};
    }
  }
`;

export {
  Menu, MenuButton, MenuList, MenuItem, MenuLink,
};
