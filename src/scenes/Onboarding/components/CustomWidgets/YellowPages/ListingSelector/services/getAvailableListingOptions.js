const getAvailableListingOptions = (formData) => {
  const {
    additionalPhoneNumber,
    email,
    url,
  } = formData;

  const listings = [
    { name: 'Free Listing', id: 'FREE' },
    { name: 'Enhanced Bold Name Listing', id: 'ENHANCED' },
  ];
  // Second piece of data available
  if (!!additionalPhoneNumber?.number || !!email || !!url) {
    listings.push({ name: '3 Line Listing', id: '2LINE' });
  }

  // Third piece of data available
  if (
    (!!additionalPhoneNumber?.number && !!email)
    || (!!additionalPhoneNumber?.number && !!url)
    || (!!email && !!url)
  ) {
    listings.push({ name: '4 Line Listing', id: '3LINE' });
  }

  // Four pieces of data available
  if (
    (!!additionalPhoneNumber?.number && !!email && !!url)
  ) {
    listings.push({ name: '5 Line Listing', id: '4LINE' });
  }

  return listings;
};

export default getAvailableListingOptions;
