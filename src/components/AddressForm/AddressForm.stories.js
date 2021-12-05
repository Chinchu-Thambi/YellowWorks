/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import AddressForm from './AddressForm';

export const Primary = () => (
  <AddressForm defaultMode="search" />
);

export default {
  title: 'Components/AddressForm',
  parameters: {
    jest: ['AddressForm.spec.js'],
  },
};
