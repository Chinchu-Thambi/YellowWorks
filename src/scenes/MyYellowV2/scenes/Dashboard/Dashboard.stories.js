import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import Dashboard from './Dashboard';
import DashboardBlock from './components/DashboardBlock';
import image from './assets/images/businessDetails.svg';

const caption = text('Caption', 'Business Details');
const link = text('URL', 'yellow.co.nz');

export const Scene = () => <Dashboard />;
export const Block = () => <DashboardBlock caption={caption} link={link} image={image} />;

export default {
  title: 'Manage Journey/Scenes/Dashboard',
};
