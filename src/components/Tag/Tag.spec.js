/* globals describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import theme from '../../util/theme';

import Tag from './Tag';

describe('Tag', () => {
  const modalChildren = (
    <div data-testid="child">I am a text</div>
  );

  it('renders without crashing', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Tag
          readonly
          onRemove={() => { }}
        >
          {modalChildren}
        </Tag>
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();

    wrapper.unmount();
  });

  it('should have specific containers', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Tag
          onRemove={() => { }}
        >
          {modalChildren}
        </Tag>
      </ThemeProvider>,
    );

    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').prop('aria-label')).toBe('Remove');
    expect(wrapper.find('button').prop('title')).toBe('Remove');
    expect(wrapper.find('button svg')).toHaveLength(1);
    expect(wrapper.find('[data-testid="child"]').text()).toBe('I am a text');

    wrapper.unmount();
  });

  it('should not render remove button', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Tag
          readonly
          onRemove={() => { }}
        >
          {modalChildren}
        </Tag>
      </ThemeProvider>,
    );

    expect(wrapper.find('button')).toHaveLength(0);

    wrapper.unmount();
  });

  it('should match snapshot', () => {
    const wrapper = mount(<ThemeProvider theme={theme}><Tag /></ThemeProvider>);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
