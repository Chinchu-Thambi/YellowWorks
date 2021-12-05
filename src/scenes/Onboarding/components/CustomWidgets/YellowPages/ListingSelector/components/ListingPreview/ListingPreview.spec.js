/* eslint-disable react/jsx-props-no-spreading */
/* globals describe, it, expect */

import React from 'react';
import {
  render, cleanup, act,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from '../../../../../../../../util/theme';
import ListingPreview from './ListingPreview';

const props = {
  listingType: 'Free Profile',
  address: {
    administrativeArea: 'Wellington',
    country: 'New Zealand',
    floor: 'Level 3',
    locality: 'Wellington',
    postalCode: '6021',
    premise: 'Waterford Towers',
    streetAddress: 'Upoko Road',
    streetNumber: '11B',
    sublocality: 'Hataitai',
    subpremise: 'Siote 1',
  },
  name: 'Free Profile',
  primaryNumber: {
    areaCode: 9,
    number: 1234567,
  },
  email: 'Free Profile',
  url: 'example.com',
  onChange: () => {},
};

describe('ListingSelector', () => {
  it('renders correctly without throwing with minimal data', async () => {
    await act(async () => {
      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <ListingPreview {...props} />
          </ThemeProvider>,
        );
      }).not.toThrow();
    });

    cleanup();
  });
});
