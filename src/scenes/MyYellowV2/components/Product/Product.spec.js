/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from './Product';

describe('Delete confirmation dialog', () => {
  it('should render properties correctly', () => {
    render(
      <Product
        name="Fresh strawberries"
        description="Freshly imported from a place that produces great strawberries"
        imageURL="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
      />,
    );

    screen.getByText('Fresh strawberries');
    screen.getByText('Freshly imported from a place that produces great strawberries');
    screen.getByRole('img');
  });
});
