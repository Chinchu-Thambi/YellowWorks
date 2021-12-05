/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const express = require('express');

// const handleSchema = require('./handleSchema');
const mockedGraphqlMiddleware = require('./mockedGraphqlMiddleware');

dotenv.config();

(async () => {
  const app = express();

  app.use('/graphql', mockedGraphqlMiddleware);

  app.get('/', (req, res) => {
    res.redirect('/graphql');
  });

  app.listen(4000, () => {
    console.info('Listening on http://localhost:4000/graphql');
  });
})();
