import * as R from 'ramda';

const parsePlaceAddress = (googlePlacesObject) => {
  const addressConfigs = {
    street_number: 'long_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
    sublocality_level_1: 'long_name',
  };

  const addressObj = {
    latitude: googlePlacesObject.geometry.location.lat(),
    longitude: googlePlacesObject.geometry.location.lng(),
  };

  Object.entries(addressConfigs).forEach(([placeType, nameType]) => {
    const matchingAddressComponent = R.compose(
      R.prop(nameType),
      R.find(
        R.compose(
          R.includes(placeType),
          R.prop('types'),
        ),
      ),
    )(googlePlacesObject.address_components);

    addressObj[placeType] = matchingAddressComponent;
  });

  return addressObj;
};

export default parsePlaceAddress;
