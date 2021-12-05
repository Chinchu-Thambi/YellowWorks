/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import faker from 'faker';
import Reply from './Reply';

export const Replys = () => {
  const avatarURL = text('Avatar URL', 'https://randomuser.me/api/portraits/women/0.jpg');
  const fName = text('Replier first name', 'John');
  const lName = text('Replier last name', 'Doe');
  const replyText = text(
    'Reply',
    faker.lorem.words(100),
  );
  const replyStatus = text('Reply status', 'pending approval');

  return (
    <Reply
      reply={{
        user: {
          givenNames: fName,
          familyName: lName,
          avatar: avatarURL,
        },
        created: new Date(2020, 5, 21),
        text: replyText,
        status: replyStatus,
      }}
    />
  );
};

export default {
  title: 'Components/Reviews & Ratings',
};
