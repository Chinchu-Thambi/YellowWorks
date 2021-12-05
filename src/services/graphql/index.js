import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';

export const webClient = new ApolloClient({
  uri: process.env.GATSBY_APPSYNC_URL,
  fetch,
});

export const productClient = new ApolloClient({
  uri: process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
  fetch,
});

export const billingClient = new ApolloClient({
  uri: process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
  fetch,
});
