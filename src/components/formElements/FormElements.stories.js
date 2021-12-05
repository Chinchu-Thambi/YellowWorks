import React from 'react';
import { select } from '@storybook/addon-knobs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faIceCream } from '@fortawesome/free-solid-svg-icons';
import {
  Checkbox, FormGroup, FormSubGroup, Radio, TextArea, Input,
} from '.';
import Button from '../Button';
import { Dropdown } from './FormElements';
import ImageUploadArea from '../../scenes/MyYellowV2/components/media/ImageUploadArea';

export const Forms = () => {
  const inputsArePrefilled = select('Prefilled state', [false, true]);
  const fieldsetIsDisabled = select('Disable entire fieldset', [false, true]);
  const generateDummyId = () => `${Math.random() * 1000000}`;

  return (
    <FormGroup disabled={fieldsetIsDisabled}>
      <Input id={generateDummyId()} label="First name" prefilled={inputsArePrefilled} />
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
      <Input id={generateDummyId()} label="url" prefix={<FontAwesomeIcon icon={faIceCream} />} />
      <Input id={generateDummyId()} label="url" suffix={<FontAwesomeIcon icon={faBirthdayCake} />} />
      <TextArea id={generateDummyId()} label="Bio" prefilled={inputsArePrefilled} />
      <TextArea
        id={generateDummyId()}
        label="Text area with error"
        errorMessage="This is a sample error message to show under the input field."
      />
      <ImageUploadArea onFilesSelected={(files) => console.log('Selected files', files)} />
      <Button>Click me</Button>
    </FormGroup>
  );
};

export default {
  title: 'Manage Journey/Organisms/Form Elements',
};
