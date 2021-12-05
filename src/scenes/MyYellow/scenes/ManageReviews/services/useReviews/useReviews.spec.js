/* globals describe, it, expect, beforeEach */

import React from 'react';
import axios from 'axios';
import { renderHook, act } from '@testing-library/react-hooks';
import * as R from 'ramda';

import AuthContext from '../../../../../../components/Auth/AuthContext';

import review from '../../__mocks__/review';

import useReviews from '.';

const endCursor = 3;
const data = {
  data: {
    reviews: {
      edges: [
        { node: review },
      ],
      pageInfo: {
        endCursor,
      },
    },
  },
};
const errors = null;
axios.post.mockResolvedValue({
  data, errors,
});

describe('useReviews', () => {
  const reviewId = review.id;
  const responseText = 'response text';
  const subscriptionId = '123';

  const customerId = 'customerId';
  const jwtToken = 'jwtToken';

  const authWrapper = ({ children }) => (
    <AuthContext.Provider value={{ customerId, jwtToken }}>
      {children}
    </AuthContext.Provider>
  );

  beforeEach(() => {
    axios.post.mockClear();
  });

  it('pushes a graphql mutation', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useReviews({ subscriptionId }),
      { wrapper: authWrapper },
    );
    await waitForNextUpdate();
    axios.post.mockClear();

    const responseId = '3126';
    axios.post.mockResolvedValueOnce({
      data: { data: { respondReview: { id: responseId } } },
    });

    const { respondReview } = result.current;
    respondReview({ reviewId, responseText });
    await waitForNextUpdate();

    expect(axios.post.mock.calls[0][1].variables).toEqual({
      reviewId, responseText, customerId,
    });

    const { reviews } = result.current;

    const response = R.path(['response'])(R.find(R.propEq('id', reviewId))(reviews));

    expect(response).toEqual({
      id: responseId,
      text: responseText,
      status: 'MOD',
    });
  });

  it('load reviews from graphql', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useReviews({ subscriptionId }),
      { wrapper: authWrapper },
    );

    await waitForNextUpdate();

    let { reviews } = result.current;
    const { loadNextReviewPage } = result.current;

    // load initial review
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post.mock.calls[0][1].variables.after).toBe(undefined);
    expect(reviews).toContain(review);

    const secondReview = { ...review, id: '2' };
    axios.post.mockClear();
    axios.post.mockResolvedValueOnce({
      data: R.set(
        R.lensPath(['data', 'reviews']),
        {
          edges: [
            { node: secondReview },
          ],
          pageInfo: {
            endCursor: endCursor + 1,
          },
        },
      )(data),
      errors,
    });

    act(() => {
      loadNextReviewPage();
    });
    await waitForNextUpdate();
    reviews = result.current.reviews;

    // load second page of review
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post.mock.calls[0][1].variables.after).toBe(endCursor);
    expect(reviews).toContain(review);
    expect(reviews).toContain(secondReview);
  });
});
