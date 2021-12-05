/* globals describe, it */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import theme from '../../../../../../../../util/theme';
import LineChart from './LineChart';

describe('Line Chart', () => {
  it('should render properties correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LineChart
          title="Sample line chart title"
          xAxisLabel="Sample x axis label"
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 4 },
          ]}
        />
      </ThemeProvider>,
    );

    screen.getByRole('figure');
    screen.getByRole('heading', { name: 'Sample line chart title' });
  });
});
