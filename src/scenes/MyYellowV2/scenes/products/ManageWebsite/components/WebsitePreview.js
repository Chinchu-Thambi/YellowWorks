import React from 'react';
import { Controller } from 'react-hook-form';

import YellowWebsitesThemePicker from '../../../../../../components/YellowWebsitesThemePicker';

import { TwoColumnContainer } from '../../../../components/Containers';

import useBusinessForm from '../services/useBusinessForm';

const themes = [
  {
    label: 'Tradie',
    value: 'tradie',
    colors: ['#FFFFFF', '#F2F2F2', '#D9DDE3', '#718096', '#041430', '#DE2828'],
  },
  {
    label: 'Spring',
    value: 'spring',
    colors: ['#F8F3E8', '#F8F3E8', '#F8F3E8', '#F8F3E8', '#3F0060', '#FFB54F'],
  },
  {
    label: 'Rose',
    value: 'rose',
    colors: ['#FFFFFF', '#F5F1EF', '#D0C4BE', '#7D6C62', '#4D423C', '#261E19'],
  },
  {
    label: 'Fresh',
    value: 'fresh',
    colors: ['#FFFFFF', '#EFF5F0', '#BED0C1', '#627D67', '#3C4D3F', '#19261B'],
  },
  {
    label: 'Pro',
    value: 'pro',
    colors: ['#FFFFFF', '#EFF1F5', '#BEC5D0', '#626D7D', '#384457', '#081D3C'],
  },
];

const WebsitePreview = () => {
  const businessSubset = {
    theme: ['providerConfiguration', 'yellowWebsite', 'theme'],
  };

  const {
    formHook: {
      control,
    },
    ...businessForm
  } = useBusinessForm({
    businessSubset,
  });

  return (
    <TwoColumnContainer
      title="Website Theme"
    >
      <div className="flex justify-end w-full">
        <Controller
          name="theme"
          control={control}
          defaultValue={businessForm.contextData.theme ?? ''}
          render={({ value, onChange }) => (
            <YellowWebsitesThemePicker
              themes={themes}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
    </TwoColumnContainer>
  );
};

export default WebsitePreview;
