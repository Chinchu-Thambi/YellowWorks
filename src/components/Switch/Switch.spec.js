/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../util/theme';

import Switch from './Switch';

describe('Switch', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Switch defaultValue="hasMap" label="hasMapLabel" />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it('renders with given props', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Switch name="name1" label="test1" checked />
      </ThemeProvider>,
    );

    expect(wrapper.getByTestId('SwitchOpt1').innerHTML).toBe('ON');
    expect(wrapper.getByTestId('SwitchOpt2').innerHTML).toBe('OFF');
    expect(wrapper.getByTestId('SwitchInput').type).toBe('checkbox');
    expect(wrapper.getByTestId('SwitchInput').checked).toBe(true);
    expect(wrapper.getByTestId('SwitchInput').name).toBe('name1');
    expect(wrapper.getByTestId('SwitchInput').value).toBe('name1');
  });

  it('renders with custom options', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Switch options={['YES', 'NO']} name="name1" label="test1" checked />
      </ThemeProvider>,
    );

    expect(wrapper.getByTestId('SwitchOpt1').innerHTML).toBe('YES');
    expect(wrapper.getByTestId('SwitchOpt2').innerHTML).toBe('NO');
  });
});
