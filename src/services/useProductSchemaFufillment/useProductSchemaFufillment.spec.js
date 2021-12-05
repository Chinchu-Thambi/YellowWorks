/* eslint-disable react/prop-types */
/* globals jest, describe, it, expect, beforeAll, afterAll */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';
import AuthContext from '../../components/Auth';

import useProductSchemaFufillment from './useProductSchemaFufillment';

jest.mock('@apollo/react-hooks');

describe('useProductSchemaFufillment', () => {
  const authValue = {
    jwtToken: 'jwtToken',
    customerId: 'customerId',
  };

  beforeAll(() => {
    useQuery.mockReturnValue({
      data: {},
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('does not throw with incomplete data', () => {
    let result;
    expect(() => {
      const hookWrapper = renderHook(useProductSchemaFufillment);
      result = hookWrapper.result.current;
    }).not.toThrow();

    expect(result).toBeTruthy();
  });

  it('does not fail on submission of an incomplete schema', async () => {
    const basicWrapper = ({ children }) => (
      <AuthContext.Provider value={authValue}>
        {children}
      </AuthContext.Provider>
    );

    const hookWrapper = renderHook(useProductSchemaFufillment, { wrapper: basicWrapper });

    await act(async () => {
      await hookWrapper.result.current;
    });

    expect(axios.post.mockResolvedValue({
      data: {
        updateConfiguration: '{}',
      },
    }));
  });
});
