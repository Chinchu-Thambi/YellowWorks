/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';

import RatingsReviewsTopBanner from './RatingsReviewsTopBanner';

describe('ManageReviewsScene', () => {
  it('renders without throwing', () => {
    render(<RatingsReviewsTopBanner />);
  });

  it('displays decimal for round value', async () => {
    render(<RatingsReviewsTopBanner averageRating={4} />);

    await screen.findByText('4.0');
  });
});
