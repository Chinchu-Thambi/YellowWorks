/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const PhysicalAddress = () => ({
  description: faker.random.words(15),
  streetNumber: '22',
  streetName: faker.address.streetName(),
  floor: 'Floor 1',
  premise: 'Example Mall',
  subpremise: faker.address.streetPrefix(),
  sublocality: faker.address.city(),
  locality: faker.address.city(),
  administrativeArea: 'Auckland',
  country: 'New Zealand',
  postalCode: '7020',
});

module.exports = PhysicalAddress;
