/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, number, select } from '@storybook/addon-knobs/react';

import StarRating from './StarRating';

export const StarRatings = () => {
  const rating = number('Rating', 2.5);
  const color = text('Star color', 'blue');
  const size = select('Size', ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'], '1x');
  return <StarRating stars={rating} color={color} size={size} />;
};

export default {
  title: 'Components/Reviews & Ratings',
};
