/* globals describe, it, beforeEach, afterAll, expect */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import ServicingAreasForm from './ServicingAreasForm';
import { theme } from '../../util';

describe('ServicingAreasForm', () => {
  beforeEach(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it('does not throw with incomplete data', () => {
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <ServicingAreasForm />
        </ThemeProvider>,
      );
    }).not.toThrow();
  });
});
