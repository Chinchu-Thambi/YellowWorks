/* globals jest, describe, it, expect, afterAll */

import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { StaticQuery } from 'gatsby';
import axios from 'axios';

import { act, renderHook } from '@testing-library/react';
import AuthContext from '../../../../components/Auth/AuthContext';
import { PaymentContext } from '../../../../components/Payment/Context';
import theme from '../../../../util/theme';

import Checkout from './Checkout';

const baseAuthState = {
  state: {
    modal: {},
  },
  showHideModal: () => { },
  displayLoginModal: () => { },
};

const basePaymentState = {
  state: {},
  requestPaymentToken: () => { },
};

const customRender = ({
  authState, paymentState, Element,
}) => mount(
  <ThemeProvider theme={theme}>
    <AuthContext.Provider value={authState}>
      <PaymentContext.Provider value={paymentState}>
        <Element />
      </PaymentContext.Provider>
    </AuthContext.Provider>
  </ThemeProvider>,
);

describe('Checkout', () => {
  afterAll(() => {
    StaticQuery.mockReset();
  });

  it('renders without throwing', () => {
    let wrapper;
    expect(() => {
      wrapper = customRender({
        authState: baseAuthState,
        paymentState: basePaymentState,
        Element: Checkout,
      });
    }).not.toThrow();
    wrapper.unmount();
  });

  it('displays users existing payment details', async () => {
    const lastDigits = '4444';
  const expirationMonth = 11;
    const expirationYear = 2033;

    const getBillingAccountDetails = {
      billingAccount: { companyName: 'Heysper' },
      billingMethod: {
        __typename: 'SimpleBillingMethod',
        id: '2811694564',
        paymentMethods: [{
          card: {
            brand: 'MASTERCARD',
            expirationMonth,
            expirationYear,
            lastDigits,
          },
        }],
      },
    };

    axios.post.mockImplementationOnce((endpoint, { query }) => {
      if (query.includes('getBillingAccountDetails')) {
        return Promise.resolve({
          data: {
            data: { getBillingAccountDetails },
          },
        });
      }

      return Promise.reject();
    });

    let wrapper;

    await act(async () => {
      wrapper = customRender({
        authState: {
          ...baseAuthState,
          customerId: 'customerId',
        },
        paymentState: basePaymentState,
        Element: Checkout,
      });
    });

    expect(wrapper.text()).toContain(lastDigits);
    expect(wrapper.text()).toContain(expirationMonth);
    expect(wrapper.text()).toContain(expirationYear);

    wrapper.unmount();
  });

  it('displays complex customer add to account notice', async () => {
    const addToAccountTitleTag = '<h3>Add to account</h3>';
    const getBillingAccountDetails = {
      billingMethod: {
        __typename: 'ComplexBillingMethod',
      },
    };

    axios.post.mockImplementationOnce((endpoint, { query }) => {
      if (query.includes('getBillingAccountDetails')) {
        return Promise.resolve({
          data: {
            data: { getBillingAccountDetails },
          },
        });
      }

      return Promise.reject();
    });

    let wrapper;

    await act(async () => {
      wrapper = customRender({
        authState: {
          ...baseAuthState,
          customerId: 'customerId',
        },
        paymentState: basePaymentState,
        Element: Checkout,
      });
    });

    expect(wrapper.html()).toContain(addToAccountTitleTag);

    wrapper.unmount();
  });
});
