import * as R from 'ramda';
import parsePlaceAddress from './parsePlaceAddress';

const getGoogleGeocode = ({
  google, address, location, requiredFields = [],
}) => new Promise((resolve, reject) => {
  if (!google) {
    reject(Error('GoogleMaps JS not found'));
  }

  const gc = new google.maps.Geocoder();

  const geocodeResolver = (results, status) => {
    if (status !== 'OK') {
      reject(Error(`Geocode was not successful for the following reason: ${status}`));
      return;
    }

    const mostSpecificPlace = results.reduce((finalPlace, currentPlace) => {
      if (!finalPlace) {
        return currentPlace;
      }

      // biggest length on address_components wins prize for most specific place
      if (currentPlace.address_components.length > finalPlace.address_components.length) {
        return currentPlace;
      }

      // if we already have a rooftop, return it
      if (finalPlace.geometry.location_type === 'ROOFTOP') {
        return finalPlace;
      }

      if (
        currentPlace.address_components.length === finalPlace.address_components.length
        && currentPlace.geometry.location_type === 'ROOFTOP' // rooftop is the tiebreaker
      ) {
        return currentPlace;
      }

      return finalPlace;
    }, null);

    const parsedPlace = parsePlaceAddress(mostSpecificPlace);
    // eslint-disable-next-line no-underscore-dangle
    const missingFields = R.reject(R.prop(R.__, parsedPlace))(requiredFields);

    if (missingFields) {
      const parsedResults = results.map(parsePlaceAddress);

      missingFields.forEach((missingField) => {
        const fieldValue = R.compose(
          R.prop(missingField),
          R.find(R.prop(missingField)),
        )(parsedResults);

        if (fieldValue) {
          mostSpecificPlace.address_components.push({
            long_name: fieldValue,
            short_name: fieldValue,
            types: [missingField],
          });
        }
      });
    }

    resolve(mostSpecificPlace);
  };

  if (location) {
    gc.geocode({ location }, geocodeResolver);
    return;
  }

  if (address) {
    gc.geocode({ address, region: 'NZ' }, geocodeResolver);
  }
});

export default getGoogleGeocode;
