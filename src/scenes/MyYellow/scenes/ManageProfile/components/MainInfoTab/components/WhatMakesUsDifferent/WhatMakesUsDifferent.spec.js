/* globals describe, it, expect, jest, beforeAll, afterAll */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import AuthContext from '../../../../../../../../components/Auth/AuthContext';
import { theme } from '../../../../../../../../util';

import ProductContext from '../../../../../../services/ProductContext';

import WhatMakesUsDifferent from './WhatMakesUsDifferent';

describe('WhatMakesUsDifferent', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  afterAll(() => {
    jest.setTimeout(5000);
  });

  const slogan = 'Not all heroes wear capes';

  const productState = {
    formData: {
      businessProfile: {
        slogan,
      },
    },
    saveData: jest.fn().mockResolvedValue({ success: true }),
  };

  it('renders without throwing', () => {
    expect(async () => {
      render(
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ jwtToken: 'jwtToken' }}>
            <ProductContext.Provider value={productState}>
              <WhatMakesUsDifferent />
            </ProductContext.Provider>
          </AuthContext.Provider>
        </ThemeProvider>,
      );
    }).not.toThrow();
  });

  it('show correct information', async () => {
    const wrapper = await render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ jwtToken: 'jwtToken' }}>
          <ProductContext.Provider value={productState}>
            <WhatMakesUsDifferent />
          </ProductContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    await wrapper.findByText('What makes us different');
    await wrapper.findByText('Edit');
    await wrapper.findByText(slogan);
  });
});
