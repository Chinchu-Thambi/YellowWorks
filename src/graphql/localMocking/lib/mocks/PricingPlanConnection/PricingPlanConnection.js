// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const pricingPlanIds = [
  'SEARCHADS_1000',
  'SEARCHADS_2000',
  'SEARCHADS_3000',
];

const PricingPlanConnection = () => ({
  nodes: [{
    id: pricingPlanIds[faker.random.number(2)],
    amount: faker.random.number(4000),
    interval: 'MONTH',
  }],
});

module.exports = PricingPlanConnection;
