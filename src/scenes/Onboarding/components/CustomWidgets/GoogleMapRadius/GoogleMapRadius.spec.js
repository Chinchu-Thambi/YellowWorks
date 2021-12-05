/* eslint-disable react/jsx-props-no-spreading */
/* globals describe, it, expect, afterEach, beforeEach, jest */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../util/theme';

import GoogleMapRadius from './GoogleMapRadius';

const props = {
  formData: {},
};

const customRender = (
) => render(
  <ThemeProvider theme={theme}>
    <GoogleMapRadius {...props} />
  </ThemeProvider>,
);
// eslint-disable-next-line no-console
const consoleError = console.error;

describe('Google Map Radius component', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    cleanup();
    // clearAllMocks would ensure each mock count is reset
    jest.clearAllMocks();
    console.error = consoleError;
  });

  it('renders Google Map Radius', () => {
    const { getByText } = customRender(
      GoogleMapRadius,
    );

    expect(getByText('20 km'));
  });
});
