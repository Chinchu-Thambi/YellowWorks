/* globals describe, it, expect */

import React from 'react';
import { render, act, cleanup } from '@testing-library/react';

import CategoryBoost from './CategoryBoost';

describe('CategoryBoost', () => {
  it('renders without throwing', async () => {
    await act(async () => {
      expect(() => {
        render(
          <CategoryBoost proxyFor="categories" />,
        );
      }).not.toThrow();
    });

    cleanup();
  });
});
