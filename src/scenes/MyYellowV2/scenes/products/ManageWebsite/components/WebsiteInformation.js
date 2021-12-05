import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Controller } from 'react-hook-form';

import PhoneInput from '../../../../../../components/PhoneInput';
import BusinessContext from '../../../../../MyYellow/services/BusinessContext';

import { TwoColumnContainer } from '../../../../components/Containers';
import { FormGroup, Input, TextArea } from '../../../../../../components/FormElements';

import useBusinessForm from '../services/useBusinessForm';
import YellowWebsiteAddressController from '../../../../components/YellowWebsiteAddress';

const WebsiteInformation = ({ sharedFieldsDisclaimer, allowedCustomDomain }) => {
  const businessStore = React.useContext(BusinessContext) ?? {};

  const locations = businessStore.getPath?.(['locations']);
  const defaultLocationIndex = R.findIndex(R.prop('default'))(locations ?? []);

  const businessSubset = {
    'Trading name': ['details', 'name'],
    'About your business': ['details', 'description'],
    mainPhone: ['locations', defaultLocationIndex, 'telephone'],
    websiteUrl: ['providerConfiguration', 'yellowWebsite', 'slug'],
    customDomain: ['providerConfiguration', 'yellowWebsite', 'customDomain'],
    Headline: ['providerConfiguration', 'yellowWebsite', 'headline'],
    'Sub-headline': ['providerConfiguration', 'yellowWebsite', 'alternativeHeadline'],
  };

  const {
    formHook: {
      register, control,
    },
    ...businessForm
  } = useBusinessForm({ businessSubset });

  const handleWebsiteInformationSave = () => {
    businessForm.commitFields([
      'Trading name',
      'mainPhone',
      'websiteUrl',
      'customDomain',
      'Headline',
      'Sub-headline',
      'About your business',
    ]);
  };

  return (
    <TwoColumnContainer
      title="Yellow Website Information"
      subtitle={sharedFieldsDisclaimer}
      primaryAction={{
        label: 'Save',
        onClick: handleWebsiteInformationSave,
      }}
      secondaryAction={{ label: 'Cancel', onClick: () => { } }}
    >
      <FormGroup>
        <Input
          id="bus-det-dbn"
          label="Trading name"
          placeholder="Trading name"
          name="Trading name"
          ref={register}
          prefilled
        />
        <Controller
          name="mainPhone"
          control={control}
          defaultValue={businessForm.contextData?.mainPhone ?? null}
          render={({ value, onChange }) => (
            <PhoneInput
              formData={value}
              onChange={onChange}
              prefilled
            />
          )}
        />
        <Input
          id="bus-det-hdl"
          label="Headline"
          name="Headline"
          placeholder="Headline"
          ref={register}
        />
        <Input
          id="bus-det-subhdl"
          label="Sub-headline"
          name="Sub-headline"
          placeholder="Sub-headline"
          ref={register}
        />
        <TextArea
          id="bus-det-description"
          label="About your business"
          name="About your business"
          placeholder="Tell us about what makes you unique"
          maxLength={1000}
          ref={register}
          prefilled
        />
        {allowedCustomDomain ? (
          <Controller
            name="customDomain"
            control={control}
            defaultValue={businessForm.contextData?.websiteUrl ?? null}
            render={({ value, onChange }) => (
              <YellowWebsiteAddressController
                onChange={onChange}
                value={value}
                title="Website Address"
              />
            )}
          />
        ) : (
          <Controller
            name="websiteUrl"
            control={control}
            defaultValue={businessForm.contextData?.websiteUrl ?? null}
            render={({ value, onChange }) => (
              <YellowWebsiteAddressController
                onChange={onChange}
                value={value}
                title="Website Address"
                suffix=".yellow.co.nz"
              />
            )}
          />
        )}
      </FormGroup>
    </TwoColumnContainer>
  );
};

WebsiteInformation.defaultProps = {
  sharedFieldsDisclaimer: '',
  allowedCustomDomain: false,
};

WebsiteInformation.propTypes = {
  sharedFieldsDisclaimer: PropTypes.string,
  allowedCustomDomain: PropTypes.bool,
};

export default WebsiteInformation;
