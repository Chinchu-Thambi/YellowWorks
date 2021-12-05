/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, boolean } from '@storybook/addon-knobs/react';

import Discount from './Discount';

export const DiscountStory = () => {
  const codeKnob = text('Code', '');
  const explanationKnob = text('Explanation', '');
  const nameKnob = text('Name', '');
  const validity = boolean('Valid', false);

  const pricingOptions = {
    discountValidity: {
      validity,
      code: codeKnob,
      name: nameKnob,
      description: explanationKnob,
    },
  };
  return (
    <Discount pricingOptions={pricingOptions} />
  );
};

export default {
  title: 'Components',
};
