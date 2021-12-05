// from https://products.sandbox.beta.yellow.co.nz/schema/business/v1/definitions.json#/

const getPhoneConfig = (areaCode) => {
  const phoneTypes = {
    geographicNumber: {
      minLength: 7,
      maxLength: 7,
      range: [
        '3',
        '4',
        '6',
        '7',
        '9',
      ],
    },
    mobileNumber: {
      minLength: 6,
      maxLength: 8,
      range: [
        '20',
        '21',
        '22',
        '23',
        '24',
        '26',
        '27',
        '28',
        '29',
      ],
    },
    premiumNumber: {
      minLength: 5,
      maxLength: 6,
      range: [
        '900',
      ],
    },
    tollFree: {
      minLength: 6,
      maxLength: 8,
      range: [
        '508',
        '800',
      ],
    },
    serviceNumber: {
      minLength: 3,
      maxLength: 4,
      range: [
        'NONE',
      ],
    },
  };

  return Object.values(phoneTypes)
    .find((specification) => specification.range.includes(areaCode));
};

export default getPhoneConfig;
