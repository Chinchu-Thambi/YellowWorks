/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import * as R from 'ramda';
import { number } from '@storybook/addon-knobs';
import ThumbnailGrid from './ThumbnailGrid';

export const ThumbnailsGrid = () => {
  const images = [
    'https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4650&q=80',
    'https://images.unsplash.com/photo-1542045904-23b645536536?ixlib=rb-1.2.1&auto=format&fit=crop&w=4650&q=80',
    'https://images.unsplash.com/photo-1570857502809-08184874388e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2967&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2738&q=80',
  ];

  const count = number('Count (max 4)', 4);

  return <ThumbnailGrid images={R.take(count, images)} thumbnailSize={75} />;
};

export default {
  title: 'Components/Images',
};
