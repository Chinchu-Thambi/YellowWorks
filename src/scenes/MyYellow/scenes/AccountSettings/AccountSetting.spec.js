/* globals describe, it, afterAll, expect, jest */

import React from 'react';
import { render, act } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import AccountSettings from './AccountSettings';
import AuthContext from '../../../../components/Auth';
import { theme } from '../../../../util';

describe('AccountSettings', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('does not throw with incomplete data', () => {
    expect(() => {
      render(<AccountSettings subscriptionId="subscriptionId" />);
    }).not.toThrow();
  });

  it('displays payment details', async () => {
    const authValue = {
      jwtToken: 'jwtToken',
      customerId: 'customerId',
    };

    const companyName = 'companyName';
    const companyEmail = 'companyEmail';

    axios.post = jest.fn();
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          getBillingAccountDetails: {
            billingAccount: {
              companyName,
              companyEmail,
            },
            billingMethod: {
              __typename: '',
              paymentMethods: [
                {
                  card: {
                    brand: 'VISA',
                    lastDigits: '1234',
                    expirationMonth: 15,
                    expirationYear: 12,
                  },
                },
              ],
            },
          },
        },
      },
    });

    let wrapper;

    await act(async () => {
      wrapper = render(
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={authValue}>
            <AccountSettings subscriptionId="subscriptionId" />
          </AuthContext.Provider>
        </ThemeProvider>,
      );
    });

    wrapper.getByText('Payment details');
    wrapper.getByText(companyName);
    wrapper.getByText(companyEmail);
    wrapper.getByText('XXXX-XXXX-XXXX-1234');
    wrapper.getByText('Exp 15-12');
  });
});
