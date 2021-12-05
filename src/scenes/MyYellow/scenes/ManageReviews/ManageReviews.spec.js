/* globals jest, describe, it, beforeAll, window, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import * as R from 'ramda';

import AuthContext from '../../../../components/Auth';

import review from './__mocks__/review';
import useReviews from './services/useReviews';

import ManageReviewsScene from './ManageReviewsScene';

jest.mock('./services/useReviews');

describe('ManageReviewsScene', () => {
  const totalCount = 33;
  const useReviewMock = {
    reviews: [
      review,
    ],
    reviewStats: {
      avgRating: 3.5,
      totalCount,
    },
    hasNextPage: true,
    loadNextReviewPage: () => {},
  };

  beforeAll(() => {
    useReviews.mockReturnValue(useReviewMock);
  });

  it('renders review elements', async () => {
    render(<ManageReviewsScene subscriptionId="123" />);

    await screen.getByText(`Based on ${totalCount} reviews`);
    await screen.getByRole('button', { name: 'View More' });

    const toTheTop = await screen.queryByRole('button', { name: 'Back to the top' });
    expect(toTheTop).toBeNull();
  });

  it('scrolls to the top with a button', async () => {
    const useReviewMockLongReviews = {
      ...useReviewMock,
      reviews: R.map((id) => ({ ...review, id: id.toString() }))(R.range(0, 9)),
    };
    useReviews.mockReturnValueOnce(useReviewMockLongReviews);
    const originalScrollTo = window.scrollTo;
    window.scrollTo = jest.fn();
    render(<ManageReviewsScene subscriptionId="123" />);

    const toTheTop = await screen.getByRole('button', { name: 'Back to the top' });
    toTheTop.click();

    expect(window.scrollTo).toBeCalledWith(0, 0);

    window.scrollTo = originalScrollTo;
  });

  it('renders a welcome message', async () => {
    const authState = { jwtToken: '123' };
    render(
      <AuthContext.Provider value={authState}>
        <ManageReviewsScene subscriptionId="123" />
      </AuthContext.Provider>,
    );

    await screen.findByText('You can now view customer reviews and respond to them from your business portal!');
  });
});
