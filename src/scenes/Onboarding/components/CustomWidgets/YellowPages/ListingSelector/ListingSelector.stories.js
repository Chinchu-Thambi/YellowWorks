/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, select } from '@storybook/addon-knobs/react';
import ListingSelector from './ListingSelector';

export const ListingSelectorStory = () => {
  const listingTypeKnob = select(
    'Listing Type',
    ['Free', '2 Line', '3 Line', 'Enhanced'],
  );
  const nameKnob = text('Name', 'Fancy Florestry');
  const phoneKnob = text('Main Phone Number', '09 123 4567');
  const secondaryPhoneKnob = text('Secondary Phone Number', '027 111 2222');
  const emailKnob = text('Email', 'test@example.com');

  return (
    <ListingSelector
      listingType={listingTypeKnob}
      address={{}}
      name={nameKnob}
      primaryNumber={phoneKnob}
      secondaryNumber={secondaryPhoneKnob}
      email={emailKnob}
    />
  );
};

export default {
  title: 'Components',
};
