/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import Notice from './Notice';

export const Notices = () => {
  const heading = text('Heading', 'The heading');
  const message = text('Name', 'The message goes here lorem ipsum dolor');
  const directive = text('Directive', 'Click me');

  return <Notice heading={heading} message={message} directive={directive} targetURL="_blank" />;
};

export default {
  title: 'Components',
};
