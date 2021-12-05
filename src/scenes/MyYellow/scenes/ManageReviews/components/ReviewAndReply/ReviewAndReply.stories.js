/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text, number } from '@storybook/addon-knobs/react';
import faker from 'faker';

import ReviewAndReplyCards from './ReviewAndReply';

export const ReviewAndReplyCardsStory = () => {
  // Review
  const avatarURL = text('Reviewer avatar URL', 'https://randomuser.me/api/portraits/women/0.jpg');
  const reviewRating = number('Rating', 3.2);
  const reviewText = text('Review', faker.lorem.words(200));
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
  const fName = text('Replier first name', 'John');
  const lName = text('Replier last name', 'Doe');
  const replyText = text('Reply', faker.lorem.words(200));
  const replyStatus = text('Reply status', 'pending approval');

  return (
    <ReviewAndReplyCards
      review={{
        user: {
          givenNames: fName,
          familyName: lName,
          avatar: avatarURL,
        },
        rating: reviewRating,
        created: new Date(2020, 5, 21),
        text: reviewText,
        images,
        response: {
          user: {
            givenNames: fName,
            familyName: lName,
          },
          created: new Date(2020, 5, 23),
          text: replyText,
          status: replyStatus,
        },
      }}
    />
  );
};

export default {
  title: 'Scenes/Reviews & Ratings',
};
