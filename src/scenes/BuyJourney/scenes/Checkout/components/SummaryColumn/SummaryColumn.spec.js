/* globals describe, it, expect, afterEach, beforeEach, jest */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import mockAxios from 'axios';

import AuthContext from '../../../../../../components/Auth/AuthContext';

import SummaryColumn from './SummaryColumn';

const theme = {
  fonts: {
    sans: 'sans',
  },
  colors: {
    brand: '',
  },
  palette: {
    base: [],
    brand: [],
    contrast: [],
  },
  zIndex: {
    sticky: '',
  },
  space: [0, 1, 2, 3, 4, 5, 6],
  fontSizes: [0, 1, 2, 3, 4, 5, 6],
  breakpoints: [0, 1, 2, 3, 4, 5, 6],
  fontWeight: [],
};

const authValue = {
  state: {
    user: {
      attributes: {
        given_name: '',
        family_name: '',
      },
      username: 'user',
    },
    status: 'AUTHENTICATED',
    modal: {},
  },
  jwtToken: 'some_token',
  LoginLink: () => null,
};

const customRender = (
  auth,
  Element,
) => render(
  <AuthContext.Provider value={auth}>
    <ThemeProvider theme={theme}>
      <Element />
    </ThemeProvider>
  </AuthContext.Provider>,
);

mockAxios.post.mockResolvedValue({
  data: {
    data: {
      getOrderProration: {
        sku: 1,
        startDate1stPeriod: '2019-08-15',
        endDate1stPeriod: '2019-08-31',
        startDateOngoing: '2019-09-01',
        tax: 0,
        amountBeforeTax: 0,
      },
    },
  },
});

// eslint-disable-next-line no-console
const consoleError = console.error;

describe('SummaryColumn component', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    cleanup();
    // clearAllMocks would ensure each mock count is reset
    jest.clearAllMocks();
    console.error = consoleError;
  });

  it('renders SummaryColumn', () => {
    const { getByText, getAllByText } = customRender(
      authValue,
      SummaryColumn,
    );

    expect(getByText('Purchase summary'));
    expect(getByText('Monthly payments'));
    expect(getAllByText('Total Billed Today')).toHaveLength(2);
  });
});
