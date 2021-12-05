/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import Spinner from '../../../../../../../components/Spinner';
import Button from '../../../../../../../components/Button';
import { FormGroup, Input, TextArea } from '../../../../../../../components/FormElements';
import PhoneInput from '../../../../../../../components/PhoneInput';
import HonorificSelector from './HonorificSelector';

const prefixOptions = [
  'Dr',
  'Hon.',
  'Prof.',
];

const suffixOptions = [
  'M.D.',
  'PhD',
  'RN',
];

const TeamMemberModal = ({ onDismiss, formData, onSave }) => {
  const [localData, setLocalData] = React.useState(formData || {});
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = (event, path) => {
    const { value } = event.target;
    const newData = R.assocPath(
      path,
      value,
    )(localData);
    setLocalData(newData);
  };

  const handleMemberHonorificChange = (id, value) => {
    if (!value) {
      const newData = R.assocPath(
        [id],
        '',
      )(localData);
      setLocalData(newData);
      return;
    }
    const newData = R.assocPath(
      [id],
      value,
    )(localData);
    setLocalData(newData);
  };


  const handleSave = async () => {
    setPendingSave(true);
    const success = await onSave(localData);
    if (success) {
      setPendingSave(false);
      onDismiss();
    } else {
      setPendingSave(false);
    }
  };

  return (
    <Box>
      <FormGroup>
        <label>
          <div className="mb-2">Prefix</div>
          <HonorificSelector
            options={prefixOptions}
            onChange={handleMemberHonorificChange}
            name="honorificPrefix"
            currentValue={localData.honorificPrefix}
          />
        </label>
        <Input
          label="First Name"
          placeholder="First Name"
          type="text"
          name="givenName"
          id="givenName"
          value={localData.givenName || ''}
          onChange={(e) => handleChange(e, ['givenName'])}
          minLength={1}
          required
          autoComplete="no"
          autoCorrect="off"
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          type="text"
          name="familyName"
          id="familyName"
          value={localData.familyName || ''}
          onChange={(e) => handleChange(e, ['familyName'])}
          minLength={1}
          required
          autoComplete="no"
          autoCorrect="off"
        />
        <label>
          <div className="mb-2">Prefix</div>
          <HonorificSelector
            options={suffixOptions}
            onChange={handleMemberHonorificChange}
            name="honorificSuffix"
            currentValue={localData.honorificSuffix}
          />
        </label>
        <label>
          <div className="mb-2">Phone Number</div>
          <Box>
            <PhoneInput
              formData={localData.telephone}
              onChange={(value) => handleChange({ target: { value } }, ['telephone'])}
              hideLabel
              required={!!localData.telephone}
            />
          </Box>
        </label>
        <Input
          label="Job Title"
          placeholder="Job Title"
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={localData.jobTitle}
          onChange={(e) => handleChange(e, ['jobTitle'])}
          minLength={1}
          autoComplete="no"
          autoCorrect="off"
        />
        <Input
          label="Email"
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={localData.email}
          onChange={(e) => handleChange(e, ['email'])}
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          minLength={1}
          autoComplete="no"
          autoCorrect="off"
        />
        <TextArea
          label="Job Description"
          placeholder="Job Description"
          type="text"
          name="description"
          id="description"
          value={localData.description}
          onChange={(e) => handleChange(e, ['description'])}
          minLength={1}
          maxLength={500}
          autoComplete="no"
          autoCorrect="off"
        />
      </FormGroup>
      <div className="flex justify-center">
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" type="submit">save</Button>
        <Button onClick={onDismiss} disabled={pendingSave || undefined} size="sm" type="submit">cancel</Button>
      </div>
    </Box>
  );
};

TeamMemberModal.defaultProps = {
  onDismiss: () => { },
  onSave: () => { },
  formData: {},
};
TeamMemberModal.propTypes = {
  onDismiss: PropTypes.func,
  onSave: PropTypes.func,
  formData: PropTypes.shape({
    honorificPrefix: PropTypes.string,
    givenName: PropTypes.string,
    familyName: PropTypes.string,
    honorificSuffix: PropTypes.string,
    description: PropTypes.string,
    jobTitle: PropTypes.string,
    email: PropTypes.string,
    telephone: PropTypes.shape({}),
  }),
};

export default TeamMemberModal;
