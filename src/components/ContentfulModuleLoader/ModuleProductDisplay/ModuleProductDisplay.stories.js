/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  text, select,
} from '@storybook/addon-knobs/react';

import { theme } from '../../../util';

import ModuleProductDisplay from './index';
import { productOptions } from '../../../graphql/sampleData';

export const ModuleProductDisplayStory = () => {
  const value = select('Products', productOptions, productOptions.YOL);

  const referenceKnob = text('Reference', '');
  const titleKnob = text('Title', 'Choose your product');
  const textKnob = text('Text', '');

  return (
    <ThemeProvider theme={theme}>
      <ModuleProductDisplay
        reference={referenceKnob}
        products={value}
        title={titleKnob}
        text={textKnob}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Buy Journey/Product Display',
};
