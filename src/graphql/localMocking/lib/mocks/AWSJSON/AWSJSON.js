/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const AWSJSON = () => JSON.stringify({
  hello: faker.random.words(3),
});

module.exports = AWSJSON;
