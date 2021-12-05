/* globals describe, it, expect */

import React from 'react';
import { screen, render } from '@testing-library/react';
import ReviewRelease from './ReviewRelease';

describe('ReviewRelease', () => {
  it('renders the phone with a link', async () => {
    render(<ReviewRelease />);

    const phoneNumber = '0800 803 803';
    const phoneLink = `tel:${phoneNumber.replace(/ /g, '')}`;
    const linkElement = await screen.findByRole('link', { name: phoneNumber });

    expect(linkElement.href).toBe(phoneLink);
  });
});
