/* globals describe, it */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import { theme } from '../../../../../../../util';
import HeroMetric from './HeroMetric';

describe('Hero Metric', () => {
  it('should render properties correctly - all props provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <HeroMetric label="sample label text" sublabel="sample sublabel text" value={1234} change={20} />
      </ThemeProvider>,
    );

    screen.getByRole('heading', { name: 'sample label text' });
    screen.getByText('sample sublabel text');
    screen.getByText('1,234');
    screen.getByText('20');
  });

  it('should render properties correctly - only required props provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <HeroMetric label="sample label text 2" value={4321} />
      </ThemeProvider>,
    );

    screen.getByText('sample label text 2');
    screen.getByText('4,321');
  });
});
