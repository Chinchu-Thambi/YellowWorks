/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  text, select,
} from '@storybook/addon-knobs/react';

import { theme } from '../../../../util';

import PrePurchaseOnboarding from './PrePurchaseOnboarding';

export const PrePurchaseOnboardingStory = () => {
  const stepKnob = text('Step', '1');
  const skuKnob = select(
    'SKU',
    [
      'SEARCHADS',
      'PRINT',
    ],
    'SEARCHADS',
  );

  return (
    <ThemeProvider theme={theme}>
      <PrePurchaseOnboarding
        step={stepKnob}
        sku={skuKnob}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Buy Journey/Onboarding',
};
