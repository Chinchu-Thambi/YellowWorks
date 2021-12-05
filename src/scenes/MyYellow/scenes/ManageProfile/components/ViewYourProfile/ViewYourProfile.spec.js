/* globals describe, it */

import React from 'react';
import { render } from '@testing-library/react';

import ViewYourProfile from './ViewYourProfile';

describe('ManageReviewsScene', () => {
  it('renders without throwing', () => {
    render(<ViewYourProfile />);
  });
});
