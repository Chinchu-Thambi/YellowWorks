/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../../../../../../../../../../util';

import HonorificSelector from './HonorificSelector';

const props = {
  onChange: () => {},
  name: 'Test',
  options: ['ONE', 'TWO', 'THREE'],
  currentValue: 'FOUR',
};

describe('HonorificSelector', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <HonorificSelector {...props} />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
    expect(wrapper.getByTestId('customInput').value).toBe('FOUR');
  });
});
