const AWS = require('aws-sdk');
const { sign } = require('aws4');

const fetch = require('node-fetch');

const {
  GATSBY_AWS_REGION,
  IAM_PRODUCT_PLATFORM_ENDPOINT,
} = process.env;

let url = {
  hostname: '',
  pathname: '',
};

if (IAM_PRODUCT_PLATFORM_ENDPOINT) {
  url = new URL(IAM_PRODUCT_PLATFORM_ENDPOINT);
}

const fetcher = async (uri, options = {}) => {
  AWS.config.credentials = await new AWS.CredentialProviderChain().resolvePromise();

  const opts = {
    ...options,
    service: 'appsync',
    region: GATSBY_AWS_REGION,
    host: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(uri, sign(opts, AWS.config.credentials));
};

module.exports = fetcher;
