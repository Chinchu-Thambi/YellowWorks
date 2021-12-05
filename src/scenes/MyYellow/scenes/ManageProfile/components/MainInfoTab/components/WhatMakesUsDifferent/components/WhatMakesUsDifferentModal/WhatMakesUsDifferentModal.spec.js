/* globals describe, it, expect, jest, beforeAll, afterAll */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, act, fireEvent } from '@testing-library/react';

import AuthContext from '../../../../../../../../../../components/Auth/AuthContext';
import { theme } from '../../../../../../../../../../util';

import ProductContext from '../../../../../../../../services/ProductContext';

import WhatMakesUsDifferentModal from './WhatMakesUsDifferentModal';

describe('WhatMakesUsDifferentModal', () => {
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
    orderDetails: {
      product: {
        sku: 'YPPREMIUM',
      },
      userSchema: {
        metadata: {
          sku: [{ value: 'YPPREMIUM' }],
        },
      },
    },
    saveData: jest.fn().mockResolvedValue({ success: true }),
  };

  it('renders without throwing', () => {
    expect(async () => {
      render(
        <ThemeProvider theme={theme}>
          <WhatMakesUsDifferentModal />
        </ThemeProvider>,
      );
    }).not.toThrow();
  });

  it('handles what makes us different input and modal', async () => {
    const wrapper = await render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ jwtToken: 'jwtToken' }}>
          <ProductContext.Provider value={productState}>
            <WhatMakesUsDifferentModal />
          </ProductContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    const formInput = await wrapper.findByPlaceholderText('What makes your business different...');

    await act(async () => {
      fireEvent.change(formInput, { target: { value: 'Level unlocked' } });
    });

    await act(async () => {
      fireEvent.click(await wrapper.findByText('save'));
    });

    expect(productState.saveData.mock.calls[0]).toMatchSnapshot();
  });
});
