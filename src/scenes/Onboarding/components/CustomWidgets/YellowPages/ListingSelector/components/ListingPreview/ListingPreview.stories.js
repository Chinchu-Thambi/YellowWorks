/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, select } from '@storybook/addon-knobs/react';
import ListingPreview from './ListingPreview';

export const ListingPreviewStory = () => {
  const listingTypeKnob = select(
    'Listing Type',
    ['Free Listing', '2 Line Listing', '3 Line Listing', 'Enhanced Listing'],
  );
  const nameKnob = text('Name', 'Fancy Florestry');
  const phoneAreaCodeKnob = text('Main Phone Number Area Code', '09');
  const phoneKnob = text('Main Phone Number', '111 2222');
  const secondaryPhoneAreaCodeKnob = text('Secondary Phone Number Area Code', '021');
  const secondaryPhoneKnob = text('Secondary Phone Number', '111 2222');
  const emailKnob = text('Email', 'test@example.com');
  const urlKnob = text('Website', 'http://www.yellow.com');

  const address = {
    administrativeArea: 'Wellington',
    country: 'New Zealand',
    floor: 'Level 3',
    locality: 'Wellington',
    postalCode: '6021',
    premise: 'Waterford Towers',
    streetAddress: 'Upoko Road',
    streetNumber: '11B',
    sublocality: 'Hataitai',
    subpremise: 'Siote 1',
  };

  return (
    <ListingPreview
      listingType={listingTypeKnob}
      address={address}
      name={nameKnob}
      primaryNumber={{ areaCode: phoneAreaCodeKnob, number: phoneKnob }}
      secondaryNumber={{ areaCode: secondaryPhoneAreaCodeKnob, number: secondaryPhoneKnob }}
      email={emailKnob}
      url={urlKnob}
    />
  );
};

export default {
  title: 'Components',
};
