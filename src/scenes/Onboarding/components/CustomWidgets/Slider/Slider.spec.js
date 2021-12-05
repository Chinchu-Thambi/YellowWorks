/* globals describe, it, expect, afterEach, beforeEach, jest */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../util/theme';

import Slider from './Slider';

const props = {
  min: 1,
  max: 1000,
  defaultValue: 50,
  tipFormatter: (value) => `${value} Test`,
  step: 1,
  marks: {},
  tipProps: {
    prefixCls: 'rc-slider-tooltip',
    visible: true,
  },
};

const customRender = (
) => render(
  <ThemeProvider theme={theme}>
    <Slider {...props} />
  </ThemeProvider>,
);
// eslint-disable-next-line no-console
const consoleError = console.error;

describe('Slider component', () => {
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
    const { getByText } = customRender(
      Slider,
    );

    expect(Slider.value === 50);
    expect(getByText('50 Test'));
  });
});
