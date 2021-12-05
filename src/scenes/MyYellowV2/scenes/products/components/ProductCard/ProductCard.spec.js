/* globals describe, it, expect */

import React from 'react';
import { render, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import ProductCard from './ProductCard';
import { theme } from '../../../../../../util';
import AuthContext from '../../../../../../components/Auth';

describe('ProductCard', () => {
  it('renders subscription card', async () => {
    const authState = {
      customerId: 1,
      jwtToken: 'token',
    };

    const streetNumber = '320';
    const streetAddress = 'Wilson Road';
    const locality = 'South Head';
    const administrativeArea = 'Auckland';

    const userConfiguration = JSON.stringify({
      location: {
        address: {
          streetNumber,
          streetAddress,
          locality,
          administrativeArea,
        },
      },
    });

    const subscription = {
      id: 'id',
      orderDetails: {
        status: 'NEW',
        product: {
          sku: 'YPPREMIUM',
        },
      },
      productDetails: {
        userConfiguration,
      },
    };

    let wrapper;

    await act(async () => {
      wrapper = render((
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={authState}>
            <ProductCard subscription={subscription} />
          </AuthContext.Provider>
        </ThemeProvider>
      ));
    });

    wrapper.getByText('Set up');

    const addressNodeContent = wrapper.container.querySelector('address').textContent;
    expect(addressNodeContent).toContain(streetNumber);
    expect(addressNodeContent).toContain(streetAddress);
    expect(addressNodeContent).toContain(locality);
    expect(addressNodeContent).toContain(administrativeArea);
  });
});
