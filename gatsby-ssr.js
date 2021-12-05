import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { AuthProvider } from './src/components/Auth/AuthContext';

import { theme } from './src/util';

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
