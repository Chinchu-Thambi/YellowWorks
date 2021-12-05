import { faBirthdayCake, faIceCream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TwoColumnContainer } from '.';
import Button from '../../../../components/Button';
import ResponsiveChecker from '../../../../components/utils/ResponsivenessChecker';
import {
  Checkbox, FormGroup, FormSubGroup, Input, Radio, TextArea, Dropdown,
} from '../FormElements';
import { ImageUploadArea } from '../media';

export const Component = () => {
  const [action, setAction] = React.useState(null);
  const generateDummyId = () => `${Math.random() * 1000000}`;

  return (
    <>
      <ResponsiveChecker />
      <TwoColumnContainer
        title="Container title"
        subtitle="This is some extra text that goes under the title. Perhaps an explainer for what's in this section."
        primaryAction={{ label: 'Save', onClick: () => setAction('SAVE') }}
        secondaryAction={{ label: 'Cancel', onClick: () => setAction('CANCEL') }}
      >
        <FormGroup>
          <Input id={generateDummyId()} label="First name" />
          <Input id={generateDummyId()} label="Last name" value="some prefilled value here" prefilled />
          <Input
            id={generateDummyId()}
            label="Input with error message"
            errorMessage="This is a sample error message to show under the input field."
          />
          <FormSubGroup id={generateDummyId()} label="Dinner Menu">
            <Radio id={generateDummyId()} label="Pizza" name="dinner" />
            <Radio id={generateDummyId()} label="Pasta" name="dinner" />
            <Radio id={generateDummyId()} label="Cake" name="dinner" />
          </FormSubGroup>
          <FormSubGroup id={generateDummyId()} label="Dietary requirements">
            <Checkbox id={generateDummyId()} label="Gluten Free" />
            <Checkbox id={generateDummyId()} label="Dairy Free" />
          </FormSubGroup>
          <Dropdown
            className="basic-single"
            classNamePrefix="select"
            name="color"
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />
          <Input id={generateDummyId()} label="url" prefix="https://" suffix=".yellow.nz" />
          <Input id={generateDummyId()} label="url" prefix="https://" suffix=".yellow.nz" prefilled />
          <Input id={generateDummyId()} label="url" prefix={<FontAwesomeIcon icon={faIceCream} />} />
          <Input id={generateDummyId()} label="url" suffix={<FontAwesomeIcon icon={faBirthdayCake} />} />
          <TextArea id={generateDummyId()} label="Bio" />
          <TextArea
            id={generateDummyId()}
            label="Text area with error"
            errorMessage="This is a sample error message to show under the input field."
          />
          <ImageUploadArea onFilesSelected={(files) => console.log('Selected files', files)} />
          <Button>Click me</Button>
        </FormGroup>
      </TwoColumnContainer>
    </>
  );
};

export default {
  title: 'Manage Journey/Templates/Form Container Sample Template',
};
