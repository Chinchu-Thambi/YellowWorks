import React from 'react';
import { Controller } from 'react-hook-form';

import { OneColumnContainer } from '../../../../../components/Containers';

import useBusinessForm from '../../services/useBusinessForm';

import ChooseCover from './components/ChooseCover';

const WebsiteCover = () => {
  const businessSubset = {
    primaryImageOfPage: ['providerConfiguration', 'yellowWebsite', 'primaryImageOfPage'],
  };

  const {
    formHook: {
      setValue, control,
    },
    ...businessForm
  } = useBusinessForm({
    businessSubset,
  });

  const handleCoverChange = async (newCover) => {
    const coverField = 'primaryImageOfPage';

    setValue(coverField, newCover);

    businessForm.commitFields([coverField]);
  };

  return (
    <OneColumnContainer
      title="Cover Photo for your Website"
      subtitle="Pick one of your gallery photos as the large photo that goes across the top of your Website."
    >
      <Controller
        name="primaryImageOfPage"
        control={control}
        defaultValue={businessForm?.contextData.primaryImageOfPage ?? ''}
        render={({ value }) => (
          <ChooseCover
            value={value}
            onChange={handleCoverChange}
          />
        )}
      />
    </OneColumnContainer>
  );
};

export default WebsiteCover;
