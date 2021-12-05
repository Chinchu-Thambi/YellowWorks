import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import Shopify from './Shopify';

const title = 'Scenes/Connect/Shopify';

export const Portal = () => {
  const source = createMemorySource('');
  const history = createHistory(source);

  return (
    <>
      <h3>my-yellow/connect/shopify</h3>
      <p>
        You are in the portal.
      </p>
      <p>There&#39;s a query checking that the currently selected business has no shopify access token.</p>
      <p>
        Get there and connect it!
      </p>
      <button type="button" onClick={linkTo(title, 'Shopify App Store')}>add app to shopify store</button>
      <LocationProvider history={history}>
        <Shopify />
      </LocationProvider>
    </>
  );
};

export const ShopifyAppStore = () => (
  <>
    <h3>@ Shopify app store / yellow app</h3>
    <button type="button" onClick={linkTo(title, 'Install')}>add!</button>
  </>
);

export const Install = () => {
  const source = createMemorySource('install');
  const history = createHistory(source);

  return (
    <>
      <h3>my-yellow/connect/shopify/install?hmac=hello&</h3>
      <p>this is the first callback from shopify</p>
      <ol>
        <li>capture user login</li>
        <li>capture customer id</li>
        <li>capture business id</li>
        <li>push backendy stuff around</li>
      </ol>
      <button type="button" onClick={linkTo(title, 'Shopify Authorize')}>ok, go!</button>
      <LocationProvider history={history}>
        <Shopify />
      </LocationProvider>
    </>
  );
};

export const ShopifyAuthorize = () => (
  <>
    <h3>@ Shopify admin</h3>
    <button type="button" onClick={linkTo(title, 'Confirmation')}>authorize app</button>
  </>
);

export const Confirmation = () => {
  const source = createMemorySource('confirm');
  const history = createHistory(source);

  return (
    <>
      <h3>my-yellow/connect/shopify/confirm</h3>
      <ol>
        <li>push confirmation hashes from shopify to backend</li>
        <li>display success message or failure instructions</li>
      </ol>
      <LocationProvider history={history}>
        <Shopify />
      </LocationProvider>
    </>
  );
};

export default {
  title,
};
