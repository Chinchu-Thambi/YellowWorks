import React from 'react';
import { Controller } from 'react-hook-form';

import { TwoColumnContainer } from '../../../../../components/Containers';

import useBusinessForm from '../../services/useBusinessForm';
import YellowWebsiteAddressController from '../../../../../components/YellowWebsiteAddress';

const WebsiteUrl = () => {
  const businessSubset = {
    websiteSlug: ['providerConfiguration', 'yellowWebsite', 'slug'],
  };

  const {
    formHook: {
      setValue, control,
    },
    ...businessForm
  } = useBusinessForm({
    businessSubset,
  });

  const handleSlugChange = async (newSlug) => {
    const slugField = 'websiteSlug';

    setValue(slugField, newSlug);

    businessForm.commitFields([slugField]);
  };

  return (
    <TwoColumnContainer
      title="Website URL"
    >
      <Controller
        name="websiteSlug"
        control={control}
        defaultValue={businessForm?.contextData.websiteSlug ?? ''}
        render={({ value }) => (
          <YellowWebsiteAddressController
            value={value}
            onChange={handleSlugChange}
          />
        )}
      />
    </TwoColumnContainer>
  );
};

export default WebsiteUrl;
