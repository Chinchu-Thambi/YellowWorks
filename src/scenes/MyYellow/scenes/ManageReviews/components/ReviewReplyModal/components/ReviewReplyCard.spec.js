/* globals describe, it, expect, jest */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import review from '../../../__mocks__/review';
import ReviewContext from '../../../services/ReviewContext';

import ReviewReplyCard from './ReviewReplyCard';

describe('ReviewReplyCard', () => {
  it('replies to a review', () => {
    const reviewStore = {
      respondReview: jest.fn().mockImplementation(() => ({})),
    };

    render(
      <ReviewContext.Provider value={reviewStore}>
        <ReviewReplyCard review={review} />,
      </ReviewContext.Provider>,
    );

    const replyBox = screen.getByRole('textbox', { name: 'Reply to this review' });
    const responseString = 'responseString';
    fireEvent.change(replyBox, { target: { value: responseString } });

    screen.getByRole('button', { name: 'Submit' }).click();

    expect(reviewStore.respondReview).toBeCalledWith({
      reviewId: review.id,
      responseText: responseString,
    });
  });
});
