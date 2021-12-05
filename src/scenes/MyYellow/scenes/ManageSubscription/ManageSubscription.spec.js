/* globals describe, it, jest, beforeAll */

import React from 'react';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import * as Gatsby from 'gatsby';

import AuthContext from '../../../../components/Auth';
import { theme } from '../../../../util';
import mockedProductPlatformProducts from '../../../../graphql/sampleData/mockedProductPlatformProducts.json';

import ManageSubscription from './ManageSubscription';

jest.mock('@apollo/react-hooks');

describe('ManageSubscription', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
  
  beforeAll(() => {
    useStaticQuery.mockReturnValue(mockedProductPlatformProducts);
  });

  it('renders without throwing', () => {
    render(<ManageSubscription />);
  });

  it('renders a welcome message', async () => {
    const authStore = { jwtToken: '123' };

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authStore}>
          <ManageSubscription />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    const welcomeMessage = 'You\'re now able to manage your Yellow Profile subscriptions from the customer portal.';
    await screen.findByText(welcomeMessage);
  });
});
