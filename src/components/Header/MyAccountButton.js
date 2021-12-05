import React from 'react';
import styled from 'styled-components';
import { path } from 'ramda';
import { Link } from 'gatsby';

import { mediaBreakpointUp } from '../../util';

import AuthContext from '../Auth/AuthContext';
import {
  Menu, MenuList, MenuButton, MenuItem, MenuLink,
} from '../Dropdown';

import accountIcon from '../../assets/icons/icon-account.svg';

export const MyAccountButtonStyled = styled(MenuButton)`
    font-size: ${({ theme }) => theme.fontSizes[0]}; 
    padding: ${({ theme }) => theme.space[0]};
    border: 0;
    cursor: pointer;
    border-radius: 40px;
    padding-right: ${({ theme }) => theme.space[3]};
    align-items: center;
    display: inline-flex;
    background: transparent;

    color: ${({ theme }) => theme.palette.contrast[2]};
    height: 38px;
    font-weight: ${({ theme }) => theme.fontWeight[1]};

    &:hover {
      background: ${({ theme }) => theme.palette.contrast[5]};
    }

    .user-name {
      max-width: 110px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-transform: capitalize;
    }

    & img {
      margin-right: ${({ theme }) => theme.space[2]};
      left: -1px;
      height: 100%;
      position: relative;
    }

    ${mediaBreakpointUp('md')} {
      padding: 0;

      > img {
        margin-right: 0;
      }

      .user-name {
        display: none;
      }
    }

    ${mediaBreakpointUp('lg')} {
      padding-right: ${({ theme }) => theme.space[3]};

      > img {
      margin-right: ${({ theme }) => theme.space[2]};
      }

      .user-name {
        display: block;
      }
    }
`;

const MyAccountButton = () => {
  const { state, logout } = React.useContext(AuthContext);

  return (
    state.user && (
      <Menu>
        <MyAccountButtonStyled id="account-button">
          <img src={accountIcon} alt="account" />
          <div className="user-name">
            {path(['attributes', 'given_name'])(state.user)}
            {' '}
            {path(['attributes', 'family_name'])(state.user)}
          </div>
        </MyAccountButtonStyled>
        <MenuList>
          <MenuLink activeClassName="active" as={Link} to="/my-yellow/account-settings">Account settings</MenuLink>
          <MenuLink activeClassName="active" as={Link} to="/my-yellow/my-products">
            My products
          </MenuLink>
          <MenuLink activeClassName="active" as={Link} to="/my-yellow/insights">Insights</MenuLink>
          <MenuItem onSelect={logout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    )
  );
};

export default MyAccountButton;
