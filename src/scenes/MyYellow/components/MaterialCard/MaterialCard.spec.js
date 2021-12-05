/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MaterialCard from './MaterialCard';

describe('Material Card', () => {
  it('should render correctly', () => {
    render(
      <MaterialCard>
        <div>Hello World</div>
      </MaterialCard>,
    );
    screen.getByText('Hello World');
  });
});
