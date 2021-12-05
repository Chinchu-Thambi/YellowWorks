/* globals describe, it, expect, afterEach, beforeEach, jest */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../util/theme';

import EstimatedPerformance from './EstimatedPerformance';

const props = {
  views: 200,
  leads: 300,
  clicks: 400,
};

const customRender = (
) => render(
  <ThemeProvider theme={theme}>
    <EstimatedPerformance {...props} />
  </ThemeProvider>,
);
// eslint-disable-next-line no-console
const consoleError = console.error;

describe('EstimatedPerformance component', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    cleanup();
    // clearAllMocks would ensure each mock count is reset
    jest.clearAllMocks();
    console.error = consoleError;
  });

  it('renders EstimatedPerformance', () => {
    const { getByText } = customRender(
      EstimatedPerformance,
    );

    expect(getByText('Views per month'));
    expect(getByText('Leads per month'));
    expect(getByText('Clicks per month'));
    expect(getByText(`${props.clicks}`));
    expect(getByText(`${props.views}`));
    expect(getByText(`${props.leads}`));
  });
});
