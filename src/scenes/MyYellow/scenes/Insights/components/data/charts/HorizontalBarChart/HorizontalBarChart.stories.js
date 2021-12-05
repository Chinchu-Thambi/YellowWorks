/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text } from '@storybook/addon-knobs/react';

import { theme } from '../../../../../../../../util';
import HorizontalBarChart from './HorizontalBarChart';

const randomDiscreteData = () => ['Technology & Communication', 'Name or keyword', 'Cellular phones', 'Telecommunications'].map((el) => ({
  label: el,
  value: Math.round(Math.random() * 100.0),
}));

export const HorizontalBarCharts = () => {
  const chartTitle = text('Chart Title', 'Title goes here');
  const xAxisLabel = text('X-axis label', 'X-axis label here');

  return (
    <ThemeProvider theme={theme}>
      <HorizontalBarChart title={chartTitle} xAxisLabel={xAxisLabel} data={randomDiscreteData()} />
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Data/Charting',
};
