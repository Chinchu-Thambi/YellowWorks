/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, select } from '@storybook/addon-knobs/react';
import { HeaderButton } from './LgHeaderStyled';

export const Primary = () => {
  const highlightedKnob = select('Highlighted', [true, false]);

  const textKnob = text('Text', 'Click me');

  return <HeaderButton highlighted={highlightedKnob}>{textKnob}</HeaderButton>;
};

export default {
  title: 'Components/HeaderButton',
};
