import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import faker from 'faker';
import Product from '.';

export const Component = () => {
  const name = text('Name', 'House Special Vegan Burger');
  const description = text('Description', `Z${faker.lorem.words(20)}`);

  return (
    <Product
      name={name}
      description={description}
      imageURL="https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    />
  );
};

export default {
  title: 'Manage Journey/Organisms/Product',
};
