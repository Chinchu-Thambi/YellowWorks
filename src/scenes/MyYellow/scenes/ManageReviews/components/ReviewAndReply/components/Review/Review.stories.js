/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, number } from '@storybook/addon-knobs/react';
import faker from 'faker';

import Review from './Review';

export const Reviews = () => {
  const avatarURL = text('Avatar URL', 'https://randomuser.me/api/portraits/women/0.jpg');
  const fName = text('Replier first name', 'John');
  const lName = text('Replier last name', 'Doe');
  const rating = number('Rating', 3.2);
  const reviewText = text('Review text', faker.lorem.words(300));

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
    <Review
      review={{
        user: { avatar: avatarURL, displayName: `${fName} ${lName}` },
        rating,
        created: new Date(2020, 5, 21).getTime() / 1000,
        text: reviewText,
        images,
      }}
    />
  );
};

export default {
  title: 'Components/Reviews & Ratings',
};
