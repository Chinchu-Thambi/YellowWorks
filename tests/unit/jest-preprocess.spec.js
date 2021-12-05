/* globals describe, it, expect */

import config from '../../jest-preprocess';

describe('jest preprocess', () => {
  it('should not change by accident', () => {
    expect(config).toMatchSnapshot();
  });
});
