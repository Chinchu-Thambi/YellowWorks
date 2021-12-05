/* globals describe it expect */
const { utcDate } = require('../../../../util/formatting');
const { monthsToMinimum } = require('./InsightsSceneContainerV2');

describe('Utility functions for insights scene assembly', () => {
  it('should generate months to minimum date from a given start date', () => {
    expect(monthsToMinimum({ fromDateUTC: utcDate(2021, 3, 1), minDateUTC: utcDate(2020, 3, 1) })).toEqual([
      utcDate(2021, 3, 1),
      utcDate(2021, 2, 1),
      utcDate(2021, 1, 1),
      utcDate(2021, 0, 1),
      utcDate(2020, 11, 1),
      utcDate(2020, 10, 1),
      utcDate(2020, 9, 1),
      utcDate(2020, 8, 1),
      utcDate(2020, 7, 1),
      utcDate(2020, 6, 1),
      utcDate(2020, 5, 1),
      utcDate(2020, 4, 1),
      utcDate(2020, 3, 1),
    ]);
  });

  it('should generate months to minimum date from a given start date - single date return', () => {
    expect(monthsToMinimum({ fromDateUTC: utcDate(2021, 3, 1), minDateUTC: utcDate(2021, 3, 1) })).toEqual([
      utcDate(2021, 3, 1),
    ]);
  });
});
