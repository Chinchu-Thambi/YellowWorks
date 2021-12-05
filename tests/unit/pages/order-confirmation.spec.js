/* globals describe, it, expect, beforeAll, afterAll, jest */

import { render } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../../../src/components/Auth/AuthContext';

import Confirmation from '../../../src/scenes/BuyJourney/scenes/OrderConfirmation';
import theme from '../../../src/util/theme';

let dateNowSpy;

describe('buttons', () => {
  beforeAll(() => {
    // Lock Date to 2019-08-16
    dateNowSpy = jest.spyOn(Date.prototype, 'toLocaleDateString').mockImplementation(() => '16/08/2019');
  });

  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
  });

  it('Renders Confirmation', () => {
    const wrapper = render(
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Confirmation />
        </ThemeProvider>
      </AuthProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
