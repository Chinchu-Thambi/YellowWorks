/* globals describe, it, expect */

import { monthIndexToString, formatDateToMonthYear, formatDateWithMonthName } from './formatting';

describe('formatting functions', () => {
  it('should convert month index to short string', () => {
    expect(monthIndexToString(0)).toEqual('Jan');
    expect(monthIndexToString(1)).toEqual('Feb');
    expect(monthIndexToString(2)).toEqual('Mar');
    expect(monthIndexToString(3)).toEqual('Apr');
    expect(monthIndexToString(4)).toEqual('May');
    expect(monthIndexToString(5)).toEqual('Jun');
    expect(monthIndexToString(6)).toEqual('Jul');
    expect(monthIndexToString(7)).toEqual('Aug');
    expect(monthIndexToString(8)).toEqual('Sep');
    expect(monthIndexToString(9)).toEqual('Oct');
    expect(monthIndexToString(10)).toEqual('Nov');
    expect(monthIndexToString(11)).toEqual('Dec');
  });

  it('should convert date to MMM yy', () => {
    expect(formatDateToMonthYear(new Date(2020, 2, 15))).toEqual("Mar '20");
    expect(formatDateToMonthYear(new Date(2019, 5, 20))).toEqual("Jun '19");
  });

  it('should convert date to dd MMM yyyy', () => {
    expect(formatDateWithMonthName(new Date(2020, 2, 15))).toEqual('15 Mar 2020');
    expect(formatDateWithMonthName(new Date(2019, 5, 20))).toEqual('20 Jun 2019');
  });
});
