/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, number } from '@storybook/addon-knobs/react';
import faker from 'faker';
import * as R from 'ramda';
import SingleReview from './SingleReview';

export const ReviewMessage = () => {
  const avatarURL = text('Avatar URL', 'https://randomuser.me/api/portraits/women/0.jpg');
  const fName = text('Replier first name', 'John');
  const lName = text('Replier last name', 'Doe');
  const rating = number('Rating');
  const message = text('Message', faker.lorem.words(500));
  const numImages = number('Number of images (max 4)', 4);

  const images = [
    {
      id: '1526745925052',
      image:
        'https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4650&q=80',
    },
    {
      id: '1542045904',
      image:
        'https://images.unsplash.com/photo-1542045904-23b645536536?ixlib=rb-1.2.1&auto=format&fit=crop&w=4650&q=80',
    },
    {
      id: '1570857502809',
      image:
        'https://images.unsplash.com/photo-1570857502809-08184874388e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2967&q=80',
    },
    {
      id: '1512436991641',
      image:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2738&q=80',
    },
  ];

  return (
    <SingleReview
      user={{
        displayName: `${fName} ${lName}`,
        avatar: avatarURL,
      }}
      rating={rating}
      date={new Date(2020, 5, 21).getTime() / 1000}
      text={message}
      images={R.take(numImages, images)}
    />
  );
};

export default {
  title: 'Components/Reviews & Ratings',
};
