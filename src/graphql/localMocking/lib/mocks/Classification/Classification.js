/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const Classification = () => ({
  name: faker.random.words(3),
  id: faker.random.number(),
});

module.exports = Classification;
