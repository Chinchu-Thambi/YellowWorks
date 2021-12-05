/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../../../../../util/theme';
import CardedSortableTable from './CardedSortableTable';

describe('Horizontal Bar Chart', () => {
  it('should render properties correctly', () => {
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

    const sampleData = [
      {
        name: 'Profile 1',
        address: 'Location 1',
        visitCount: 100,
        interactionCount: 200,
      },
      {
        name: 'Profile 2',
        address: 'Location 2',
        visitCount: 102,
        interactionCount: 202,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <CardedSortableTable
          title="Sample table title"
          data={sampleData}
          columns={columns}
          initialSortBy="visitCount"
        />
      </ThemeProvider>,
    );

    // overall roles
    screen.getByRole('table');
    screen.getByRole('heading', { name: 'Sample table title' });

    // column headings
    screen.getByText('Trading name');
    screen.getByText('Listing Address');
    screen.getByText('Visits');
    screen.getByText('Interactions');

    // cell values
    screen.getByText('Profile 1');
    screen.getByText('Profile 2');
    screen.getByText('Location 1');
    screen.getByText('Location 2');
    screen.getByText('100');
    screen.getByText('200');
    screen.getByText('102');
    screen.getByText('202');
  });
});
