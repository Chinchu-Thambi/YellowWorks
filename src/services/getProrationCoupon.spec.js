/* globals describe, it, afterAll, expect, jest */

import getProrationCoupon from './getProrationCoupon';

const OriginalDate = Date;

describe('getProrationCoupon', () => {
  afterAll(() => {
    global.Date = OriginalDate;
  });

  it('returns a coupon for the first day of the year', () => {
    global.Date = jest.fn(() => ({
      getDate: () => 1,
      getMonth: () => 0,
      getFullYear: () => 2020,
    }));

    expect(getProrationCoupon()).toBe('20200101_1');
  });

  it('returns a coupon for the last day of the year', () => {
    global.Date = jest.fn(() => ({
      getDate: () => 31,
      getMonth: () => 11,
      getFullYear: () => 2020,
    }));

    expect(getProrationCoupon()).toBe('20201231_1');
  });
});
