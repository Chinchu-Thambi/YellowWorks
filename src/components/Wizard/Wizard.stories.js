/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  text,
  number,
} from '@storybook/addon-knobs/react';

import { theme } from '../../util';

import Wizard from './Wizard';

export const WizardStory = () => {
  const titleKnob = text('Title', 'Storybook Title');
  const textKnob = text('Text', 'Storybook text');
  const totalStepKnob = number('Total Steps', 5);
  const currentStepKnob = number('Current Step', 1);
  const classNameKnob = text('Class Name', 'classname');

  return (
    <ThemeProvider theme={theme}>
      <Wizard
        title={titleKnob}
        text={textKnob}
        completeSteps={currentStepKnob}
        totalSteps={totalStepKnob}
        className={classNameKnob}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Components',
};
