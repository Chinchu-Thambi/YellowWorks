/* globals describe, it, expect, beforeEach, jest, beforeAll */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import * as Gatsby from 'gatsby';

import { theme } from '../../../../util';

import PrePurchaseOnboarding from './PrePurchaseOnboarding';
import mockedProductPlatformProducts from '../../../../graphql/sampleData/mockedProductPlatformProducts.json';

const skuList = [
  'SEARCHADS',
  'PRINT',
];

describe('PrePurchaseOnboarding', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

  beforeAll(() => {
    useStaticQuery.mockReturnValue(mockedProductPlatformProducts);
  });

  beforeEach(() => {
    cleanup();
  });

  it('renders for all available skus without throwing', () => {
    skuList.forEach((sku) => expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <PrePurchaseOnboarding sku={sku} />
        </ThemeProvider>,
      );
    }).not.toThrow());
  });

  it('does not throw when sku is not provided', () => {
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <PrePurchaseOnboarding />
        </ThemeProvider>,
      );
    }).not.toThrow();
  });
});
