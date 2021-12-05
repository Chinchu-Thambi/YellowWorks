/* globals describe, it */

import React from 'react';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../util';

import MyYellow from './MyYellow';
import AuthContext from '../../components/Auth';

describe('MyYellow', () => {
  it('renders a welcome message', async () => {
    const authStore = { jwtToken: '123' };

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authStore}>
          <MyYellow />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    await screen.findByRole('heading', { name: 'Welcome to Yellow!' });
  });
});
