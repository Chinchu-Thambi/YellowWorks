import React from 'react';
import { Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import GooglePlacesAutocomplete from '../GooglePlacesAutocomplete';
import ValidationController from '../ValidationController';

import {
  Container, Form, GooglePlacesAutocompleteLabel, GooglePlacesContainer, SearchNewAddressButton,
} from './Styled';

const AddressForm = (props) => {
  const {
    formData, onChange, defaultMode, ...rest
  } = props;
  const [isGoogleAddressVisible, setIsGoogleAddressVisible] = React.useState(
    defaultMode === 'search',
  );
  const relevantFormData = R.pick(['address', 'geo'])(formData);
  const [localData, setLocalData] = React.useState(relevantFormData);
  const ref = React.useRef(null);
  const addressDetails = localData?.address || {};

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setLocalData({
      ...localData,
      address: {
        ...addressDetails,
        [id]: value,
      },
    });
  };

  const addressSelection = (addressObj) => {
    const newLocation = {
      address: {
        subpremise: addressObj.subpremise,
        streetNumber: addressObj.street_number,
        streetAddress: addressObj.route,
        locality: addressObj.locality,
        sublocality: addressObj.sublocality_level_1,
        administrativeArea: addressObj.administrative_area_level_1,
        postalCode: addressObj.postal_code,
        country: addressObj.country,
      },
      geo: {
        latitude: addressObj.latitude,
        longitude: addressObj.longitude,
      },
    };

    setLocalData({
      address: newLocation.address,
      geo: newLocation.geo,
    });
    setIsGoogleAddressVisible(false);
  };

  const toggleGoogleSearchAddress = () => {
    // remove current data when selecting a new address
    delete localData.address;
    delete localData.geo;

    setLocalData({ ...localData });
    setIsGoogleAddressVisible(!isGoogleAddressVisible);
  };

  React.useEffect(() => {
    if (
      R.equals(localData, relevantFormData)
      || !localData.geo
      || typeof onChange !== 'function'
    ) {
      return;
    }

    onChange(localData);
  }, [localData, relevantFormData, onChange]);


  return (
    <Container>
      <Form
        autoComplete="off"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {isGoogleAddressVisible ? (
          <>
            <GooglePlacesContainer>
              <GooglePlacesAutocompleteLabel data-testid="AddressFormGPAutocompleteLabel">
                Search for your address *
              </GooglePlacesAutocompleteLabel>
              <GooglePlacesAutocomplete onSelect={addressSelection} ref={ref} autoFocus placeholder="" />
            </GooglePlacesContainer>
            <ValidationController
              isBlocked={!addressDetails?.streetAddress}
              requiredRef={ref}
            />
          </>
        ) : (
          <>
            <Flex justifyContent="space-between" alignItems="baseline">
              <label htmlFor="subpremise">
                <span>Unit</span>
                <input
                  type="text"
                  name="subpremise"
                  id="subpremise"
                  value={addressDetails.subpremise}
                  placeholder="E.g. Suite 3A"
                  onChange={handleAddressChange}
                  autoComplete="off"
                  autoCorrect="off"
                  // eslint-disable-next-line
                  autoFocus
                />
              </label>
              <label htmlFor="floor">
                <span>Floor</span>
                <input
                  type="text"
                  name="floor"
                  id="floor"
                  value={addressDetails.floor}
                  placeholder="E.g. Level 3"
                  onChange={handleAddressChange}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </label>
              <label htmlFor="premise">
                <span>Building</span>
                <input
                  type="text"
                  name="premise"
                  id="premise"
                  value={addressDetails.premise}
                  placeholder="E.g. Waterford Towers"
                  onChange={handleAddressChange}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </label>
            </Flex>

            <Flex justifyContent="space-between" alignItems="baseline">
              <label htmlFor="streetNumber">
                <span>Street Number</span>
                <input
                  type="text"
                  name="streetNumber"
                  id="streetNumber"
                  value={addressDetails.streetNumber}
                  disabled
                />
              </label>

              <label htmlFor="streetAddress">
                <span>Street Address</span>
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  value={addressDetails.streetAddress}
                  disabled
                />
              </label>
            </Flex>

            <Flex justifyContent="space-between" alignItems="baseline">
              <label htmlFor="sublocality">
                <span>Suburb</span>
                <input
                  type="text"
                  name="sublocality"
                  id="sublocality"
                  value={addressDetails.sublocality}
                  disabled
                />
              </label>

              <label htmlFor="postalCode">
                <span>Post Code</span>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={addressDetails.postalCode}
                  disabled
                />
              </label>
            </Flex>

            <Flex justifyContent="space-between" alignItems="baseline">
              <label htmlFor="locality">
                <span>Town/City</span>
                <input
                  type="text"
                  name="locality"
                  id="locality"
                  value={addressDetails.locality}
                  disabled
                />
              </label>

              <label htmlFor="administrativeArea">
                <span>Region</span>
                <input
                  type="text"
                  name="administrativeArea"
                  id="administrativeArea"
                  value={addressDetails.administrativeArea}
                  disabled
                />
              </label>
            </Flex>

            <Flex flexDirection="column" alignItems="start" mb={2}>
              <SearchNewAddressButton
                type="button"
                variant="link"
                size="sm"
                onClick={toggleGoogleSearchAddress}
                data-testid="AddressFormSearchNewAddressLink"
                ref={ref}
              >
                Search new address
              </SearchNewAddressButton>
              <ValidationController
                isBlocked={!addressDetails?.streetAddress}
                requiredRef={ref}
              />
            </Flex>
          </>
        )}
      </Form>
    </Container>
  );
};

AddressForm.defaultProps = {
  defaultMode: 'form',
  formData: {
    address: {
      placeId: '',
      streetNumber: '',
      streetAddress: '',
      floor: '',
      premise: '',
      subpremise: '',
      sublocality: '',
      locality: '',
      administrativeArea: '',
      postalCode: '',
    },
    geo: {
      latitude: undefined,
      longitude: undefined,
    },
  },
};

AddressForm.propTypes = {
  defaultMode: PropTypes.oneOf([
    'form', 'search',
  ]),
  formData: PropTypes.shape({
    address: PropTypes.shape({
      placeId: PropTypes.string,
      streetNumber: PropTypes.string,
      streetAddress: PropTypes.string,
      floor: PropTypes.string,
      premise: PropTypes.string,
      subpremise: PropTypes.string,
      sublocality: PropTypes.string,
      locality: PropTypes.string,
      administrativeArea: PropTypes.string,
      postalCode: PropTypes.string,
    }),
    geo: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  onChange: PropTypes.func.isRequired,
};

export default AddressForm;
