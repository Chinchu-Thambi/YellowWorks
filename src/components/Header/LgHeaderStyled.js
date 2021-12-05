import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Box } from 'rebass/styled-components';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../util';
import Button from '../Button';
import theme from '../../util/theme';

import headerPointer from '../../assets/icons/headerPointer.svg';

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
  font-family: ${theme.fonts.mono};
  font-weight: ${theme.fontWeight[0]};
  position: relative;
  z-index: ${theme.zIndex.sticky};
  height: 100%;
  align-items: center;
  background-color: ${theme.palette.base[0]};
  box-shadow: ${theme.shadows.small};

  ${mediaBreakpointUp('md')} {
    display: block;
    height: 90px;
  }

  li {
    list-style: none;
    padding: 0;
  }
  
  a {
    text-decoration: none;
  }
`;

// eslint-disable-next-line max-len
const logoSrc = 'https://cdn11.bigcommerce.com/s-npte00i8ef/stencil/4a56d7a0-2da2-0137-892b-0242ac110005/e/2ebf55a0-80d9-0136-d2c6-7fd6dfdde2be/img/header-footer/yellow-logo.svg';

export const WhiteNav = ({ children }) => (
  <Nav
    width={theme.containerWidth}
    mx="auto"
    justifyContent="space-around"
  >
    <Link to="/"><img src={logoSrc} alt="Yellow" /></Link>
    <FlexUl
      as="ul"
      alignItems="center"
      justifyContent="space-around"
    >
      {children}
    </FlexUl>
  </Nav>
);

WhiteNav.propTypes = {
  children: propTypeModels.children.isRequired,
};

export const FlexUl = styled(Flex)`
  height: 100%;
  flex-grow: 2;

  > li {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .pointer {
    position: absolute;
    top: 86px;
  }
`;

export const Nav = styled(Flex)`
  height: 90px;
  align-items: center;
  background: ${theme.palette.base[0]};
`;


Nav.propTypes = {
  children: propTypeModels.children.isRequired,
};

export const HeaderButton = styled(Button)`
  height: auto;
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeight[1]};
  color: ${theme.palette.contrast[1]};
  padding: ${theme.space[2]} ${theme.space[3]};
`;

export const SubmenuPointer = ({ visible }) => (
  <img
    className="pointer"
    src={headerPointer}
    alt=""
    css={{
      display: (
        visible
          ? 'block'
          : 'none'
      ),
    }}
  />
);

SubmenuPointer.defaultProps = {
  visible: false,
};
SubmenuPointer.propTypes = {
  visible: PropTypes.bool,
};

export const MenuHeaderSeparatorLine = styled.li`
  position: relative;
  margin: 0 ${theme.space[3]};

  &::after {
    content: '';
    background: ${theme.palette.contrast[4]};
    border-radius: ${theme.space[3]};
    position: absolute;
    width: 2px;
    height: 58%;
    top: 22%;
  }
`;

export const MenuLink = styled(Link)`
  color: ${theme.palette.contrast[1]};
  padding-left: ${theme.space[2]};
  padding-right: ${theme.space[2]};
  position: relative;
  font-family: ${theme.fonts.title};
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeight[1]};
  text-transform: uppercase;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  @media screen and (min-width: ${theme.breakpoints[2]}) {
    padding-left: 16px;
    padding-right: 16px;
  }

  ::after {
    content: '';
    display: block;
    height: 6px;
    border-radius: ${theme.space[3]};
    background: ${theme.palette.brand[0]};
    position: absolute;
    bottom: 26px;
    width: 0;
    left: 50%;
    transition: width .2s,left .2s;
  }

  :hover::after {
    width: 75px;
    left: calc(50% - 37px);
  }
`;

export const ProductMenu = ({
  children, visible, ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ProductMenuWrapper visible={visible} {...rest}>
    <Flex
      width={theme.containerWidth}
      mx="auto"
      className="ProductMenuFlex"
    >
      {children}
    </Flex>
  </ProductMenuWrapper>
);

ProductMenu.defaultProps = {
  children: [],
  visible: false,
};

ProductMenu.propTypes = {
  children: propTypeModels.children,
  visible: PropTypes.bool,
};

export const ProductMenuWrapper = styled.div`
  display: flex;
  justify-content: left;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.palette.base[3]};
  position: absolute;
  padding-bottom: ${theme.space[2]};
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

  > div {
    padding-top: ${theme.space[3]};
    position: relative;
    justify-content: center;
   
/* Per current implementation this switch realigns the submenus based on the login state. */
${({ menuName, state }) => {
    if (!state?.user) {
      switch (menuName) {
        case 'resources':
          return `
            ${mediaBreakpointUp('md')} {
              justify-content: flex-start;
              padding-left: 180px;
            }
            ${mediaBreakpointUp('lg')} {
              padding-left: 245px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 275px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 322px;
            }
        `;
        case 'about':
          return `
            ${mediaBreakpointUp('md')} {
              justify-content: flex-start;
              padding-left: 225px;
            }
            ${mediaBreakpointUp('lg')} {
              padding-left: 350px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 405px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 485px;
            }
        `;
        default:
          return `
            ${mediaBreakpointUp('lg')} {
              justify-content: flex-start;
              padding-left: 135px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 155px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 170px;
            }
        `;
      }
    } else {
      switch (menuName) {
        case 'resources':
          return `
            ${mediaBreakpointUp('md')} {
              justify-content: flex-start;
              padding-left: 180px;
            }
            ${mediaBreakpointUp('lg')} {
              padding-left: 245px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 300px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 350px;
            }
        `;
        case 'about':
          return `
            ${mediaBreakpointUp('md')} {
              justify-content: flex-start;
              padding-left: 225px;
            }
            ${mediaBreakpointUp('lg')} {
              padding-left: 360px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 440px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 535px;
            }
        `;
        default:
          return `
            ${mediaBreakpointUp('lg')} {
              justify-content: flex-start;
              padding-left: 135px;
            }
            ${mediaBreakpointUp('xl')} {
              padding-left: 155px;
            }
            ${mediaBreakpointUp('xxl')} {
              padding-left: 170px;
            }
        `;
      }
    }
  }
}

    ul {
      margin-top: ${theme.space[3]};
      margin-bottom: ${theme.space[3]};
      line-height: ${theme.fontSizes[2]};
      padding-left: 25px;
      padding-right: 25px;
    };

    p {
      margin: 0 0 ${theme.space[3]};
      font-size: ${theme.fontSizes[1]};
      font-family: ${theme.fonts.sans};
      font-weight: ${theme.fontWeight[1]};
      text-transform: uppercase;
    }

    a {
      display: block;
      margin: 0 0 ${theme.space[2]};
      font-size: ${theme.fontSizes[1]};
      color: ${theme.palette.contrast[0]};
      text-transform: none;
      font-family: ${theme.fonts.mono};
    
    :hover {
      color: ${theme.palette.contrast[3]};
    }
  }

  li:last-child a {
    margin-bottom: 0;
  }
}
`;
