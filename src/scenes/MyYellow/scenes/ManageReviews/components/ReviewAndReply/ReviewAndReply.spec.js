/* globals describe, it */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../../../../util';

import review from '../../__mocks__/review';

import ReviewAndReply from './ReviewAndReply';

describe('ReviewAndReply', () => {
  it('renders a reply button', () => {
    render(<ReviewAndReply review={review} />);

    screen.findByRole('button', { name: 'Reply' });
  });

  it('renders a reply button for incomplete response', () => {
    const reviewWithIncompleteResponse = {
      ...review,
      response: {},
    };

    render(<ReviewAndReply review={reviewWithIncompleteResponse} />);

    screen.findByRole('button', { name: 'Reply' });
  });

  it('reply button opens, closes and opens a modal yet again', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ReviewAndReply review={review} />
      </ThemeProvider>,
    );

    const replyButton = await screen.findByRole('button', { name: 'Reply' });
    replyButton.click();

    const cancelButton = await screen.findByRole('button', { name: 'Cancel' });
    cancelButton.click();

    replyButton.click();

    await screen.findByRole('textbox', { name: 'Reply to this review' });
  }, 30000);
});
