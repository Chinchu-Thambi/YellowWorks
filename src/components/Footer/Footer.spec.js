/* globals describe, it, expect, jest */

import React from 'react';
import { render } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import $ from 'cheerio';

import { theme } from '../../util';

import Footer from '.';

jest.mock('react-shielded', () => ({ __esModule: true, default: () => null }));

describe('Footer', () => {
  it('renders the correct list of links', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>,
    );

    const links = wrapper
      .find('a')
      .map((index, link) => ({
        href: $(link).attr('href'),
        html: $(link).text(),
      }))
      .toArray();

    expect(links).toMatchSnapshot();
  });

  it('hides business categories based on a prop', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Footer hideCategories />
      </ThemeProvider>,
    );

    const categoriesHeading = wrapper.find('h2');

    expect(categoriesHeading).toHaveLength(0);
  });
});
