import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { theme, mediaBreakpointUp } from '../../util';

import chevronDown from './assets/chevron-down.svg';

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
  top: 35px;
  bottom: 0;
  overflow-x: hidden;
  background: ${theme.palette.base[0]};
  font-size: ${theme.fontSizes[1]};
  text-transform: uppercase;
  padding: 0 ${theme.space[2]};

  transition: transform .3s;
  transform: ${({ menuScrolledDown }) => (menuScrolledDown
    ? 'translate(280px)' : 'translate(0px)')};

  ul:first-child {
    border-bottom: 1px solid ${theme.palette.base[3]};
    padding-bottom: ${theme.space[2]};
  }

  > ul {
    padding: 0;

    > div {
      margin-left: -${theme.space[2]};
      margin-right: -${theme.space[2]};
      width: unset;
      min-width: unset;
      
      > section {
        overflow: auto;
        margin: 0;
        background-color: transparent;
        border-radius: unset;

        address {
          margin: 0 ${theme.space[3]};
        }

        li {
          margin: ${theme.space[2]} 0;
        }
  
      }

    }
  }
`;

export const ExpandedMenuListItem = styled.li`
  margin: 0 ${theme.space[2]};
  > a {
    color: ${theme.palette.contrast[0]};
    display: block;
    line-height: 48px;
  }
`;

export const FindABusiness = styled.span`
  position: relative;
  padding: 6px 16px;
  color: ${theme.palette.contrast[2]};
  font-weight: ${theme.fontWeight[1]};

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    border-radius: ${theme.space[3]};
    background: ${theme.palette.brand[0]};
  }
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

export const AccordionMenuLi = styled.li`
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeight[0]};
  display: block;
  background: transparent;
  border: 0;
  width: 100%;
  text-align: left;
  position: relative;
  text-transform: uppercase;

  > div {
    display: flex;
    justify-content: space-between;
    margin: 0 ${theme.space[2]};

    > button, button:hover, button:focus, button:active {
      width: 48px;
      height: 48px;
      padding: 0;
      background-color: transparent;
      background: url(${chevronDown}) no-repeat center;
      background-size: 16px;
      transform: ${({ visible }) => (visible ? 'rotate(0.5turn)' : 'none')};
    }

    > a {
      display: block;
      line-height: 48px;
      flex-grow: 3;
    }
  }

  :last-child {
    padding-bottom: ${theme.space[2]};
    border-bottom: 1px solid ${theme.palette.contrast[5]};
    margin-bottom: ${theme.space[3]};
  }
  
  > ul {
    padding: 0;
    font-size: ${theme.fontSizes[0]};
    overflow: hidden;
    transition: 
      ${({ visible }) => (visible ? 'max-height .6s' : 'max-height .2s')};
    max-height: ${({ visible }) => (visible ? '300px' : 0)};

    > li > a {
      display: block;
      padding: ${theme.space[2]} 0;
      margin-left: ${theme.space[3]};
    }
  }
`;


export const Contact = styled.ul`
  li {
    margin: 0 ${theme.space[3]};

    > div {
      display: flex;
      height: 48px;

      img {
        padding-right: ${theme.space[3]};
        width: 50px;
      }

      a {
        line-height: 48px;
        display: flex;
        align-items: center;
      }
    }
  }
`;

const UnstyledIconLink = (props) => {
  const {
    href, text, src,
  } = props;

  return <div><a href={href}><img alt="Expand menu" src={src} />{text}</a></div>;
};

UnstyledIconLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  src: PropTypes.string,
};

UnstyledIconLink.defaultProps = {
  href: undefined,
  text: undefined,
  src: undefined,
};

export const StyledIconLink = styled(UnstyledIconLink)`
  height: 48px;
  a {
    line-height: 48px;
    color: ${theme.palette.contrast[0]};

    :hover, :active {
      color: ${theme.palette.contrast[0]};
    }
  }
  img {
    height: 30px;
  }
`;

export const FollowUs = styled.div`
    margin: 0 ${theme.space[3]};

  > h3 {
    font-size: ${theme.fontSizes[1]};
    font-weight: ${theme.fontWeight[0]};
  }

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
    background: transparent;
    height: 48px ;
    margin: ${theme.space[0]};
    padding: ${theme.space[0]};
    padding-right: 16px;
    font-weight: ${theme.fontWeight[0]};
    font-size: ${theme.fontSizes[1]};
  }

  :hover, :active, :focus {
    color: ${theme.palette.contrast[0]};
  }

  svg {
    padding-right: ${theme.space[3]};
    height: 30px;
    width: auto;
    position: relative;
    left: -1px;
    top: -1px;
  }
`;
