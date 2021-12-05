import { addParameters } from '@storybook/client-api';
import { addDecorator } from '@storybook/react';

import { withTests } from '@storybook/addon-jest';
import { withKnobs } from '@storybook/addon-knobs/react';

import results from '../.jest-test-results.json';
import withStyles from './services/withStyles';

addDecorator(withStyles);
addDecorator(withTests({ results }));
addDecorator(withKnobs);

addParameters({
  viewport: {
    viewports: {
      'xs': {
        name: 'xs: Small Mobile',
        styles: {
          height: '568px',
          width: '320px',
        },
        type: 'mobile',
      },
      'xsLg': {
        name: 'xs: Wide Mobile',
        styles: {
          height: '880px',
          width: '575px',
        },
        type: 'mobile',
      },
      'sm': {
        name: 'sm: Small Tablet',
        styles: {
          height: '768px',
          width: '576px',
        },
        type: 'tablet',
      },
      'md': {
        name: 'md: Large Tablet',
        styles: {
          height: '1366px',
          width: '768px',
        },
        type: 'tablet',
      },
      'lg': {
        name: 'lg: Laptop, lower boundary',
        styles: {
          height: '728px',
          width: '992px',
        },
      },
      'lgLg': {
        name: 'lg: Laptop, higher boundary',
        styles: {
          height: '728px',
          width: '1199px',
        },
      },
      'xl': {
        name: 'xl: 1366px wide',
        styles: {
          height: '1024px',
          width: '1366px',
        },
      },
      'xxlLg': {
        name: 'xxl: 4k Screen',
        styles: {
          height: '1440px',
          width: '2560px',
        },
      },
    },
  },
});
