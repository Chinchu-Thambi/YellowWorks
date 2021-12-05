/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text, number } from '@storybook/addon-knobs/react';

import { theme } from '../../../../../../util';

import SingleProduct from './SingleProduct';

const colorVariants = [{
  background: 'bg-contrast-100',
  text: 'text-contrast-600',
  buttonVariant: 'contrast',
  tag: {
    background: 'bg-contrast-600',
    text: 'text-base-100',
  },
},
{
  background: 'bg-brand-600',
  text: 'text-contrast-600',
  buttonVariant: 'contrast',
  tag: {
    background: 'bg-contrast-600',
    text: 'text-base-100',
  },
},
{
  background: 'bg-contrast-600',
  text: 'text-base-100',
  buttonVariant: 'light',
  tag: {
    background: 'bg-brand-600',
    text: 'text-contrast-600',
  },
}];

const features = {};

export const SingleProductStory = () => {
  const name = text('Name', 'Name goes here');
  const tag = text('Tag', 'Tag text');
  const description = text('Text', 'The text');
  const colorSet = number('Order it appears in list of products', 1);

  return (
    <ThemeProvider theme={theme}>
      <SingleProduct
        name={name}
        price={500}
        featureText={features}
        shortText={tag}
        text={description}
        colorSet={colorVariants[colorSet]}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Scenes/Marketing',
};
