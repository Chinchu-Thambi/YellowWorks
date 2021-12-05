/* globals describe, it, expect */

import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import ProductContext, { ProductProvider } from './ProductContext';

describe('ProductContext', () => {
  let productState;

  it('does not throw with incomplete data', async () => {
    await expect(async () => {
      await act(async () => {
        render(
          <ProductProvider>
            <ProductContext.Consumer>
              {(latestState) => {
                productState = latestState;
              }}
            </ProductContext.Consumer>
          </ProductProvider>,
        );
      });
    }).not.toThrow();

    expect(productState);

    cleanup();
  });
});
