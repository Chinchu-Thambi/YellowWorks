/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { number } from '@storybook/addon-knobs';
import { Flex } from 'rebass';
import * as R from 'ramda';

import { theme } from '../../../../../../../../util';
import CardedSortableTable from './CardedSortableTable';

const tableData = R.range(0, 20).map((i) => ({
  name: `Profile name ${i}`,
  address: `${i} Sample St, Sample City, 1234.`,
  visitCount: Math.round(100.0 * Math.random()),
  interactionCount: Math.round(100.0 * Math.random()),
}));

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

export const Table = () => {
  const heightInPixels = number('Table Height (pixels)', 500);

  return (
    <ThemeProvider theme={theme}>
      <Flex p={3} m={3} flexDirection={['column', 'column', 'row']} overflowY="auto" height={heightInPixels}>
        <CardedSortableTable title="Table title" data={tableData} columns={columns} initialSortBy="visitCount" />
      </Flex>
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Data/Table',
};
