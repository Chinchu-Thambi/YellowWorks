/* globals window */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import './src/util/styles/main.css';

import Cookies from 'js-cookie';
import { AuthProvider } from './src/components/Auth/AuthContext';

import refreshJwtTokenInterceptor from './src/util/refreshJwtTokenInterceptor';

import {
  theme, isStaff, isTesting,
} from './src/util';

refreshJwtTokenInterceptor();

export const onRouteUpdate = async () => {
  if (typeof window !== 'undefined') {
    const { analytics } = window;
    const clientId = Cookies.get('_ga') || null;
    const hubspotId = Cookies.get('hubspotutk') || null;
    const yellowStaff = await isStaff();

    // wrap the page invokation to delay by 100 ms because of the inherent problem of updating the title
    setTimeout(() => {
      analytics.page({
        clientId,
        hubspotId,
        isStaff: yellowStaff ? 'yes' : null,
        isTesting: isTesting() ? 'yes' : null,
      });
    }, 200);
  }
};

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    {element}
  </AuthProvider>
);

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element }) => (
  <>
    <Normalize />

    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </>
);
