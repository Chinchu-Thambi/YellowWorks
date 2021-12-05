/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Flex } from 'rebass';
import { ThemeProvider } from 'styled-components';
import { text } from '@storybook/addon-knobs/react';
import { number } from '@storybook/addon-knobs';

import { theme } from '../../../../../../../util';
import HeroMetric from './HeroMetric';

export const HeroMetrics = () => {
  const heroLabel = text('Label', 'Metric Label');
  const metricNumber = number('Value', 1024);
  const changeFraction = number('Change as fraction (-1.0 to +1.0)', 0.12);

  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection={['column', 'row']} sx={{ gridGap: 3 }}>
        <HeroMetric label={heroLabel} value={metricNumber} changeAsFraction={changeFraction} />
        <HeroMetric label={heroLabel} value={metricNumber} changeAsFraction={changeFraction} />
        <HeroMetric label={heroLabel} value={metricNumber} changeAsFraction={changeFraction} />
      </Flex>
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Data',
};
