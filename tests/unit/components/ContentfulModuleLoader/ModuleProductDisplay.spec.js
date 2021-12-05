/* globals describe, it, expect, afterEach */

import '@testing-library/jest-dom';

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import ModuleProductDisplay from '../../../../src/components/ContentfulModuleLoader/ModuleProductDisplay';

const theme = {
  colors: {
    primary: '',
  },
  palette: {
    base: [],
    contrast: [],
  },
  fonts: {
    sans: '',
  },
  fontSizes: [0, 1, 2, 3, 4, 5, 6],
  space: [0, 1, 2, 3, 4, 5, 6],
};

describe('ModuleProductDisplay', () => {
  afterEach(() => {
    cleanup();
  });

  it.skip('should render products', () => {
    const props = {
      title: { title: 'title' },
      products: [
        {
          sku: 'sku',
          type: 'type',
          name: 'product name',
          features: { features: 'features' },
          childProducts: [],
        },
      ],
    };

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleProductDisplay {...props} />
      </ThemeProvider>,
    );

    expect(getByText(props.products[0].name)).toHaveTextContent(props.products[0].name);
  });
});
