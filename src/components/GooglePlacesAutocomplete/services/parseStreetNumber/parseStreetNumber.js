const parseStreetNumber = (gStreetNumber = '', userInput = '') => {
  let unit = '';
  let streetNumber;
  const parsedUserInput = userInput.split(' ')?.[0];

  if (
    gStreetNumber.length >= parsedUserInput.length
    && gStreetNumber.includes(parsedUserInput)
  ) {
    streetNumber = gStreetNumber;
  } else {
    streetNumber = parsedUserInput;
  }

  const unitSplit = streetNumber.toUpperCase().split(/[-/]/);

  if (unitSplit.length > 1) {
    [unit, streetNumber] = unitSplit;
  } else {
    [streetNumber] = unitSplit;
  }

  streetNumber = streetNumber.replace(/[^0-9A-Z]/g, '');

  const validFormat = /^[1-9][-0-9A-Z]*$/; // https://products.sandbox.beta.yellow.co.nz/schema/business/v1/definitions.json#/definitions/address

  if (!validFormat.test(streetNumber)) {
    streetNumber = '';
  }

  return {
    unit,
    streetNumber,
  };
};

export default parseStreetNumber;
