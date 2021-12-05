/* eslint-disable react/jsx-props-no-spreading */
/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../util/theme';

import WebsiteInput from './WebsiteInput';

const props = {
  formData: 'http://test.com',
  onChange: () => {},
  required: false,
  title: 'Website Address Test',
};

describe('WebsiteInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <WebsiteInput />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it('renders with given props', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <WebsiteInput {...props} />
      </ThemeProvider>,
    );

    expect(wrapper.getByText(props.title));
    expect(wrapper.getByDisplayValue('http://').value).toBe('http://');
    expect(wrapper.getByPlaceholderText('example.com').value).toBe('test.com');
  });
});
