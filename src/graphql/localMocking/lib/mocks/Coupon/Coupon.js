/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

const Coupon = () => ({
  code: '25OFF',
  amount: faker.random.number(),
});

module.exports = Coupon;
