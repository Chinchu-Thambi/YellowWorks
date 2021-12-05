const formatAddress = (address, shortAddress = false) => {
  if (!address) return '';
  const {
    floor,
    premise,
    subpremise,
    streetNumber,
    streetAddress,
    sublocality,
    locality,
    administrativeArea,
    postalCode,
  } = address;

  const floorString = floor?.toUpperCase().match('(LEVEL|FLOOR).*') ? floor : `Floor ${floor}`;

  const addressOrder = [
    `${subpremise ? `${subpremise} / ` : ''}${streetNumber} ${streetAddress}${floor ? `, ${floorString}, ` : ''}${premise ? `${premise}` : ''}`,
    sublocality,
    postalCode,
    locality,
    administrativeArea,
  ].filter(Boolean);

  const shortAddressOrder = [
    `${floor ? `${floorString}, ` : ''}
    ${subpremise ? `${subpremise}/` : ''}
    ${streetNumber} ${streetAddress}`,
    sublocality?.slice(0, 5),
  ].filter(Boolean);

  if (shortAddress) {
    return shortAddressOrder.join(', ');
  }
  return addressOrder.join(', ');
};

export default formatAddress;
