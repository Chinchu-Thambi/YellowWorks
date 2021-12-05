/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeleteConfirmationDialog, OptionalDialog } from './Dialogs';

describe('Simple optional dialog', () => {
  it('should render properties correctly - with default OK and CANCEL buttons', () => {
    render(<OptionalDialog title="Generic optional dialog" message="Are you sure you want to go ahead?" />);

    screen.getByText('Generic optional dialog');
    screen.getByText('Are you sure you want to go ahead?');
    screen.getByRole('button', { name: 'OK' });
    screen.getByRole('button', { name: 'CANCEL' });
  });
});

describe('Delete confirmation dialog', () => {
  it('should render properties correctly', () => {
    render(<DeleteConfirmationDialog title="Delete thing" message="Are you sure you want to delete the thing?" />);

    screen.getByText('Delete thing');
    screen.getByText('Are you sure you want to delete the thing?');
    screen.getByRole('button', { name: 'YES' });
    screen.getByRole('button', { name: 'NO' });
  });
});
