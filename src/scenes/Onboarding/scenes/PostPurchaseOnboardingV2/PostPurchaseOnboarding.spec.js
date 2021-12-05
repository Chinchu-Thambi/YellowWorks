
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import BusinessContext from '../../../MyYellow/services/BusinessContext';
import { theme } from '../../../../util';
import businessStoreModel from '../../../MyYellow/services/BusinessContext/__mocks__/businessStoreModel';

import PostPurchaseOnboardingV2 from './PostPurchaseOnboardingV2';

describe('PostPurchaseOnboarding', () => {
  it('renders without throwing', () => {
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <BusinessContext.Provider value={businessStoreModel}>
            <PostPurchaseOnboardingV2 />
          </BusinessContext.Provider>,
        </ThemeProvider>,
      );
    }).not.toThrow();
  });
});
