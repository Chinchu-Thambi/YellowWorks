/* globals describe, it */

import { render, screen } from '@testing-library/react';
import React from 'react';
import Reviewer from './Reviewer';

describe('Reviewer', () => {
  it('renders displayName', () => {
    const user = {
      displayName: 'displayName',
    };

    render(<Reviewer user={user} />);

    screen.getByText(user.displayName);
  });

  it('renders formatted date', () => {
    const secondsDate = 1600045833;

    render(<Reviewer date={secondsDate} />);

    screen.getByText('14 Sep 2020');
  });
});
