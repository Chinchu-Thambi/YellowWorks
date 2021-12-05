import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Flex } from 'rebass';
import * as R from 'ramda';

import theme from '../../../../../../util/theme';
import { formatDateToMonthYear } from '../../../../../../util/formatting';
import ActionableNotice from '../ActionableNotice';
import CardedSortableTable from './tables/CardedSortableTable';
import HorizontalBarChart from './charts/HorizontalBarChart';
import LineChart from './charts/LineChart';
import HeroMetric from './HeroMetric';

const randomDiscreteData = () => ['Technology & Communication', 'Name or keyword', 'Cellular phones', 'Telecommunications'].map((el) => ({
  label: el,
  value: Math.round(Math.random() * 100.0),
}));

const randomContinuousData = () => R.map((i) => ({
  x: new Date(2019, 12 - i, 1).getTime(),
  y: Math.random() * 200.0 + 900,
}))(R.range(0, 10));

const columns = [
  {
    label: 'Trading name',
    accessorKey: 'name',
  },
  {
    label: 'Listing Address',
    accessorKey: 'address',
  },
  {
    label: 'Visits',
    accessorKey: 'visitCount',
  },
  {
    label: 'Interactions',
    accessorKey: 'interactionCount',
  },
];

const tableData = () => R.map((i) => ({
  name: `Profile ${i}`,
  address: `Location lorem ipsum dolor sit amet, consectetur adipiscing sed eiusmod ${i}`,
  visitCount: Math.round(100.0 * Math.random()),
  interactionCount: Math.round(100.0 * Math.random()),
}))(R.range(0, 20));

export const CombinedAnalyticsWidgetsScene = () => (
  <ThemeProvider theme={theme}>
    <Flex flexDirection="column" backgroundColor={theme.palette.contrast[5]}>
      <Flex p={3} flexDirection={['column', 'row']} sx={{ gridGap: 3 }}>
        <HeroMetric label="The label" value={1024} changeAsFraction={0.12} />
        <HeroMetric label="The label" value={1024} changeAsFraction={0.12} />
        <HeroMetric label="The label" value={1024} changeAsFraction={0.12} />
      </Flex>
      <Flex
        m={3}
        flexDirection={['column', 'column', 'row']}
        overflowY="auto"
        sx={{
          gridGap: 3,
        }}
      >
        <Flex flex={1}>
          <HorizontalBarChart
            title="Performance by Category"
            xAxisLabel="Search appearances"
            data={randomDiscreteData()}
          />
        </Flex>

        <Flex flex={1}>
          <HorizontalBarChart
            title="Performance by Category"
            xAxisLabel="Search appearances"
            data={randomDiscreteData()}
          />
        </Flex>
      </Flex>
      <Flex
        p={3}
        flexDirection={['column', 'column', 'row']}
        overflowY="auto"
        height={500}
        sx={{
          gridGap: 3,
        }}
      >
        <CardedSortableTable title="Chart title" data={tableData()} columns={columns} initialSortBy="visitCount" />
        <CardedSortableTable title="Chart title" data={tableData()} columns={columns} initialSortBy="visitCount" />
      </Flex>
      <Flex
        flexDirection={['column', 'column', 'row']}
        m={3}
        sx={{
          gridGap: 3,
        }}
      >
        <LineChart
          title="Search appearances trends"
          xAxisLabel="X axis label"
          yDataSeriesName="Search appearances"
          data={randomContinuousData()}
          formatX={(timestamp) => formatDateToMonthYear(new Date(timestamp))}
          formatY={(val) => Number(val.toFixed(0)).toLocaleString()}
        />
        <LineChart
          title="Profile interaction trends"
          xAxisLabel="X axis label"
          yDataSeriesName="Profile interactions"
          data={randomContinuousData()}
          formatX={(timestamp) => formatDateToMonthYear(new Date(timestamp))}
          formatY={(val) => Number(val.toFixed(0)).toLocaleString()}
        />
      </Flex>
      <Flex
        flexDirection={['column', 'column', 'row']}
        m={3}
        sx={{
          gridGap: 3,
        }}
      >
        <ActionableNotice title="The title" subtitle="The subtitle goes here" button={{ text: 'Click me' }} />
      </Flex>
    </Flex>
  </ThemeProvider>
);

export default {
  title: 'Scenes/Data',
};
