/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Flex, Text } from 'rebass/styled-components';
import { text, number } from '@storybook/addon-knobs/react';
import ThumbnailLink from './ThumbnailLink';

export const Thumbnails = () => {
  const [numClicks, setNumClicks] = React.useState(0);
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4650&q=80',
  );

  const size = number('Size', 75);

  return (
    <Flex flexDirection="column" p={3}>
      <Text color="gray" mb={2}>
        Thumbnail with no click handler
      </Text>
      <ThumbnailLink imageURL={imageURL} size={size} />
      <Text color="gray" mt={4} mb={2}>
        Thumbnail with click handler (number of clicks = {numClicks})
      </Text>
      <ThumbnailLink imageURL={imageURL} size={size} onClick={() => setNumClicks(numClicks + 1)} />
    </Flex>
  );
};

export default {
  title: 'Components/Images',
};
