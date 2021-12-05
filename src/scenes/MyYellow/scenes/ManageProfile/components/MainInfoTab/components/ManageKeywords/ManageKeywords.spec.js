/* globals describe, it, expect, jest, beforeAll, afterAll */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, act, fireEvent } from '@testing-library/react';
import * as R from 'ramda';
import axios from 'axios';

import AuthContext from '../../../../../../../../components/Auth/AuthContext';
import { theme } from '../../../../../../../../util';

import ProductContext from '../../../../../../services/ProductContext';

import ManageKeywords from './ManageKeywords';

describe('ManageKeywords', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  afterAll(() => {
    jest.setTimeout(5000);
  });

  const keyword = 'mockkeyword';

  const productState = {
    formData: {
      categories: [{
        id: 1,
        keywords: [{
          keyword,
        }],
      }],
    },
    saveData: jest.fn().mockResolvedValue({ success: true }),
  };

  it('renders without throwing', () => {
    expect(async () => {
      render(
        <ThemeProvider theme={theme}>
          <ManageKeywords />
        </ThemeProvider>,
      );
    }).not.toThrow();
  });

  it('handles keywords', async () => {
    const wrapper = await render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ jwtToken: 'jwtToken' }}>
          <ProductContext.Provider value={productState}>
            <ManageKeywords />
          </ProductContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    await wrapper.findByText('Keywords');
    const editButton = await wrapper.findByText('Edit');
    await wrapper.findByText(keyword);

    axios.post.mockResolvedValueOnce(
      {
        data: {
          data: {
            category1: JSON.stringify(R.assocPath(
              ['properties', 'keywords', 'items', 'enum'],
              [{
                keyword: 'BRANZ',
                property: 'Associations',
              }],
            )({})),
          },
        },
      },
    );

    await act(async () => {
      fireEvent.click(editButton);
    });

    let removableKeywords = await wrapper.findAllByLabelText('Remove');
    expect(removableKeywords).toHaveLength(1);

    const selectInput = await wrapper.findByLabelText('Select the Products & Services associated with your business:');

    await act(async () => {
      fireEvent.change(selectInput, { target: { value: 'BR' } });
    });

    await act(async () => {
      fireEvent.click(await wrapper.findByText('Associations: BRANZ'));
    });

    removableKeywords = await wrapper.findAllByLabelText('Remove');
    expect(removableKeywords).toHaveLength(2);

    await act(async () => {
      fireEvent.click(removableKeywords[1]);
    });

    removableKeywords = await wrapper.findAllByLabelText('Remove');
    expect(removableKeywords).toHaveLength(1);

    await act(async () => {
      fireEvent.click(await wrapper.findByText('save'));
    });

    expect(productState.saveData.mock.calls[0]).toMatchSnapshot();
  });
});
