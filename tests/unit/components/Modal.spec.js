/* globals describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import Modal from '../../../src/components/Modal';

const theme = {
  fonts: {
    mono: 'fontMono',
  },
  zIndex: {
    sticky: 1000,
  },
  breakpoints: [
    1,
  ],
  colors: {
    white: '',
  },
  palette: {
    base: [0],
    contrast: [0, 1, 2, 3, 4, 5, 6],
    brand: [0, 1, 2, 3, 4, 5, 6],
  },
  buttons: {
    primary: {
      borderRadius: '',
    },
  },
  fontSizes: [0, 1, 2, 3, 4, 5],
  space: [0, 1, 2, 3, 4, 5],
  shadows: {
    small: 0,
    large: 1,
  },
};

describe('Modal', () => {
  const modalChildren = (
    <div data-testid="child">I am a children</div>
  );

  it('renders without crashing', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Modal
          isVisible
          onDismiss={() => { }}
        >
          {modalChildren}
        </Modal>
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();

    wrapper.unmount();
  });

  it('has specific containers', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Modal
          title="testing title"
          isVisible
          onDismiss={() => { }}
        >
          {modalChildren}
        </Modal>
      </ThemeProvider>,
    );

    expect(wrapper.find('h2').text()).toBe('testing title');
    expect(wrapper.find('[data-testid="child"]').text()).toBe('I am a children');

    wrapper.unmount();
  });

  it('should have a close button', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Modal
          isVisible
          onDismiss={() => { }}
        >
          {modalChildren}
        </Modal>
      </ThemeProvider>,
    );

    expect(wrapper.find('button')).toBeTruthy();
    expect(wrapper.find('button').prop('alt')).toBe('close');

    wrapper.unmount();
  });

  it('should render without a title', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Modal
          isVisible
          onDismiss={() => { }}
        >
          {modalChildren}
        </Modal>
      </ThemeProvider>,
    );

    expect(wrapper.find('h2')).toHaveLength(0);

    wrapper.unmount();
  });

  it('should match snapshot', () => {
    const wrapper = mount(<ThemeProvider theme={theme}><Modal /></ThemeProvider>);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
