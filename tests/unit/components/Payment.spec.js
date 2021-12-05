/* globals describe, it, expect, afterEach, jest */

import React from 'react';

import { ThemeProvider } from 'styled-components';
import {
  render, cleanup, waitForElement, fireEvent,
} from '@testing-library/react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import mockAxios from 'axios';

import { PaymentContext, PaymentForm, PaymentProvider } from '../../../src/components/Payment';
import AuthContext from '../../../src/components/Auth/AuthContext';

const theme = {
  fonts: {
    sans: 'sans',
  },
  palette: {
    contrast: [],
    base: [],
  },
  colors: {
    primary: 'primary',
  },
  fontSizes: [0, 1, 2, 3, 4, 5],
};

// mock console.error until React 16.9+ can test it properly.
console.error = jest.fn();

describe.skip('Payment', () => {
  afterEach(() => {
    cleanup();
  });

  it('exports a PaymentContext', () => {
    expect(PaymentContext).not.toBe(undefined);
  });

  const jwtToken = '123';

  it('PaymentProvider initializes with Context error', async () => {
    mockAxios.post.mockResolvedValue({
      data: { errors: 'Some error' },
    });
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ jwtToken }}>
        <StripeProvider stripe={null}>
          <Elements>
            <PaymentProvider>
              <ThemeProvider theme={theme}>
                <PaymentContext.Consumer>
                  {(props) => {
                    expect(props).toHaveProperty('state');
                    return props.state.error
                      ? (
                        <p data-testid="error">
                          {props.state.error}
                        </p>
                      )
                      : <p>...Loading</p>;
                  }}
                </PaymentContext.Consumer>
              </ThemeProvider>
            </PaymentProvider>
          </Elements>
        </StripeProvider>
      </AuthContext.Provider>,
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(getByText(/...Loading/i).textContent).toBe('...Loading');

    const resolvedEl = await waitForElement(() => getByTestId('error'));
    expect((resolvedEl).textContent).toBe('Some error');
  });

  it('PaymentProvider initializes with client secret', async () => {
    mockAxios.post.mockResolvedValue({
      data: { data: { createPaymentRegistrationToken: { client_secret: '321' } } },
    });
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ jwtToken }}>
        <StripeProvider stripe={null}>
          <Elements>
            <PaymentProvider>
              <ThemeProvider theme={theme}>
                <PaymentContext.Consumer>
                  {(props) => {
                    expect(props).toHaveProperty('state');
                    expect(props).toHaveProperty('handleCardSetup');
                    expect(props).toHaveProperty('cardholder');
                    return props.state.clientSecret
                      ? (
                        <p data-testid="secret">
                          {props.state.clientSecret}
                        </p>
                      )
                      : <p>...Loading</p>;
                  }}
                </PaymentContext.Consumer>
              </ThemeProvider>
            </PaymentProvider>
          </Elements>
        </StripeProvider>
      </AuthContext.Provider>,
    );
    expect(getByText(/...Loading/i).textContent).toBe('...Loading');

    const resolvedEl = await waitForElement(() => getByTestId('secret'));
    expect((resolvedEl).textContent).toBe('321');
  });

  it('PaymentProvider initializes with payment method', async () => {
    mockAxios.post.mockResolvedValue({
      data: { data: { createPaymentRegistrationToken: { payment_method: 'pm_001' } } },
    });
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ jwtToken }}>
        <StripeProvider stripe={null}>
          <Elements>
            <PaymentProvider>
              <ThemeProvider theme={theme}>
                <PaymentContext.Consumer>
                  {(props) => {
                    expect(props).toHaveProperty('state');
                    expect(props).toHaveProperty('handleCardSetup');
                    expect(props).toHaveProperty('cardholder');
                    return props.state.paymentMethod
                      ? (
                        <p data-testid="payment">
                          {props.state.paymentMethod}
                        </p>
                      )
                      : <p>...Loading</p>;
                  }}
                </PaymentContext.Consumer>
              </ThemeProvider>
            </PaymentProvider>
          </Elements>
        </StripeProvider>
      </AuthContext.Provider>,
    );
    expect(getByText(/...Loading/i).textContent).toBe('...Loading');

    const resolvedEl = await waitForElement(() => getByTestId('payment'));
    expect((resolvedEl).textContent).toBe('pm_001');
  });

  it('PaymentForm renders and can change name', () => {
    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={{ jwtToken }}>
        <StripeProvider stripe={null}>
          <Elements>
            <PaymentProvider>
              <ThemeProvider theme={theme}>
                <PaymentForm />
              </ThemeProvider>
            </PaymentProvider>
          </Elements>
        </StripeProvider>
      </AuthContext.Provider>,
    );
    const nameInput = getByPlaceholderText('Name on Card *');
    fireEvent.change(nameInput, { target: { value: 'Some Name' } });
  });
});
