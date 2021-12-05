/* globals describe, it, expect */
import { sort } from './SortableTable';

describe('sort function', () => {
  it('should sort by given property and in given order', () => {
    const cats = [
      {
        name: 'Mr. Mittens',
        age: 5,
      },
      {
        name: 'Princess Whiskers',
        age: 3,
      },
    ];

    const sortedAsc = sort('name', true)(cats);

    expect(cats).not.toBe(sortedAsc);
    expect(sortedAsc).toEqual([
      {
        name: 'Mr. Mittens',
        age: 5,
      },
      {
        name: 'Princess Whiskers',
        age: 3,
      },
    ]);

    expect(sort('name', false)(cats)).toEqual([
      {
        name: 'Princess Whiskers',
        age: 3,
      },
      {
        name: 'Mr. Mittens',
        age: 5,
      },
    ]);

    expect(sort('age', true)(cats)).toEqual([
      {
        name: 'Princess Whiskers',
        age: 3,
      },
      {
        name: 'Mr. Mittens',
        age: 5,
      },
    ]);

    expect(sort('age', false)(cats)).toEqual([
      {
        name: 'Mr. Mittens',
        age: 5,
      },
      {
        name: 'Princess Whiskers',
        age: 3,
      },
    ]);
  });
});
