/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const AWSEmail = () => JSON.stringify(faker.internet.email);

module.exports = AWSEmail;
