/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Flex, Text } from 'rebass/styled-components';
import { text } from '@storybook/addon-knobs/react';

import TabsBanner from './TabsBanner';

export const TabsBanners = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const item1 = text('Item 1', 'All');
  const item2 = text('Item 2', 'Read');
  const item3 = text('Item 3', 'Unread');

  return (
    <Flex flexDirection="column">
      <TabsBanner
        options={[item1, item2, item3]}
        selectedOptionCallback={(selected) => setSelectedItem(selected)}
        initialSelectedIndex={0}
      />
      {selectedItem && (
        <Text backgroundColor="whitesmoke" p={4} mt={5}>
          Selected option: {selectedItem.name} [index: {selectedItem.index}]
        </Text>
      )}
    </Flex>
  );
};

export default {
  title: 'Components',
};
