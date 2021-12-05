import React from 'react';
import * as R from 'ramda';
import { Box, Flex } from 'rebass';
import Select from 'react-select/async';
import { navigate } from '@reach/router';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

import getPhoneConfig from '../../../../../../services/getPhoneConfig';
import { useLocalStorage } from '../../../../../../util';
import clearSubscriptionFormData from '../../../../../../util/clearSubscriptionFormData';

import CheckCircle from '../../../../../../components/CheckCircle';
import Button from '../../../../../../components/Button';
import PhoneInput from '../../../../../../components/PhoneInput';
import Spinner from '../../../../../../components/Spinner';

import submitFormData from '../../services/submitFormData';
import {
  ButtonContainer, CallbackWrapper, CheckboxWrapper, ErrorMessage, CheckWrapper, Label,
} from '../../Styled';

const timeOptions = [
  { label: 'Morning', value: 'Morning' },
  { label: 'Afternoon', value: 'Afternoon' },
  { label: 'Evening', value: 'Evening' },
];

const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

const teamMemberIsAvailable = () => {
  const currentTime = new Date().getHours();
  const currentDay = new Date().getDay();
  const isWeekday = currentDay !== 6 && currentDay !== 0; // 6 is Saturday, 0 is Sunday
  return currentTime >= 9 && currentTime < 17 && isWeekday; // between 9am and 5pm
};

const BookCallback = ({ startBudget }) => {
  const [searchAdsFormData, setSearchAdsFormData] = useLocalStorage('productBrief', null);
  const formData = searchAdsFormData || null;
  const [selectedTimeframe, setSelectedTimeframe] = React.useState(teamMemberIsAvailable() ? 'NOW' : 'Later');
  const [selectedTimeslot, setSelectedTimeslot] = React.useState(formData?.timeslot || undefined);
  const [selectedDays, setSelectedDays] = React.useState(formData?.days || []);
  const [errors, setErrors] = React.useState([]);
  const [phoneNumber, setPhoneNumber] = React.useState({ areaCode: '3', number: '' });
  const phoneConfig = getPhoneConfig(phoneNumber?.areaCode);
  const phoneNumberValidator = new RegExp(`^\\d{${phoneConfig?.minLength},${phoneConfig?.maxLength}}$`);
  const phoneWarningMessage = 'Please enter a valid phone number.';
  const selectionWarningMessage = 'Please choose a preferred time and at least one preferred day.';
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleTimeChange = ({ value }) => {
    const newTimeslot = { label: value, value };
    setErrors([]);
    setSelectedTimeslot(newTimeslot);
    setSearchAdsFormData({
      ...formData,
      timeslot: newTimeslot,
    });
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    setErrors([]);
    if (R.includes(value, selectedDays)) {
      const updatedOptions = R.reject((selection) => selection === value)(selectedDays);
      setSelectedDays(updatedOptions);
      setSearchAdsFormData({
        ...formData,
        days: updatedOptions,
      });
      return;
    }
    const newSelectedDays = [...selectedDays, value];
    setSelectedDays(newSelectedDays);
    setSearchAdsFormData({
      ...formData,
      days: newSelectedDays,
    });
  };

  const checkPhoneNumberValidity = (number) => phoneNumberValidator.test(number?.trim());

  const checkValidity = () => {
    if (selectedTimeframe === 'NOW') {
      return true;
    }
    return selectedTimeslot && selectedDays.length > 0;
  };

  const handleSave = async () => {
    const phoneValid = checkPhoneNumberValidity(phoneNumber?.number);
    const selectionValid = checkValidity();
    const newErrors = [];
    const newFormData = {
      ...formData,
      phone: phoneNumber,
      timeframe: selectedTimeframe || 'NOW',
      startBudget,
    };
    if (!phoneValid) {
      newErrors.push(phoneWarningMessage);
    }
    if (!selectionValid) {
      newErrors.push(selectionWarningMessage);
    }
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setPendingSave(true);
    setSearchAdsFormData({
      ...newFormData,
    });
    const response = await submitFormData({ ...newFormData });
    if (!response.errors) {
      clearSubscriptionFormData();
      navigate('/our-products/product-brief/search-ads/done');
    } else {
      console.log(response.errors);
      response.errors.forEach((error) => NotificationManager.error(error));
    }
    setPendingSave(false);
  };

  const handleChangeNumber = (value) => {
    setErrors([]);
    setPhoneNumber(value);
    setSearchAdsFormData({
      ...formData,
      phone: value,
    });
  };

  const handleChangeTimeframe = (value) => {
    setSelectedTimeframe(value);
    setSearchAdsFormData({
      ...formData,
      timeframe: value,
    });
  };

  return (
    <CallbackWrapper>
      <Flex alignItems="center" justifyContent="flex-start" margin="auto" mb={3} flexDirection={['column', null, null, 'row']}>
        <Label>Add your number</Label>
        <Box as="div" maxWidth="100%" alignSelf="flex-start">
          <PhoneInput
            onChange={handleChangeNumber}
            formData={phoneNumber}
            hideLabel
            required
          />
        </Box>
      </Flex>
      {teamMemberIsAvailable() && (
        <Flex textAlign="left" justifyContent="flex-start" margin="auto" mb={3} flexDirection={['column', null, null, 'row']}>
          <Label>Select when to receive a call</Label>
          <CheckWrapper>
            <CheckCircle label="Now" value="NOW" checked={selectedTimeframe === 'NOW'} onChange={handleChangeTimeframe} />
          </CheckWrapper>
          <CheckWrapper>
            <CheckCircle label="Later" value="Later" checked={selectedTimeframe === 'Later'} onChange={handleChangeTimeframe} />
          </CheckWrapper>
        </Flex>
      )}
      {selectedTimeframe === 'Later' && (
        <>
          <Flex textAlign="left" justifyContent="flex-start" margin="auto" mb={3} flexDirection={['column', null, null, 'row']}>
            <Label>Select best time</Label>
            <Box width={['100%', null, null, '70%']}>
              <Select
                id="timeslot"
                placeholder="Select the best time..."
                defaultOptions={timeOptions}
                onChange={handleTimeChange}
                value={selectedTimeslot}
              />
            </Box>
          </Flex>
          <Flex textAlign="left" justifyContent="flex-start" margin="auto" mb={3} flexDirection={['column', null, null, 'row']}>
            <Label>Select best days</Label>
            <Flex flexDirection="column">
              {dayOptions?.map((day) => (
                <>
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      id={day}
                      value={day}
                      checked={selectedDays.includes(day)}
                      onChange={handleDayChange}
                    />
                    <label htmlFor={day}>{day}</label>
                  </CheckboxWrapper>
                </>
              ))}
            </Flex>
          </Flex>
        </>
      )}
      {errors.length > 0 && errors.map((error) => <ErrorMessage>{error}</ErrorMessage>)}
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">Book Callback</Button>
      </ButtonContainer>
    </CallbackWrapper>
  );
};

BookCallback.propTypes = {
  startBudget: PropTypes.shape({
    cost: PropTypes.number,
    clicks: PropTypes.number,
    leads: PropTypes.number,
    impressions: PropTypes.number,
  }).isRequired,
  budget: PropTypes.shape({
    cost: PropTypes.number,
    clicks: PropTypes.number,
    leads: PropTypes.number,
    impressions: PropTypes.number,
  }).isRequired,
};

export default BookCallback;
