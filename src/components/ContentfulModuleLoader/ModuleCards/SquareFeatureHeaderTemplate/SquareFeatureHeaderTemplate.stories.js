/* eslint-disable import/no-extraneous-dependencies */


import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text } from '@storybook/addon-knobs/react';

import { theme } from '../../../../util';

import SquareFeatureHeaderTemplate from './SquareFeatureHeaderTemplate';

export const ThreeBorderedCardsWithSceneHeaderText = () => {
  const title = text('Title', 'Title goes here');
  const subtitle = text('Subtitle', 'Subtitle goes here');
  const description = text('Description', 'Description goes here');
  const cardTitle = text('Card Title', 'Card title goes here');
  const cardBulkText = text('Card Text', 'Card text goes here');
  const ctaButtonText = text('Button Text', 'CTA Button Text');
  const cardImageUrl = text('Card Image URL', 'https://picsum.photos/400/200');

  return (
    <ThemeProvider theme={theme}>
      <SquareFeatureHeaderTemplate
        title={{ title }}
        subtitle={{ subtitle }}
        description={{ description }}
        cards={[1, 2, 3].map((n) => ({
          title: `${cardTitle} ${n}`,
          text: {
            text: cardBulkText,
          },
          callToAction: ctaButtonText,
          image: {
            file: {
              url: cardImageUrl,
            },
          },
        }))}
      />
    </ThemeProvider>
  );
};

export default {
  title: 'Scenes/Marketing',
};
