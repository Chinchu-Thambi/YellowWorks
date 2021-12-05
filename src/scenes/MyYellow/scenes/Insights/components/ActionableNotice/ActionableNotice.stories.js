/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { text } from '@storybook/addon-knobs';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Flex } from 'rebass';

import { theme } from '../../../../../../util';
import sampleicon from '../../../../../../assets/icons/analytics-profile.svg';
import ActionableNotice from './ActionableNotice';

export const ActionableNotices = () => {
  const title = text('Title', 'Short title here');
  const subtitle = text(
    'Subtitle',
    'Officia occaecat cupidatat velit reprehenderit aliqua dolore commodo velit id nostrud.',
  );
  const ctaText = text('Button Text', 'CTA BUTTON');

  return (
    <ThemeProvider theme={theme}>
      <Flex maxWidth={300} m={3}>
        <ActionableNotice
          art={{ image: sampleicon, scalePercent: 50 }}
          title={title}
          text={subtitle}
          action={{ text: ctaText }}
        />
      </Flex>
    </ThemeProvider>
  );
};

export default {
  title: 'Components',
  decorators: [withKnobs],
};
