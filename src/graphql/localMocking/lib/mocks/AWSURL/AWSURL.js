/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const AWSURL = () => ({
  url: JSON.stringify(faker.internet.email),
});

module.exports = AWSURL;
