/* globals describe, it, expect */

import parsePlaceAddress from './parsePlaceAddress';

describe('parsePlaceAddress', () => {
  it('returns a properly shaped address object', () => {
    const mockedGoogleAddress = {
      geometry: {
        location: {
          lat: () => 'lat',
          lng: () => 'lng',
        },
      },
      address_components: [
        {
          long_name: 'street number',
          types: ['street_number'],
        },
        {
          long_name: 'route name',
          types: ['route'],
        },
        {
          long_name: 'locality name',
          types: ['locality'],
        },
        {
          short_name: 'administrative name',
          types: ['administrative_area_level_1'],
        },
        {
          long_name: 'country name',
          types: ['country'],
        },
        {
          short_name: 'postal code',
          types: ['postal_code'],
        },
        {
          long_name: 'sublocality name',
          types: ['sublocality_level_1'],
        },
      ],
    };

    const addressObj = parsePlaceAddress(mockedGoogleAddress);

    expect(addressObj).toEqual({
      street_number: 'street number',
      route: 'route name',
      locality: 'locality name',
      administrative_area_level_1: 'administrative name',
      country: 'country name',
      postal_code: 'postal code',
      sublocality_level_1: 'sublocality name',
      latitude: 'lat',
      longitude: 'lng',
    });
  });
});
