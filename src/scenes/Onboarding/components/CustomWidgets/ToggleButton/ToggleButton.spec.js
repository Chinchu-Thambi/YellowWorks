/* globals describe, it, expect, afterEach, beforeEach, jest */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../util/theme';

import ToggleButton from './ToggleButton';

const properties = {
  active: 'Option 1',
  options: [
    {
      label: 'Option 1',
      value: 'Option 1',
    },
    {
      label: 'Option 2',
      value: 'Option 2',
    },
  ],
  onClick: () => null,
  disabled: false,
};

const customRender = (props) => render(
  <ThemeProvider theme={theme}>
    <ToggleButton {...props} />
  </ThemeProvider>,
);
// eslint-disable-next-line no-console
const consoleError = console.error;

describe('Toggle Button component', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    cleanup();
    // clearAllMocks would ensure each mock count is reset
    jest.clearAllMocks();
    console.error = consoleError;
  });

  it('renders Slider', () => {
    const { getByText } = customRender(properties);

    expect(ToggleButton.value === 'Option 1');
    expect(getByText('Option 1'));
    expect(getByText('Option 2'));
  });
});
