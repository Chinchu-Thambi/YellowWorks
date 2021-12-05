import React from 'react';
import { Controller } from 'react-hook-form';
import { TwoColumnContainer } from '../../../../components/Containers';
import { FormGroup, Input, TextArea } from '../../../../../../components/FormElements';
import ChooseImage from '../../../BusinessDetails/components/CoreBusinessDetails/components/ChooseImage';
import useBusinessForm from '../services/useBusinessForm';

const WebsiteGreeting = () => {
  const businessSubset = {
    title: ['providerConfiguration', 'yellowWebsite', 'greeting', 'title'],
    body: ['providerConfiguration', 'yellowWebsite', 'greeting', 'body'],
    image: ['providerConfiguration', 'yellowWebsite', 'greeting', 'image'],
    signatureImage: ['providerConfiguration', 'yellowWebsite', 'greeting', 'signatureImage'],
  };

  const {
    formHook: { register, control },
    contextData,
    commitFields,
  } = useBusinessForm({ businessSubset });

  const handleWebsiteGreetingSave = () => {
    commitFields(['title', 'body', 'image', 'signatureImage']);
  };

  return (
    <TwoColumnContainer
      title="Greeting"
      subtitle="Write a personal greeting for visitors to your website"
      primaryAction={{
        label: 'Save',
        onClick: handleWebsiteGreetingSave,
      }}
      secondaryAction={{ label: 'Cancel', onClick: () => {} }}
    >
      <FormGroup>
        <Controller
          name="image"
          control={control}
          defaultValue={contextData.image}
          render={({ value, onChange }) => (
            <ChooseImage id="greeting-profile-photo" label="Profile photo" value={value} circle onSelect={onChange} />
          )}
        />

        <Input name="title" label="Title" id="greeting-title" ref={register} defaultValue={contextData.title} />
        <TextArea name="body" label="Blurb" id="greeting-body" ref={register} defaultValue={contextData.body} />
        <Controller
          name="signatureImage"
          control={control}
          defaultValue={contextData.signatureImage}
          render={({ value, onChange }) => (
            <ChooseImage
              id="greeting-signoff-photo"
              label="Sign-off image"
              value={value}
              onSelect={onChange}
            />
          )}
        />
      </FormGroup>
    </TwoColumnContainer>
  );
};

export default WebsiteGreeting;
