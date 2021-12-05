/* globals describe, it, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import InsightsScene, { fetchLast, fetchSecondToLast } from './InsightsSceneV2';

describe('Insights Scene', () => {
  const data = {
    customerId: '4073241495',
    startDate: 1597198248,
    endDate: null,
    searchAppearances: [
      { x: 115.0, y: 407 },
      { x: 497.0, y: 143 },
      { x: 498.0, y: 400 },
      { x: 145.0, y: 156 },
      { x: 472.0, y: 82 },
      { x: 348.0, y: 413 },
      { x: 47.0, y: 94 },
      { x: 326.0, y: 462 },
      { x: 81.0, y: 296 },
    ],
    profileInteractions: [
      { x: 108.0, y: 180 },
      { x: 74.0, y: 416 },
      { x: 235.0, y: 205 },
      { x: 243.0, y: 432 },
      { x: 282.0, y: 443 },
      { x: 77.0, y: 358 },
      { x: 338.0, y: 338 },
      { x: 480.0, y: 419 },
      { x: 217.0, y: 357 },
    ],
    profileVisits: [
      { x: 20.0, y: 407 },
      { x: 298.0, y: 333 },
      { x: 246.0, y: 174 },
      { x: 212.0, y: 48 },
      { x: 277.0, y: 253 },
      { x: 279.0, y: 210 },
      { x: 12.0, y: 308 },
      { x: 86.0, y: 309 },
      { x: 139.0, y: 85 },
    ],
    performanceByCategory: [
      { label: 'Name or keyword', value: 277 },
      { label: 'Cellular Phones', value: 160 },
      { label: 'Telecommunications', value: 96 },
      { label: 'Technology and Communications', value: 468 },
    ],
    interactions: [
      { label: 'Email Clicks', value: 80 },
      { label: 'Get Directions Clicks', value: 414 },
      { label: 'Phone Clicks', value: 350 },
      { label: 'Total Reviews', value: 102 },
      { label: 'Website Clicks', value: 44 },
    ],
    lifetimeReviewsCount: 134,
    lifetimeAverageReviewRating: 4.7,
    profiles: [
      {
        name: 'Spark Broadway, Palmerston North',
        address: '251 Broadway Ave, Palmerston, 4414',
        visits: 361,
        interactions: 168,
      },
      {
        name: 'Spark New Zealand',
        address: '4 Williamson Avenue, Grey Lynn, Auckland',
        visits: 105,
        interactions: 143,
      },
    ],
  };

  it('should render each component', () => {
    render(
      <InsightsScene
        selectedMonthInsights={data}
        historicalInsights={{
          searchAppearances: data.searchAppearances,
          profileInteractions: data.profileInteractions,
          profileVisits: data.profileVisits,
        }}
      />,
    );

    expect(screen.getAllByText('Search Appearances')).toHaveLength(2);
    expect(screen.getAllByText('Profile Interactions')).toHaveLength(2);
    expect(screen.getAllByText('Profile Visits')).toHaveLength(2);

    screen.getByText('134');
    // screen.getByText('4.7'); // TODO re-enable once average is re-enabled
    screen.getByText('Historical Insights');
    screen.getByText('Detailed Insights');

    screen.getByRole('main');
    screen.getByRole('table');
    screen.getByText('Performance by Category');
    screen.getByText('Interaction Breakdown');
    expect(screen.getAllByRole('figure')).toHaveLength(5);
  });

  it('should fetch last and penultimate array items correctly for hero metric change calculations', () => {
    const obj = {
      arr: [
        { x: 115, y: 407 },
        { x: 145, y: 156 },
        { x: 348, y: 413 },
        { x: 498, y: 400 },
      ],
    };

    expect(fetchLast('arr', 'y')(obj)).toEqual(400);
    expect(fetchSecondToLast('arr', 'y')(obj)).toEqual(413);
  });
});
