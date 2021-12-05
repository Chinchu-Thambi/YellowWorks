/* eslint-disable no-console */
/* globals describe, it, beforeEach, afterAll, expect, jest */

import React from 'react';
import {
  render, cleanup, fireEvent, act, getByRole,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../../util';

import ProductContext from '../../services/ProductContext';

import ManageProfile from './ManageProfile';

describe('ManageProfile', () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it('does not throw with incomplete data', () => {
    console.error = jest.fn();

    expect(() => {
      render(<ManageProfile />);
    }).not.toThrow();

    // this avoids proptype error log pollution but captures the content
    expect(console.error.mock.calls).toMatchSnapshot();

    // restore console.error
    console.error = originalConsole.error;
  });

  it('implements phone number editing functionality', async () => {
    // set initial state
    const telephone = { number: '32165132', areaCode: '7', countryCode: '64' };

    const productState = {
      formData: {
        location: {
          telephone,
        },
      },
      saveData: jest.fn().mockResolvedValue({ success: true }),
    };

    // render
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <ProductContext.Provider value={productState}>
          <ManageProfile subscriptionId="subscriptionId" />
        </ProductContext.Provider>
      </ThemeProvider>,
    );

    // select by phone number title
    const phoneNumberContainer = wrapper.getByText('Phone Numbers').parentElement.parentElement;
    const phoneNodeContent = phoneNumberContainer.textContent;

    // expect phone number content to be rendered on the screen
    expect(phoneNodeContent).toContain(telephone.areaCode);
    expect(phoneNodeContent).toContain(telephone.number);


    // edit functionality
    const editButton = getByRole(phoneNumberContainer, 'button', { name: 'Edit' });
    editButton.click();

    // define new phone values
    const newPhone = '1111111';
    const newAreaCode = '9';

    const phoneInput = wrapper.getByDisplayValue(telephone.number);
    const areaInput = wrapper.getByDisplayValue(`0${telephone.areaCode}`);

    // async because the second event depends on applied changes from the first.
    await fireEvent.change(phoneInput, { target: { value: newPhone } });
    await fireEvent.change(areaInput, { target: { value: newAreaCode } });

    // expect updated values on the input elements
    expect(phoneInput.value).toBe(newPhone);
    expect(areaInput.value).toBe(newAreaCode);

    // save functionality
    const saveButton = wrapper.getByRole('button', { name: 'Save' });

    await act(async () => {
      saveButton.click();
    });

    expect(productState.saveData.mock.calls[0][0]).toMatchSnapshot();
  });
});
