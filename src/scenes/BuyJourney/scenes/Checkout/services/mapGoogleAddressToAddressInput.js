const mapGoogleAddressToAddressInput = (address) => {
  const {
    placeId,
    streetNumber,
    streetAddress,
    floor,
    premise,
    subpremise,
    sublocality,
    locality,
    administrativeArea,
    postalCode,
  } = address;
  return {
    id: placeId,
    streetNumber,
    streetName: streetAddress,
    floor,
    premise,
    subpremise,
    // ruralDeliveryNumber: String
    sublocality,
    locality,
    administrativeArea,
    country: 'NZ',
    postalCode,
    // postOfficeBoxType: String
    // postOfficeBoxNumber: String
  };
};

export const mapAddressToGoogleAddress = (address) => {
  const {
    id,
    streetNumber,
    streetName,
    floor,
    premise,
    subpremise,
    sublocality,
    locality,
    administrativeArea,
    postalCode,
  } = address;
  return {
    placeId: id,
    streetNumber,
    streetAddress: streetName,
    floor,
    premise,
    subpremise,
    sublocality,
    locality,
    administrativeArea,
    country: 'NZ',
    postalCode,
  };
};

export default mapGoogleAddressToAddressInput;
