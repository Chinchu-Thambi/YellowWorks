/* eslint-disable react/prop-types */
/* globals jest, describe, it, expect, beforeAll, beforeEach, afterAll */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import * as Gatsby from 'gatsby';
import { useQuery } from '@apollo/react-hooks';

import AuthContext from '../../components/Auth';
import mockedContentfulProducts from './mockedContentfulProducts.json';

import usePurchase from './usePurchase';

jest.mock('@apollo/react-hooks');

describe('usePurchase', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

  const baseAuthState = {
    state: {
      modal: {},
    },
    showHideModal: () => { },
    displayLoginModal: () => { },
    customerId: 'customerId',
  };

  const product = {
    sku: 'YPPREMIUM',
    pricingPlan: {
      id: 123,
      amount: 100,
      interval: 'MONTH',
    },
  };

  beforeAll(() => {
    useStaticQuery.mockReturnValue(mockedContentfulProducts);
    useQuery.mockReturnValue({
      data: {},
    });
  });

  let wrapper;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <AuthContext.Provider value={baseAuthState}>
        {children}
      </AuthContext.Provider>
    );
    axios.post.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Successfully adds product', () => {
    const { result } = renderHook(usePurchase, wrapper);
    act(() => {
      result.current.initiatePurchase({
        product,
      });
    });

    expect(result.current.purchase).toStrictEqual({
      product,
      childProducts: [],
    });
  });

  it('Successfully removes product history', () => {
    const { result } = renderHook(usePurchase, wrapper);
    act(() => {
      result.current.resetPurchase();
    });

    expect(result.current.purchase).toBeUndefined();
  });

  it('Successfully sets discount', () => {
    const { result } = renderHook(usePurchase, wrapper);
    act(() => {
      result.current.setDiscount({ code: 'SAMPLE' });
    });

    expect(result.current.discount.code).toBe('SAMPLE');
  });
});
