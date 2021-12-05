/* globals describe, it, expect, afterEach */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { theme } from '../../util';

import CheckCircle from './CheckCircle';

const props = {
  label: 'Label',
  value: 'Value',
  checked: true,
  onChange: () => {},
};

describe('CheckCircle', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <CheckCircle {...props} />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });


  it('check label content and image is checked', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CheckCircle {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('img').prop('alt')).toBe('checked');
    wrapper.unmount();
  });

  it('check image is checked and area click works', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CheckCircle {...props} />
      </ThemeProvider>,
    );
    expect(wrapper.find('img').prop('alt')).toBe('checked');
    wrapper.find('div').at(1).simulate('click');
    wrapper.unmount();
  });
});
