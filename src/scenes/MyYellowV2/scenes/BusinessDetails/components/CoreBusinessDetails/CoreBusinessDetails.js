import React from 'react';
import { TwoColumnContainer } from '../../../../components/Containers';
import { FormGroup, Input } from '../../../../components/FormElements';

const CoreBusinessDetails = () => {
  const onSave = () => console.log('Save clicked');
  const onCancel = () => console.log('Cancel clicked');

  return (
    <TwoColumnContainer
      title="Business Details"
      subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis incidunt dolore mollitia aliquid quod, quas itaque optio doloremque id quis"
      primaryAction={{ label: 'Save', onClick: onSave }}
      secondaryAction={{ label: 'Cancel', onClick: onCancel }}
    >
      <FormGroup>
        <Input id="bus-det-lbn" label="Legal business name" />
        <Input id="bus-det-dbn" label="Display business name" />
      </FormGroup>
    </TwoColumnContainer>
  );
};

export default CoreBusinessDetails;
