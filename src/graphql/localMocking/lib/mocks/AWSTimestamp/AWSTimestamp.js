/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const AWSTimestamp = () => JSON.stringify(faker.date.soon());

module.exports = AWSTimestamp;
