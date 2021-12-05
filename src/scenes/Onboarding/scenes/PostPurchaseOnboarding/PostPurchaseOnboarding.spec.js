/* globals describe, it, expect, beforeEach */

import React from 'react';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { navigate } from 'gatsby';

import axios from 'axios';
import AuthContext from '../../../../components/Auth/AuthContext';
import { theme } from '../../../../util';

import PostPurchaseOnboarding from './PostPurchaseOnboarding';

describe('PostPurchaseOnboarding', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders without throwing', () => {
    expect(() => {
      render(<PostPurchaseOnboarding />);
    }).not.toThrow();
  });

  it('requires complete address before next step', async () => {
    const props = {
      subscriptionId: 'uuid',
      step: '2',
    };

    const authState = {
      jwtToken: 'jwtToken',
      customerId: 'customerId',
    };

    const addressObject = {};

    const userSchema = JSON.stringify({
      metadata: {
        sku: [{ value: 'YPPREMIUM' }],
      },
      properties: {
        location: {
          properties: {
            address: addressObject,
            hasMap: { type: 'boolean' },
          },
        },
      },
    });

    const userConfiguration = JSON.stringify({
      location: {
        address: {
        },
      },
    });

    axios.post.mockImplementationOnce((endpoint, params) => {
      if (params.query.includes('getSubscriptionById')) {
        return Promise.resolve({
          data: {
            data: {
              getSubscriptionById: {
                orderDetails: { userSchema },
                productDetails: { userConfiguration },
              },
            },
          },
        });
      }

      return Promise.reject(new Error('!'));
    });

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <PostPurchaseOnboarding
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    await waitFor(() => fireEvent.click(
      screen.getByText('Next'),
    ));

    expect(navigate.mock.calls).toHaveLength(0);
  });
});
