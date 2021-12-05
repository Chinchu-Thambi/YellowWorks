import React from 'react';
import { render, act } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import Invoices from './Invoices';
import { theme } from '../../../../../../util';
import AuthContext from '../../../../../../components/Auth';

describe('Invoices', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('does not throw with incomplete data', () => {
    expect(() => {
      render(<Invoices />);
    }).not.toThrow();
  });

  it('displays invoices', async () => {
    const authValue = {
      jwtToken: 'jwtToken',
      customerId: 'customerId',
    };

    axios.post = jest.fn();
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          invoices: {
            edges: [
              {
                cursor: 'filename.pdf',
                node: {
                  contentUrl: {},
                  metadata: {
                    cents: 12345,
                    date: '2021-01-01',
                    status: 'PAID',
                  },
                },
              },
            ],
          },
        },
      },
    });

    let wrapper;

    await act(async () => {
      wrapper = render(
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={authValue}>
            <Invoices />
          </AuthContext.Provider>
        </ThemeProvider>,
      );
    });

    wrapper.getByText('Invoices');
    wrapper.getByText('2021-01-01');
    wrapper.getByText('PAID');
  });
});
