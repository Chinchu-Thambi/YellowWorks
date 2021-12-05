/* eslint-disable import/no-extraneous-dependencies */

global.fetch = require('node-fetch');

const {
  addMocksToSchema, mergeSchemas,
} = require('graphql-tools');
const R = require('ramda');

const getToken = require('./lib/auth/getToken');
const mocks = require('./lib/mocks');
const getSchemas = require('./lib/schema/getSchemas');

const getMockedSchema = async () => {
  const mockedEndpoints = process.env.MOCK_GRAPHQL_ENDPOINTS
    .split(',').map(R.trim);

  const schemaEndpoints = R.compose(
    R.fromPairs,
    R.map((key) => [
      key,
      process.env[key],
    ]),
  )(mockedEndpoints);

  const schemaPairs = await getSchemas({
    schemaEndpoints,
    cacheDir: `${__dirname}/cache`,
    getToken: () => getToken({
      region: process.env.GATSBY_AWS_REGION,
      userPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.GATSBY_COGNITO_POOL_CLIENT_ID,
      username: process.env.CYPRESS_TEST_USER,
      password: process.env.CYPRESS_TEST_PASSWORD,
    }),
  });

  const schemas = R.map(R.view(R.lensIndex(1)))(schemaPairs);
  const schema = mergeSchemas({ schemas });
  const schemaWithMocks = addMocksToSchema({ schema, mocks });

  return schemaWithMocks;
};

module.exports = getMockedSchema;
