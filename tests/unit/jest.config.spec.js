/* globals describe, it, expect */

import config from '../../jest.config';

describe('test suite', () => {
  it('processes a test suite', () => {
    expect(true).toBe(true);
  });
  it('should not change by accident', () => {
    expect(config).toMatchSnapshot();
  });
});
