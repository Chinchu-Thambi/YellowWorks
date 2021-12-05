/* globals describe, it, expect */

import React from 'react';
import { render, mount } from 'enzyme';

import Button from '../../../src/components/Button';

describe('buttons', () => {
  const theme = {
    colors: {
      primary: 'primaryColor',
      brand: 'brandColor',
      white: 'white',
    },
    palette: {
      base: [''],
      contrast: [],
    },
    fonts: {
      sans: 'fontSans',
    },
    fontSizes: [0, 1, 2, 3, 4, 5, 6],
  };

  it('exports a primary button', () => {
    const wrapper = render(<Button theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('exports a secondary button', () => {
    const wrapper = render(<Button variant="secondary" theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Button', () => {
    it('renders a <button> by default', () => {
      const wrapper = mount(<Button>Hello</Button>);
      expect(wrapper.text()).toBe('Hello');
      expect(wrapper.find('button')).toBeTruthy();

      wrapper.unmount();
    });

    it('renders a normal link <a> tag when passing "href" prop', () => {
      const wrapper = mount(<Button href="http://google.com">Link</Button>);
      expect(wrapper.text()).toBe('Link');
      expect(wrapper.find('a')).toBeTruthy();
      expect(wrapper.find('a').prop('href')).toBe('http://google.com');

      wrapper.unmount();
    });

    it('renders a Gatsby link when passing "to" prop', () => {
      const wrapper = mount(<Button to="/">Gatsby</Button>);
      expect(wrapper.text()).toBe('Gatsby');
      expect(wrapper.find('a')).toBeTruthy();
      expect(wrapper.find('a').prop('href')).toBe('/');

      wrapper.unmount();
    });

    it('renders with given extra props', () => {
      const wrapper = mount(
        <Button
          variant="primary"
          href="#"
          target="_blank"
          disabled
        >Link with props
        </Button>,
      );
      expect(wrapper.find('a')).toBeTruthy();
      expect(wrapper.find('a').prop('href')).toBe('#');
      expect(wrapper.find('a').prop('target')).toBe('_blank');

      wrapper.unmount();
    });
  });
});
