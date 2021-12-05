import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import BrowserFrame from './BrowserFrame';

export const Component = () => {
  const url = text('URL', 'https://yellow.co.nz/');
  const displayURL = text('Display URL', 'yellow.co.nz');

  return <BrowserFrame url={url} displayURL={displayURL} />;
};

export default {
  title: 'Manage Journey/Organisms/Browser Preview Frame',
};
