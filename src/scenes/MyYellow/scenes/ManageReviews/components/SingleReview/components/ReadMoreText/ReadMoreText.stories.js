/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import faker from 'faker';
import { text, number } from '@storybook/addon-knobs/react';
import ReadMoreText from './ReadMoreText';

export const ReadMore = () => {
  const content = text('Text', faker.lorem.words(500));
  const ratio = number('Width to number of characters ratio', 0.5);

  return <ReadMoreText text={content} widthToCharRatio={ratio} />;
};

export default {
  title: 'Components',
};
