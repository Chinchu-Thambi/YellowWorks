/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from './Location';

describe('Business location', () => {
  it('should render properties', () => {
    const dummyOnEdit = () => 'hi';

    render(
      <Location
        name="Shoe Store"
        addressLines={['first address line', 'second address line']}
        email="foo@bar.com"
        phone="09-1234567"
        openingHours={[
          {
            days: 'Mon - Fri',
            hours: '9 AM - 5 PM',
          },
          {
            days: 'Sat & Sun',
            hours: '10 AM - 3 PM',
          },
        ]}
        onEdit={dummyOnEdit}
      />,
    );

    screen.getByText('Shoe Store');
    screen.getByText('first address line');
    screen.getByText('second address line');
    screen.getByText('foo@bar.com');
    screen.getByText('09-1234567');
    screen.getByText('Opening hours');
    screen.getByText('Mon - Fri');
    screen.getByText('9 AM - 5 PM');
    screen.getByText('Sat & Sun');
    screen.getByText('10 AM - 3 PM');
  });
});
