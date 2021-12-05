/* globals window, describe, it, expect, beforeEach */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import AuthContext from '../../components/Auth/AuthContext';

import { theme } from '../../util';

import Onboarding from './Onboarding';

describe('Onboarding', () => {
  beforeEach(() => {
    cleanup();
  });

  it('check if navigation on router works for search ads', async () => {
    const props = {
      subscriptionId: 'uuid',
      step: '1',
    };

    delete window.location;
    window.location = new URL('http://yellow.co.nz/search-ads/onboarding/1');

    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <Onboarding {...props} />
        </ThemeProvider>,
      );
    }).not.toThrow();
  });

  it('check if navigation on router works for yellow profile', async () => {
    const props = {
      subscriptionId: 'uuid',
      step: '1',
    };

    const authState = {
      jwtToken: 'jwtToken',
      customerId: 'customerId',
    };

    const addressObject = {};

    const userSchema = JSON.stringify({
      metadata: {
        sku: [{ value: 'YOLBASIC' }],
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

    delete global.window.location;
    global.window.location = new URL(`http://yellow.co.nz/my-yellow/onboarding/${props.subscriptionId}/1`);

    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={authState}>
            <Onboarding {...props} />
          </AuthContext.Provider>
        </ThemeProvider>,
      );
    }).not.toThrow();
  });
});
