/* globals describe, it, expect */

import { morph } from 'mock-env';

morph(() => {
  // eslint-disable-next-line global-require
  const config = require('../../gatsby-config');

  describe('gatsby config', () => {
    it('should not change by accident', () => {
      expect(config).toMatchSnapshot();
    });
  });
}, {
  CONTENTFUL_SPACE_ID: 'mock-space-id',
  CONTENTFUL_ACCESS_TOKEN: 'mock-access-token',
  CONTENTFUL_PREVIEW_TOKEN: 'mock-preview-token',
  CONTENTFUL_HOST: 'mock-host',
  SITE_URL: 'mock-site-url',
  GATSBY_HUBSPOT_ACCOUNT: 'mock-hubspot-account',
  BIGCOMMERCE_CLIENT_ID: 'mock-bigcommerce-clientid',
  BIGCOMMERCE_CLIENT_SECRET: 'mock-bigcommerce-secret',
  BIGCOMMERCE_TOKEN: 'mock-bigcommerce-token',
  BIGCOMMERCE_STORE_HASH: 'mock-bigcommerce-store-hash',
  SEGMENT_KEY: 'mock-segment-key',
  DATA_DOG_KEY: 'mock-datadog-key',
  ROBOTS_TXT_TEMPLATE_ENV: 'mock-nonproduction',
  IAM_PRODUCT_PLATFORM_ENDPOINT: 'http://mock-product-platform/',
});
