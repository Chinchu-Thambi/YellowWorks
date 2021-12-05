/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text } from '@storybook/addon-knobs/react';

import LineChart from './LineChart';
import { theme } from '../../../../../../../../util';
import { formatDateToMonthYear } from '../../../../../../../../util/formatting';

const randomContinuousData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data[i] = {
      x: new Date(2019, 12 - i, 1).getTime(),
      y: Math.random() * 200.0 + 900,
    };
  }
  return data;
};

export const LineCharts = () => {
  const chartTitle = text('Chart Title', 'Search appearance trends');
  const xAxisLabel = text('X-axis label', 'Time');
  const yDataSeriesName = text('Y-series name', 'Search appearances');

  return (
    <ThemeProvider theme={theme}>
      <LineChart
        title={chartTitle}
        xAxisLabel={xAxisLabel}
        yDataSeriesName={yDataSeriesName}
        data={randomContinuousData()}
        formatX={(timestamp) => formatDateToMonthYear(new Date(timestamp))}
        formatY={(val) => Number(val.toFixed(0)).toLocaleString()}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Data/Charting',
};
