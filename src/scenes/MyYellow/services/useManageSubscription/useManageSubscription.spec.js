/* eslint-disable react/prop-types */
/* globals jest, describe, it, expect, beforeAll, beforeEach, afterAll */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import * as Gatsby from 'gatsby';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/react-hooks';

import ProductContext from '../ProductContext';

import useManageSubscription from './useManageSubscription';
import mockedProductPlatformProducts from '../../../../graphql/sampleData/mockedProductPlatformProducts.json';

jest.mock('@apollo/react-hooks');

describe('useManageSubscription', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

  const productContextValue = {
    subscriptionId: 'da1491b1-40bd-464e-a648-67f7642624c6',
    orderDetails: {
      product: {
        sku: 'YPPREMIUM',
        name: 'Yellow Premium Profile',
        configuration: '{"name":"Concept Flooring Limited","location":"Reporoa Area, Taupo Area, Turangi Area"}',
      },
      productOptions: [
        {
          name: 'Silver Category Boost',
          id: '8a0f33cf-d34a-4f06-bafb-297f2e629f3c',
          sku: 'CBSILVER',
          configuration: '{"category":"Floor Sanding Contractors","region":{"name":"Bay Of Plenty","id":10003}}',
        },
        {
          name: 'Silver Category Boost',
          id: 'f42eb2d0-bcf1-4d25-85d1-03371dfffd90',
          sku: 'CBSILVER',
          configuration: '{"category":"Flooring","region":{"name":"Bay Of Plenty","id":10003}}',
        },
      ],
    },
  };

  let wrapper;

  beforeAll(() => {
    useStaticQuery.mockReturnValue(mockedProductPlatformProducts);
    useQuery.mockReturnValue({
      data: {},
    });
  });

  beforeEach(() => {
    wrapper = ({ children }) => (
      <ProductContext.Provider
        value={productContextValue}
      >{children}
      </ProductContext.Provider>
    );
    axios.post.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('does not throw with incomplete data', () => {
    let result;
    expect(() => {
      const hookWrapper = renderHook(useManageSubscription);
      result = hookWrapper.result.current;
    }).not.toThrow();

    expect(result).toBeTruthy();
  });

  it('exposes a function to edit product', async () => {
    const hookWrapper = renderHook(useManageSubscription, { wrapper });

    const newSku = 'YPBASIC';

    axios.post.mockResolvedValue({
      originalSubscription: {
        product: {
          sku: 'YPPREMIUM',
          pricingPlan: 'YPPREMIUM_MONTHLY_2000',
        },
      },
    });

    await act(async () => {
      await hookWrapper.result.current.editProduct({
        newSku,
      });
    });

    expect(hookWrapper.result.current.newSubscription.product.sku).toBe(newSku);
  });
  it('exposes a function to edit options - upgrade existing option', async () => {
    const hookWrapper = renderHook(useManageSubscription, { wrapper });

    const newSku = 'CBGOLD';

    await act(async () => {
      await hookWrapper.result.current.editOption({
        id: productContextValue.orderDetails.productOptions[1].id,
        newSku,
        configuration: {
          category: 'Flooring',
          region: {
            name: 'Bay of Plenty',
            id: 10003,
          },
        },
      });
    });

    expect(hookWrapper.result.current.newSubscription.productOptions[0].sku).toBe(newSku);
  });

  it('exposes a function to edit options - downgrade existing option', async () => {
    const hookWrapper = renderHook(useManageSubscription, { wrapper });

    const newSku = 'CBBRONZE';

    await act(async () => {
      await hookWrapper.result.current.editOption({
        id: productContextValue.orderDetails.productOptions[1].id,
        newSku,
        configuration: {
          category: 'Flooring',
          region: {
            name: 'Bay of Plenty',
            id: 10003,
          },
        },
      });
    });

    expect(hookWrapper.result.current.newSubscription.productOptions[0].sku).toBe(newSku);
  });
  it('exposes a function to edit options - add new option', async () => {
    const hookWrapper = renderHook(useManageSubscription, { wrapper });

    const newSku = 'CBGOLD';

    await act(async () => {
      await hookWrapper.result.current.editOption({
        id: uuid(),
        newSku,
        configuration: {
          category: 'Flooring',
          region: {
            name: 'Bay of Plenty',
            id: 10003,
          },
        },
      });
    });

    expect(hookWrapper.result.current.newSubscription.productOptions[0].sku).toBe(newSku);
    expect(hookWrapper.result.current.newSubscription.productOptions.length).toBe(1);
  });
});
