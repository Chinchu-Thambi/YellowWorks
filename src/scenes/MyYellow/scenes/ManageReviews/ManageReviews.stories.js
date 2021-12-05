/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import * as R from 'ramda';
import faker from 'faker';
import { ManageReviews } from './ManageReviewsScene';

const createMockReviewsAndReplies = () => {
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

  return R.range(1, 8).map((n, i) => ({
    id: faker.random.uuid(),
    rating: Math.random() * 5,
    text: faker.lorem.words(25 + Math.round(Math.random() * 300)),
    // /1000 because the backend uses notation in seconds
    created: faker.date.between(new Date(2020, 5, 5), new Date(2020, 1, 1)).getTime() / 1000,
    user: {
      id: faker.random.uuid(),
      displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`,
    },
    images: R.take(Math.round(Math.random() * 4), images),
    status: 'ACCEPT',
    response:
      Math.random() < 0.5
        ? null
        : {
          id: faker.random.uuid(),
          user: {
            id: faker.random.uuid(),
            displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            avatar:
                Math.random() < 0.5
                  ? null
                  : `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 20}.jpg`,
          },
          text: faker.lorem.words(25 + Math.round(Math.random() * 100)),
          // /1000 because the backend uses notation in seconds
          created: faker.date.between(new Date(2020, 5, 5), new Date(2020, 1, 1)).getTime() / 1000,
          status: Math.random() < 0.5 ? 'ACCEPT' : 'MOD',
        },
  }));
};

export const ManageReviewsScenes = () => (
  <ManageReviews reviews={createMockReviewsAndReplies()} averageRating={3.5} reviewsCount={108} />
);

export default {
  title: 'Scenes/Reviews & Ratings',
};
