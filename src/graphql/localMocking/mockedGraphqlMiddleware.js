// eslint-disable-next-line import/no-extraneous-dependencies
const { graphqlHTTP } = require('express-graphql');

const getMockedSchema = require('./getMockedSchema');

// thanks to https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

const mockedGraphqlMiddleware = asyncMiddleware(async (req, res, next) => {
  const schema = await getMockedSchema();
  return graphqlHTTP({
    schema,
    graphiql: true,
  })(req, res, next);
});

module.exports = mockedGraphqlMiddleware;
