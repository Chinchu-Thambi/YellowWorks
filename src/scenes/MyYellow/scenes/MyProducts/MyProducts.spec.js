/* globals describe, it, expect */

import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';

import AuthContext from '../../../../components/Auth';

import MyProducts from './MyProducts';

describe('MyProducts', () => {
  it('does not throw with incomplete data', () => {
    expect(() => {
      render(<MyProducts />);
    }).not.toThrow();
  });

  it('renders message for empty products', async () => {
    const authState = {
      customerId: 1,
      jwtToken: 'token',
    };
    const subscriptions = [];

    await axios.post.mockImplementationOnce((endpoint, { query }) => {
      if (query.includes('subscriptions')) {
        return Promise.resolve({
          data: {
            data: {
              subscriptions,
            },
          },
        });
      }

      return Promise.reject();
    });

    let wrapper;

    await act(async () => {
      wrapper = render((
        <AuthContext.Provider value={authState}>
          <MyProducts />
        </AuthContext.Provider>
      ));
    });

    wrapper.getByText('You don’t have any products yet');
    expect(wrapper.getByText('Browse').href).toContain('/our-products/');
  });

  it('renders message for customer without id', async () => {
    const authState = {
      jwtToken: 'token',
    };
    const subscriptions = [];

    await axios.post.mockImplementationOnce((endpoint, { query }) => {
      if (query.includes('subscriptions')) {
        return Promise.resolve({
          data: {
            data: {
              subscriptions,
            },
          },
        });
      }

      return Promise.reject();
    });

    let wrapper;

    await act(async () => {
      wrapper = render((
        <AuthContext.Provider value={authState}>
          <MyProducts />
        </AuthContext.Provider>
      ));
    });

    wrapper.getByText('You don’t have any products yet');
    expect(wrapper.getByText('Browse').href).toContain('/our-products/');
  });
});
