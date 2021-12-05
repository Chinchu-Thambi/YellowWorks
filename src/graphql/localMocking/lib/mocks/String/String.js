/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const String = () => faker.random.words(3);

module.exports = String;
