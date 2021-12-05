import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'rebass/styled-components';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../util';
import Button from '../../../Button';
import theme from '../../../../util/theme';

const propTypeModels = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }),
};

export const SkipLink = styled.div`
  position: relative;
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes[1]};
  text-transform: uppercase;

  button {
    height: 1px;
    padding: ${theme.space[1]} ${theme.space[2]};
    position: absolute;
    left: -100%;
    overflow: hidden;
    top: -100%;
    width: 1px;
    text-decoration: none;
  }

  button:active, button:focus {
    display: inline-block;
    padding: ${theme.space[3]};
    height: auto;
    left: 0;
    margin: ${theme.space[3]};
    overflow: visible;
    position: absolute;
    top: 85px;
    width: auto;
    outline: none;
    z-index: 10;
  }
`;

export const Container = styled(Box)`
  display: none;
  position: relative;
  z-index: ${theme.zIndex.sticky};
  height: 100%;
  align-items: center;
  background-color: ${theme.palette.base[0]};
  box-shadow: ${theme.shadows.small};

  ${mediaBreakpointUp('md')} {
    display: block;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export const WhiteNav = ({ className, children }) => (
  <div className={`local-reset h-7 shadow ${className}`}>
    <ul className="container px-2 mx-auto flex justify-around items-center h-full bg-base-100">
      {children}
    </ul>
  </div>
);

WhiteNav.defaultProps = {
  className: '',
};

WhiteNav.propTypes = {
  className: PropTypes.string,
  children: propTypeModels.children.isRequired,
};

export const HeaderButton = styled(Button)`
  height: auto;
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeight[1]};
  color: ${theme.palette.contrast[1]};
  padding: ${theme.space[2]} ${theme.space[3]};
`;

export const MenuLink = styled(Link)`
  position: relative;

  ::after {
    content: '';
    display: block;
    height: 6px;
    border-radius: ${theme.space[3]};
    background: ${theme.palette.brand[0]};
    position: absolute;
    bottom: 16px;
    width: 0;
    left: 50%;
    transition: width .2s, left .2s;
  }

  :hover::after {
    width: calc(100% - 2 * ${theme.space[3]});
    left: ${theme.space[3]};
  }
`;

export const ChildMenuWrapper = styled.div`
  background: ${theme.colors.white};
  position: absolute;
  transition: transform .2s;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;

  transform: ${({ visible }) => (
    visible
      ? 'translateY(100%)'
      : 'translateY(-90px)'
  )};
}
`;
