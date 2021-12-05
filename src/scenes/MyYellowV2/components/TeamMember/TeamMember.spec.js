/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamMember from './TeamMember';

describe('Team Member', () => {
  it('should render properties', () => {
    render(
      <TeamMember
        name="John Doe"
        jobTitle="Dentist"
        description="Experienced dentist who hates going to the dentist"
        phone="09-1234567"
        email="tooth@hurty.com"
        imageURL="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
      />,
    );

    screen.getByText('John Doe');
    screen.getByText('Dentist');
    screen.getByText('Experienced dentist who hates going to the dentist');
    screen.getByText('09-1234567');
    screen.getByText('tooth@hurty.com');
    screen.getByRole('img');
  });
});
