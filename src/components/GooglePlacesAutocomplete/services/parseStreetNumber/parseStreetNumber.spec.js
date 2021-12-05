/* globals describe, it, expect */
import parseStreetNumber from './parseStreetNumber';

describe('parseStreetNumber', () => {
  it('returns correct unit/street number pair', () => {
    expect(
      parseStreetNumber('112-114', '112-1'),
    ).toEqual(
      { unit: '112', streetNumber: '114' },
    );

    expect(
      parseStreetNumber('112-114', '112-114 Street'),
    ).toEqual(
      { unit: '112', streetNumber: '114' },
    );

    expect(
      parseStreetNumber('7', '5/7A'),
    ).toEqual(
      { unit: '5', streetNumber: '7A' },
    );

    expect(
      parseStreetNumber('7', '5/7A Verm'),
    ).toEqual(
      { unit: '5', streetNumber: '7A' },
    );

    expect(
      parseStreetNumber('7', '5/7 Verm'),
    ).toEqual(
      { unit: '5', streetNumber: '7' },
    );

    expect(
      parseStreetNumber('', '121a'),
    ).toEqual(
      { unit: '', streetNumber: '121A' },
    );

    expect(
      parseStreetNumber('37I', '44 clyde street'),
    ).toEqual(
      { unit: '', streetNumber: '44' },
    );
  });
});
