/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../../../../util/theme';

import PremiumModalPrompt from './PremiumModalPrompt';

describe('PremiumModalPrompt', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <PremiumModalPrompt subscriptionId="12345" />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });
});
