/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../../../../util';
import HorizontalBarChart from './HorizontalBarChart';

describe('Horizontal Bar Chart', () => {
  it('should render properties correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <HorizontalBarChart
          title="Sample chart title"
          xAxisLabel="Sample x axis label"
          data={[
            { label: 'label 1', value: 1 },
            { label: 'label 2', value: 2 },
          ]}
        />
      </ThemeProvider>,
    );

    screen.getByRole('figure');
    screen.getByRole('heading', { name: 'Sample chart title' });
  });
});
