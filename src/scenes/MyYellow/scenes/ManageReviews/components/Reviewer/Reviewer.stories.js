/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, number } from '@storybook/addon-knobs/react';
import Reviewer from './Reviewer';

export const Reviewers = () => {
  const avatarURL = text('Avatar URL', 'https://randomuser.me/api/portraits/women/0.jpg');
  const fName = text('Replier first name', 'Jane');
  const lName = text('Replier last name', 'Doe');
  const rating = number('Rating');
  const label = text('Label', null);

  return (
    <Reviewer
      user={{
        displayName: `${fName} ${lName}`,
        avatar: avatarURL,
      }}
      rating={rating}
      date={new Date(2020, 5, 21).getTime() / 1000}
      label={label}
    />
  );
};

export default {
  title: 'Components/Reviews & Ratings',
};
