/* globals document */
import React from 'react';
import { Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

import HonorificSelector from './HonorificSelector';

import { TeamMemberWrapper, InputWrapper } from '../TeamMembersModal.styled';
import {
  Form, FormControl, Label, FormControlTextArea, ButtonContainer,
} from '../../../../../../modals/Styled';

import Button from '../../../../../../../../../../../components/Button';
import PhoneInput from '../../../../../../../../../../../components/PhoneInput';
import Spinner from '../../../../../../../../../../../components/Spinner';

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

const TeamMemberForm = (props) => {
  const {
    formData, index, onChange, onRemove, onSave, ...rest
  } = props;
  const employeeDetails = formData?.[index] || [];
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleMemberChange = (e) => {
    if (e.areaCode) {
      const id = 'telephone';
      const value = { ...e, countryCode: '64' };

      onChange({
        ...employeeDetails,
        [id]: value,
      }, index);
      return;
    }
    const { id, value } = e.target;
    onChange({
      ...employeeDetails,
      [id]: value,
    }, index);
  };

  const handleMemberHonorificChange = (id, value) => {
    if (!value) {
      onChange({
        ...employeeDetails,
        [id]: '',
      }, index);
      return;
    }
    onChange({
      ...employeeDetails,
      [id]: value,
    }, index);
  };

  const handleRemoveMember = () => {
    onRemove({
      index,
    });
  };

  const handleSave = async () => {
    setPendingSave(true);
    const form = document.getElementById('employeeForm');
    if (form.checkValidity()) {
      await onSave();
    }
    setPendingSave(false);
  };

  return (
    <TeamMemberWrapper>
      <Form
        id="employeeForm"
        autoComplete="off"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        <Flex justifyContent="flex-end" alignItems="baseline" flexWrap="wrap">
          <Button
            type="button"
            onClick={handleRemoveMember}
            variant="link"
            size="sm"
          >Remove
          </Button>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" py={2} flexWrap="wrap">
          <Label>Prefix</Label>
          <HonorificSelector
            options={prefixOptions}
            onChange={handleMemberHonorificChange}
            name="honorificPrefix"
            currentValue={employeeDetails.honorificPrefix}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
          <InputWrapper width="50%">
            <span>First Name</span>
            <FormControl
              placeholder="First Name"
              type="text"
              name="givenName"
              id="givenName"
              value={employeeDetails.givenName || ''}
              onChange={handleMemberChange}
              minLength={1}
              required
              autoComplete="no"
              autoCorrect="off"
            />
          </InputWrapper>
          <InputWrapper width="50%">
            <span>Last Name</span>
            <FormControl
              placeholder="Last Name"
              type="text"
              name="familyName"
              id="familyName"
              value={employeeDetails.familyName || ''}
              onChange={handleMemberChange}
              minLength={1}
              required
              autoComplete="no"
              autoCorrect="off"
            />
          </InputWrapper>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" py={2} flexWrap="wrap">
          <Label>Suffix</Label>
          <HonorificSelector
            options={suffixOptions}
            onChange={handleMemberHonorificChange}
            name="honorificSuffix"
            currentValue={employeeDetails.honorificSuffix}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
          <InputWrapper width={[1, 0.5]}>
            <span>Phone Number</span>
            <Box>
              <PhoneInput
                formData={employeeDetails.telephone}
                onChange={handleMemberChange}
                hideLabel
                required={!!employeeDetails.telephone}
              />
            </Box>
          </InputWrapper>
          <InputWrapper width={[1, 0.5]}>
            <span>Job Title</span>
            <FormControl
              placeholder="Job Title"
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={employeeDetails.jobTitle}
              onChange={handleMemberChange}
              minLength={1}
              autoComplete="no"
              autoCorrect="off"
            />
          </InputWrapper>
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
          <InputWrapper>
            <span>Email</span>
            <FormControl
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              value={employeeDetails.email}
              onChange={handleMemberChange}
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
              minLength={1}
              autoComplete="no"
              autoCorrect="off"
            />
          </InputWrapper>
        </Flex>
        <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
          <InputWrapper>
            <span>Job Description</span>
            <FormControlTextArea
              placeholder="Job Description"
              type="text"
              name="description"
              id="description"
              value={employeeDetails.description}
              onChange={handleMemberChange}
              minLength={1}
              maxLength={500}
              autoComplete="no"
              autoCorrect="off"
            />
          </InputWrapper>
        </Flex>
        <ButtonContainer>
          {pendingSave && (
            <Box alignSelf="center" mr={2}>
              <Spinner size={16} mr={2} />
            </Box>
          )}
          <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" type="submit">save</Button>
        </ButtonContainer>
      </Form>
    </TeamMemberWrapper>
  );
};

TeamMemberForm.defaultProps = {
  formData: [{
    memberInformation: {
      honorificPrefix: '',
      givenName: '',
      familyName: '',
      honorificSuffix: '',
      description: '',
      jobTitle: '',
      email: '',
      telephone: {},
    },
  }],
};

TeamMemberForm.propTypes = {
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      memberInformation: PropTypes.shape({
        honorificPrefix: PropTypes.string,
        givenName: PropTypes.string,
        familyName: PropTypes.string,
        honorificSuffix: PropTypes.string,
        description: PropTypes.string,
        jobTitle: PropTypes.string,
        email: PropTypes.string,
        telephone: PropTypes.shape({}),
      }),
    }),
  ),
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default TeamMemberForm;
