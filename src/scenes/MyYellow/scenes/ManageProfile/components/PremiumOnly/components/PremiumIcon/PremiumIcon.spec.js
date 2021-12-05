/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../../../../util/theme';

import PremiumIcon from './PremiumIcon';

describe('PremiumIcon', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <PremiumIcon />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it('renders the text when hovered', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <PremiumIcon />
      </ThemeProvider>,
    );

    fireEvent.mouseOver(wrapper.getByText('This field is available on Premium Profiles only.'));
  });
});
