/* globals describe, it, expect, afterEach, beforeEach, jest */

import { errorText, getErrorString } from '../../../src/util';

const consoleError = console.error;

describe('text util', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = consoleError;
  });

  it('returns defaultError', () => {
    expect(getErrorString('')).toMatch(errorText.defaultError);
    expect(getErrorString([{ message: '' }])).toMatch(errorText.defaultError);
    expect(getErrorString({ message: '' })).toMatch(errorText.defaultError);
  });
});
