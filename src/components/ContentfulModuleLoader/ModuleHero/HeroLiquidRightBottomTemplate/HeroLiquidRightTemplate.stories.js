/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text, select } from '@storybook/addon-knobs/react';

import { theme } from '../../../../util';

import HeroLiquidRightBottomTemplate from './HeroLiquidRightBottomTemplate';

export const HeroLiquidRightBottomStory = () => {
  const titleKnob = text('Title', 'The title');
  const subtitleKnob = text('Sub title', 'The subtitle');
  const descriptionKnob = text(
    'Description',
    'The description text lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  );
  const imageURLKnob = text('Image URL', 'https://via.placeholder.com/800');
  const bgColorKnob = select(
    'Background color',
    [
      theme.palette.accent[4][0],
      theme.palette.brand[0],
      theme.palette.accent[3][0],
      theme.palette.contrast[0],
      theme.palette.contrast[1],
      theme.palette.contrast[2],
      theme.palette.contrast[3],
      theme.palette.contrast[4],
      theme.palette.contrast[5],
      theme.palette.base[3],
      theme.palette.base[0],
    ],
    theme.palette.brand[0],
  );

  return (
    <ThemeProvider theme={theme}>
      <HeroLiquidRightBottomTemplate
        title={{ title: titleKnob }}
        backgroundColor={bgColorKnob}
        titleSub={{ titleSub: subtitleKnob }}
        description={{ description: descriptionKnob }}
        image={{
          file: {
            url: imageURLKnob,
            details: {
              image: {
                width: 200,
                height: 200,
              },
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Hero',
};
