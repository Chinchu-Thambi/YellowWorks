/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const pricingPlan = require('../PricingPlanConnection');

const sku = [
  'YPPREMIUM',
  'YPBASIC',
  // 'SEARCHADS',
  'CBGOLD',
  'CBSILVER',
  'CBBRONZE',
];

const Product = () => ({
  sku: sku[faker.random.number(2)],
  name: faker.random.words(3),
  pricingPlan,
  // options: {
  //   nodes: [
  //     {
  //       sku: 'CBGOLD',
  //       name: 'Gold Category',
  //       price: 100,
  //       shortName: 'Gold',
  //       shortText: 'Category search results are visible above Free, Bronze and Silver listings',
  //     },
  //     {
  //       sku: 'CBSILVER',
  //       shortName: 'Silver',
  //       price: 70,
  //       shortText: 'Category search results are visible above Free and Bronze listings',
  //       name: 'Silver Category',
  //     },
  //     {
  //       sku: 'CBBRONZE',
  //       name: 'Bronze Category',
  //       price: 50,
  //       shortName: 'Bronze',
  //       shortText: 'Category search results are visible above Free listings',
  //     },
  //   ],
  // },
  requiresPayment: true,
});

module.exports = Product;
