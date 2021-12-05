/* eslint-disable prefer-destructuring */
/* globals window */
import React from 'react';
import * as t from '../services/theme.json';

/** **********************************************************************************************
 * @deprecated
 *
 * For use with older rebass and styled components only.
 *
 * Use tailwind for styling new components. Refer to tailwind.config.js and services/theme.json.
 ************************************************************************************************ */


/**
 * SPEC REFERENCE AT https://github.com/system-ui/theme-specification
 */

/**
  * @deprecated
  * legacy - refer to canonical theme in services/theme.json
  */
const containerWidth = [
  1, // 100%
  '33.75rem', // 540px
  '43.75rem', // 720px
  '58.75rem', // 940px
  '73.75rem', // 1140px
  '90.00rem', // 1440px
];

/**
  * @deprecated
  * legacy - refer to canonical theme in services/theme.json
  */
const colors = {
  blue: '#07c', // palette.accent[4][0]
  brand: '#1F2A44', // palette.contrast[0]
  brandLight: '#343E55', // palette.contrast[1]
  primary: '#FBE122', // palette.brand[0]
  cerulean: '#00aded', // palette.accent[3][0]
  azure: '#345DA4', // palette.accent[4][0]
  black: '#000', // palette.contrast[0]
  dolphin: '#667', // palette.contrast[1]
  raven: '#797F8F', // palette.contrast[2]
  dustyGray: '#999', // palette.contrast[3]
  spunPearl: '#aab', // palette.contrast[3]
  silver: '#ccc', // palette.contrast[4]
  mischka: '#ddd', // palette.contrast[4]
  concrete: '#f2f2f2', // palette.contrast[5]
  pleinDeVie: '#BABABA', // palette.contrast[3]
  athensGray: '#f3f5f8', // palette.contrast[5]
  gallery: '#eee', // palette.base[3]
  lightGray: '#f6f6ff', // palette.contrast[5]
  white: '#fff', // palette.base[0],
  yellow: '#F9E01A',
};

const palette = {
  base: [
    t.colors.base['100'],
    t.colors.base['200'],
    t.colors.base['300'],
    t.colors.base['400'],
  ],
  brand: [ // The Optimist
    t.colors.brand['600'],
    t.colors.brand['500'],
    t.colors.brand['400'],
    t.colors.brand['300'],
    t.colors.brand['200'],
    t.colors.brand['100'],
  ],
  contrast: [ // Midnight
    t.colors.contrast['600'],
    t.colors.contrast['500'],
    t.colors.contrast['400'],
    t.colors.contrast['300'],
    t.colors.contrast['200'],
    t.colors.contrast['100'],
  ],
  accent: [
    [ // Crimson
      t.colors.crimson['600'],
      t.colors.crimson['500'],
      t.colors.crimson['400'],
      t.colors.crimson['300'],
      t.colors.crimson['200'],
      t.colors.crimson['100'],
    ],
    [ // Fern
      t.colors.fern['600'],
      t.colors.fern['500'],
      t.colors.fern['400'],
      t.colors.fern['300'],
      t.colors.fern['200'],
      t.colors.fern['100'],
    ],
    [ // Uplift
      t.colors.uplift['600'],
      t.colors.uplift['500'],
      t.colors.uplift['400'],
      t.colors.uplift['300'],
      t.colors.uplift['200'],
      t.colors.uplift['100'],
    ],
    [ // Pacific
      t.colors.pacific['600'],
      t.colors.pacific['500'],
      t.colors.pacific['400'],
      t.colors.pacific['300'],
      t.colors.pacific['200'],
      t.colors.pacific['100'],
    ],
    [ // Magnificent
      t.colors.magnificent['600'],
      t.colors.magnificent['500'],
      t.colors.magnificent['400'],
      t.colors.magnificent['300'],
      t.colors.magnificent['200'],
      t.colors.magnificent['100'],
    ],
    [ // Violet
      t.colors.violet['600'],
      t.colors.violet['500'],
      t.colors.violet['400'],
      t.colors.violet['300'],
      t.colors.violet['200'],
      t.colors.violet['100'],
    ],
  ],
};

/**
  * @deprecated
  * legacy - refer to canonical theme in services/theme.json
  */
// color aliases for palette.accent
palette.error = palette.accent[0];
palette.success = palette.accent[1];
palette.warn = palette.accent[2];
palette.navigation = palette.accent[3];
palette.support = palette.accent[4];

const theme = {
  breakpoints: [
    t.screens.sm,
    t.screens.md,
    t.screens.lg,
    t.screens.xl,
    t.screens['2xl'],
  ],
  containerWidth,
  fontSizes: [
    t.fontSize.sm[0],
    t.fontSize.xs[0],
    t.fontSize.base[0],
    t.fontSize['2xl'][0],
    t.fontSize['3xl'][0],
    t.fontSize['4xl'][0],
    t.fontSize['6xl'][0],
  ],
  // TODO replace usage of this...
  fontWeight: [
    t.fontWeight.normal,
    t.fontWeight.bold,
  ],
  // TODO ...with this (e.g. fontWeight="bold")
  fontWeights: { // PROPER SCHEMA
    body: t.fontWeight.normal,
    bold: t.fontWeight.bold,
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popOver: 1060,
    tooltip: 1070,
  },
  colors,
  palette,
  space: [
    t.spacing['0'],
    t.spacing['1'],
    t.spacing['2'],
    t.spacing['3'],
    t.spacing['4'],
    t.spacing['5'],
    t.spacing['6'],
    t.spacing['7'],
    t.spacing['8'],
    t.spacing['9'],
    t.spacing['10'],
    t.spacing['11'],
    t.spacing['12'],
    t.spacing['13'],
    t.spacing['14'],
  ],
  fonts: {
    sans: t.fontFamily.sans[0],
    title: t.fontFamily.title[0],
  },
  shadows: {
    subtle: t.boxShadow.xs,
    small: t.boxShadow.sm,
    medium: t.boxShadow.md,
    large: t.boxShadow.lg,
  },
  // TODO should not have these buttons in the theme - delete later
  buttons: {
    primary: {
      color: 'black',
      backgroundColor: colors.primary,
      textTransform: 'uppercase',
      borderRadius: '40px',
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    outline: {
      color: colors.blue,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
  },
  radii: [
    t.borderRadius.none,
    t.borderRadius.default,
    t.borderRadius.md,
    t.borderRadius.lg,
  ],
};

/**
 * @deprecated
 * legacy - refer to canonical theme in services/theme.json and use tailwind to manage breakpoints
 */
const widthToBreakpoint = (width) => {
  if (width <= 576) return 'xs';
  if (width <= 768) return 'sm';
  if (width <= 992) return 'md';
  if (width <= 1200) return 'lg';
  if (width <= 1440) return 'xl';
  return 'xxl';
};

/**
 * @deprecated
 * legacy - refer to canonical theme in services/theme.json and use tailwind to manage breakpoints
 */
export const useBreakpoint = () => {
  if (typeof window === 'undefined') { return 'xs'; }
  // SSR for static pages will fail due to window useage - shift towards default window instead.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [breakpoint, setBreakpoint] = React.useState(widthToBreakpoint(window.innerWidth));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const onResize = () => {
      setBreakpoint(widthToBreakpoint(window.innerWidth));
    };
    const resizeListener = window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  });
  return breakpoint;
};

export default theme;

/**
 * @deprecated
 * legacy - refer to canonical theme in services/theme.json and use tailwind to manage breakpoints
 */
export const mediaBreakpoints = {
  xs: {
    minScreenWidth: 0,
    maxScreenWidth: 576 - 0.02,
  },
  sm: {
    minScreenWidth: theme.breakpoints[0],
    maxContainerWidth: containerWidth[1],
  },
  md: {
    minScreenWidth: theme.breakpoints[1],
    maxContainerWidth: containerWidth[2],
  },
  lg: {
    minScreenWidth: theme.breakpoints[2],
    maxContainerWidth: containerWidth[3],
  },
  xl: {
    minScreenWidth: theme.breakpoints[3],
    maxContainerWidth: containerWidth[4],
  },
  xxl: {
    minScreenWidth: theme.breakpoints[4],
    maxContainerWidth: containerWidth[5],
  },
};

/**
 * @deprecated
 * legacy - refer to canonical theme in services/theme.json and use tailwind to manage breakpoints
 */
export const mediaBreakpointUp = (size) => (
  mediaBreakpoints[size]
    ? `@media (min-width: ${mediaBreakpoints[size].minScreenWidth})`
    : ''
);
