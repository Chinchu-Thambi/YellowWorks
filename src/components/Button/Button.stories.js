/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, select } from '@storybook/addon-knobs/react';

import Button from './Button';

export const Primary = () => {
  const sizeKnob = select(
    'size',
    ['', 'sm', 'md', 'lg'],
  );
  const variantKnob = select(
    'variant',
    [
      '',
      'primary',
      'secondary',
      'tertiary',
      'link',
    ],
  );
  const textKnob = text('CTA Text', 'CTA Text');

  return (
    <Button size={sizeKnob} variant={variantKnob}>{textKnob}</Button>
  );
};

export default {
  title: 'Components/Button',
};
