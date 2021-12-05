/* globals describe, it, expect */

import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import ChooseCustomer from './ChooseCustomer';

describe('ChooseCustomer', () => {
  it('does not throw with incomplete data', async () => {
    await expect(async () => {
      await act(async () => {
        render(
          <ChooseCustomer />,
        );
      });
    }).not.toThrow();

    cleanup();
  });
});
