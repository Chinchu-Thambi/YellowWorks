import React from 'react';
import { ThemeProvider } from 'styled-components';
import SmHeader from './SmHeader';
import LgHeader from './LgHeader';
import { AuthProvider } from '../Auth/AuthContext';
import { theme } from '../../util';

export const Header = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <SmHeader />
      <LgHeader />
    </ThemeProvider>
  </AuthProvider>
);

export default {
  title: 'Components',
};
