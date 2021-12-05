import styled from 'styled-components';
import { Link } from 'gatsby';

import { mediaBreakpointUp } from '../../../../util';

import accountSettingsIcon from '../../../../assets/icons/gear.svg';
import myProductsIcon from '../../../../assets/icons/tabs.svg';
import insightsIcon from '../../../../assets/icons/graph.svg';

export const SidebarContainer = styled.div`
  width: 320px;
  min-width: 320px;
  display: block;
  margin-right: ${({ theme }) => theme.space[3]};
`;

export const SidebarSection = styled.section`
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.palette.contrast[5]};
  position: relative;

  header {
    text-align: center;
    margin: 0;
    padding: ${({ theme }) => theme.space[3]} 0;
    color: ${({ theme }) => theme.palette.base[0]};
    background: ${({ theme }) => theme.palette.contrast[0]};

    h4 {
      margin: 0;
    }
  }

  > ul {
    padding: 0;
    list-style: none;

    > li {
      margin-bottom: ${({ theme }) => theme.space[2]};
    }
  }
`;

export const iconSources = {
  '/my-yellow/account-settings': accountSettingsIcon,
  '/my-yellow/my-products': myProductsIcon,
  '/my-yellow/insights': insightsIcon,
};

export const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space[2]} 0;
  padding-left: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.palette.contrast[0]};

  &.active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.accent[3][3]};
  }
`;

export const IconNavLink = styled(NavLink)`
  padding-left: ${({ theme }) => `calc(${theme.space[3]} + 25px + ${theme.space[3]})`};
  background-size: 20px auto;
  background-repeat: no-repeat;
  background-position: ${({ theme }) => theme.space[3]} center;
  background-image: ${({ to }) => `url(${iconSources[to]})`};
`;

export const PremiumTag = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  ${mediaBreakpointUp('md')} {
    right: ${({ theme }) => theme.space[3]};
  }
`;

export const HeaderTitle = styled.h4`
  position: relative;
  padding-bottom: ${({ theme }) => theme.space[3]};

  &::before {
    content: '';
    bottom: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    position: absolute;
    background: ${({ theme }) => theme.palette.contrast[2]};
  }
`;

export const HeaderCompanyName = styled.div`
  text-transform: uppercase;
  padding-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.palette.contrast[4]};
`;

export const HeaderAddress = styled.address`
  font-style: normal;
  text-transform: uppercase;
  text-transform: capitalize;
  padding-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.palette.contrast[4]};
  margin: 0 5%;
`;
