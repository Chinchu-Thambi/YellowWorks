import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { pathOr } from 'ramda';

import theme from '../../util/theme';

// Button variants
const variants = {
  primary: {
    background: theme.palette.brand[0],
    text: theme.palette.contrast[0],
    hoverBackground: theme.palette.contrast[0],
    hoverText: theme.palette.base[0],
    outline: theme.palette.contrast[0],
  },
  secondary: {
    background: theme.palette.base[2],
    text: theme.palette.accent[5][0],
    hoverBackground: theme.palette.accent[5][0],
    hoverText: theme.palette.accent[5][4],
    outline: theme.palette.accent[5][0],
  },
  tertiary: {
    background: theme.palette.base[0],
    text: theme.palette.accent[5][0],
    hoverBackground: theme.palette.accent[5][0],
    hoverText: theme.palette.accent[5][4],
    outline: theme.palette.accent[5][0],
  },
  dark: {
    background: theme.palette.contrast[0],
    text: theme.palette.contrast[5],
    hoverBackground: theme.palette.contrast[1],
    hoverText: theme.palette.base[5],
  },
  link: {
    background: 'transparent',
    text: theme.palette.accent[3][0],
    hoverBackground: 'transparent',
    hoverText: theme.palette.accent[3][0],
    outline: 'transparent',
  },
  danger: {
    background: theme.palette.accent[0][0],
    text: theme.palette.base[0],
    hoverBackground: 'red',
    hoverText: theme.palette.base[0],
  },
};

// Button sizes
const sizes = {
  sm: `${theme.space[2]} ${theme.space[3]}`,
  md: `${theme.space[3]} ${theme.space[5]}`,
  lg: `${theme.space[3]} ${theme.space[7]}`,
};

const BaseButton = styled.button`
  font-family: ${({ variant }) => (variant === 'link' ? theme.fonts.sans : theme.fonts.title)};
  font-weight: ${({ variant }) => pathOr('400', [variant, 'fontWeight'], variants)};
  user-select: none;
  text-transform: uppercase;
  transition: background .12s ease-in-out;
  border: 1px solid transparent;
  text-decoration: none;
  line-height: initial;

  /* Control rounded borders */
  border-radius: 80px;

  /* Align all the child elements to the center */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* Handle disabled */
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => props.disabled && 0.4};

  /* Handle size */
  padding: ${({ size }) => (size ? sizes[size] : sizes.md)};

  /* Handle size for  variant link */
  ${({ variant }) => variant && variant === 'link' && (`
    font-weight: ${theme.fontWeight[1]};

    :hover {
      text-decoration: underline;
    }
  `)}

  /* Handle font size */
  font-size: ${({ size }) => (size ? size === 'sm' && '14px' : '16px')};

  /* Handle outline */
  ${({ outline, variant }) => outline && (`
    border-color: ${variant ? variants[variant].outline : variants.primary.text};
  `)}

  /* Handle variants */
  ${({ variant }) => (`
    background: ${variant ? variants[variant].background : variants.primary.background};
    color: ${variant ? variants[variant].text : variants.primary.text};
    font-weight: ${variant && variants[variant]?.fontWeight};
  `)}

  /* Handle event, apply if button is not disabled */
  ${({ disabled, variant }) => !disabled && (`
    :hover,
    :active,
    :focus {
      background: ${variant ? variants[variant].hoverBackground : variants.primary.hoverBackground};
      color: ${variant ? variants[variant].hoverText : variants.primary.hoverText};
    }
  `)}
`;

const Button = React.forwardRef((props, ref) => {
  const {
    href, to, ...rest
  } = props;

  let element = 'button';
  if (href) element = 'a';
  if (to) element = Link;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BaseButton ref={ref} as={element} href={href} to={to} {...rest} />;
});

export default Button;

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'dark',
    'link',
    'danger',
  ]),
  outline: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf([
    'sm', 'md', 'lg',
  ]),
  href: PropTypes.string,
  to: PropTypes.string,
};

Button.defaultProps = {
  variant: undefined,
  outline: undefined,
  disabled: false,
  type: undefined,
  size: undefined,
  href: undefined,
  to: undefined,
};
