/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text } from '@storybook/addon-knobs/react';

import Avatar from './Avatar';

export const Avatars = () => {
  const imageURI = text('Image URI', 'https://randomuser.me/api/portraits/women/0.jpg');
  const size = text('Size', '5rem');
  return <Avatar src={imageURI} width={size} />;
};

export default {
  title: 'Components',
};
