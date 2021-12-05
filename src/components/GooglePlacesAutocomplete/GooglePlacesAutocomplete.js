/* globals document, window, navigator */

import React from 'react';
import PropTypes from 'prop-types';

import parseStreetNumber from './services/parseStreetNumber';
import getGoogleGeocode from './services/getGoogleGeocode';
import parsePlaceAddress from './services/parsePlaceAddress';

const GooglePlacesAutocomplete = React.forwardRef((props, ref) => {
  const googleApiKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY || null;
  const {
    onSelect, placeholder, id, ...rest
  } = props;

  const autocomplete = React.useRef(null);

  const [google, setGoogle] = React.useState(null);
  const [userInput, setUserInput] = React.useState('');

  const createAddressObject = React.useCallback(async () => {
    // Get the place details from the autocomplete object.
    let place = autocomplete.current.getPlace();
    let addressObj = {};
    const requiredFields = ['sublocality_level_1', 'locality'];

    // if place is not found by the places api, fetch it from geocodes api
    if (!place.geometry && place.name) {
      const geoCodedPlace = await getGoogleGeocode({ google, address: place.name, requiredFields });
      addressObj = parsePlaceAddress(geoCodedPlace);
      place = geoCodedPlace;
    }

    // if fields are missing, reverse geocode to fetch them
    if (
      !addressObj.sublocality_level_1
      || !addressObj.locality
    ) {
      const placeFromGeoCode = await getGoogleGeocode({
        google,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        requiredFields,
      });
      addressObj = parsePlaceAddress(placeFromGeoCode);
      place = placeFromGeoCode;
    }

    const { unit, streetNumber } = parseStreetNumber(addressObj.street_number, userInput);
    if (unit) {
      addressObj.subpremise = unit;
    }
    if (streetNumber) {
      addressObj.street_number = streetNumber;
    }

    // Pass down addressObj to be handled in parent component
    onSelect(addressObj);
  }, [onSelect, userInput, google]);

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  const geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const circle = new google.maps.Circle(
          { center: geolocation, radius: position.coords.accuracy },
        );
        autocomplete.current.setBounds(circle.getBounds());
      });
    }
  };

  // load google object
  React.useEffect(() => {
    const appendGooglePlacesScript = () => {
      if (window.google) {
        setGoogle(window.google);
      } else if (googleApiKey) {
        const script = document.createElement('script');
        /* eslint-disable-next-line max-len */
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=initAutocomplete`;
        script.async = true;
        script.id = 'googlePlacesApiScript';
        script.defer = true;
        document.body.appendChild(script);
      }
    };
    appendGooglePlacesScript();
  }, [googleApiKey]);

  // on google init
  // sets autocomplete on autocomplete input object
  React.useEffect(() => {
    if (!google) {
      return () => {};
    }

    if (!autocomplete.current) {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      autocomplete.current = new google.maps.places.Autocomplete(
        document.getElementById(id), { types: ['address'] },
      );

      // Avoid paying for data that we don't need by restricting the set of
      // place fields that are returned to just the address components.
      autocomplete.current.setFields(['address_component', 'geometry']);

      // Display only search results from New Zealand
      autocomplete.current.setComponentRestrictions({ country: 'NZ' });
    }

    // When the user selects an address from the drop-down, create address object.
    google.maps.event.addListener(autocomplete.current, 'place_changed', createAddressObject);

    return () => {
      if (autocomplete.current) {
        google.maps.event.clearInstanceListeners(autocomplete.current);
      }
    };
  }, [createAddressObject, google, id]);

  // set google init function
  // listens to changes to the autocomplete input object
  React.useEffect(() => {
    const initAutocomplete = () => {
      setGoogle(window?.google);
    };

    // Expose initAutocomplete to window
    if (window) {
      window.initAutocomplete = initAutocomplete;
    }

    if (autocomplete.current) {
      google.maps.event.addListener(autocomplete.current, 'place_changed', createAddressObject);
    }

    return () => {
      if (autocomplete.current) {
        google.maps.event.clearInstanceListeners(autocomplete.current);
      }
    };
  });

  // prevent form submission by pressing enter
  React.useEffect(() => {
    const element = ref.current;

    if (!element) return () => {};

    const keyDownHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    element.addEventListener('keydown', keyDownHandler);

    return () => element.removeEventListener('keydown', keyDownHandler);
  });

  return (
    <>
      {googleApiKey
        ? (
          <input
            id={id}
            type="text"
            className="form-control"
            placeholder={placeholder}
            onFocus={geolocate}
            autoComplete="off"
            autoCorrect="off"
            data-testid="GooglePlacesAutocompleteInputText"
            ref={ref}
            onChange={(e) => { setUserInput(e.target.value); }}
            value={userInput || ''}
            required
            {...rest}
          />
        )
        : <p>Google API key needed</p>}
    </>
  );
});

export default GooglePlacesAutocomplete;

GooglePlacesAutocomplete.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
};

GooglePlacesAutocomplete.defaultProps = {
  id: 'GooglePlacesAutocomplete',
  placeholder: 'Enter your address',
  onSelect: () => {},
};
