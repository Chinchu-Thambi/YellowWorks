import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box, Flex } from 'rebass';

import PhoneInput from '../../../../../../../components/PhoneInput';
import Button from '../../../../../../../components/Button';
import Spinner from '../../../../../../../components/Spinner';
import getPhoneConfig from '../../../../../../../services/getPhoneConfig';

import ProductContext from '../../../../../services/ProductContext';

import {
  ButtonContainer, ErrorMessage, Contact,
} from '../Styled';
import AuthContext from '../../../../../../../components/Auth';

const phoneTypes = {
  mobileNumber: [
    '20',
    '21',
    '22',
    '23',
    '24',
    '26',
    '27',
    '28',
    '29',
  ],
  tollFree: [
    '508',
    '800',
  ],
};

const formatNumber = (areaCode, number, isSpecial = false) => (isSpecial ? { number } : { countryCode: '64', areaCode, number });

const alternatePath = ['location', 'contactPoint'];
const primaryPath = ['location', 'telephone'];
const tollFreePath = ['location', 'tollFreeNumber'];
const mobilePath = ['location', 'mobileNumber'];
const basePath = ['location'];

const AllNumbers = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const { isStaff } = React.useContext(AuthContext) || {};
  const alternateNumberData = R.path(alternatePath)(productState?.formData) || [];
  const primaryNumber = { ...R.path(primaryPath)(productState?.formData), isPrimary: true };
  const tollFreeNumber = R.path(tollFreePath)(productState?.formData);
  const mobileNumber = R.path(mobilePath)(productState?.formData);

  const [errors, setErrors] = React.useState([]);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [addingActive, setAddingActive] = React.useState(false);

  const alternateNumbers = [];
  alternateNumberData.map((number) => alternateNumbers.push(number.telephone));
  const [numbers, setNumbers] = React.useState([
    primaryNumber,
    ...(mobileNumber?.areaCode ? [mobileNumber] : []), // Add Mobile number if not undefined
    ...(tollFreeNumber?.areaCode ? [tollFreeNumber] : []), // Add Mobile number if not undefined
    ...alternateNumbers,
  ]);

  const handleChange = (updatedData, index) => {
    setErrors([]);
    const updatedLocalData = [...numbers];
    updatedLocalData[index] = updatedData;
    setNumbers(updatedLocalData);
  };

  const handleAddNumber = () => {
    setErrors([]);
    const newArray = !numbers ? [{}] : [...numbers, {}];
    setNumbers(newArray);
    setAddingActive(false);
  };

  const handleRemove = (index) => {
    setErrors([]);
    const newArray = R.remove(index, 1)(numbers);
    setNumbers(
      newArray,
    );
    if (newArray.length === 0) {
      setAddingActive(true);
    } else {
      setAddingActive(false);
    }
  };

  const handleSave = async () => {
    const checkForErrors = () => {
      const errorsList = [];
      numbers.forEach((contact, i) => { // Checks each number for validity and raises errors based on its position
        const phoneConfig = getPhoneConfig(contact?.areaCode);
        const checkPhoneNumberValidity = (number) => RegExp(`^\\d{${phoneConfig?.minLength},${phoneConfig?.maxLength}}$`).test(number?.trim());
        const warningMessage = (phoneConfig?.minLength === phoneConfig?.maxLength
          ? `Phone number ${i + 1} must contain ${phoneConfig?.maxLength} digits.`
          : `Phone number ${i + 1} should only contain between ${phoneConfig?.minLength} and ${phoneConfig?.maxLength} digits.`);

        if (!checkPhoneNumberValidity(contact?.number)) {
          errorsList.push(!phoneConfig ? `Phone number ${i + 1} must have an area code selected.` : warningMessage);
        }
      });
      return errorsList;
    };

    const errorsList = checkForErrors();
    setErrors(errorsList);

    if (errorsList.length === 0) {
      const newPrimaryNumber = numbers[0];
      const isSpecial = (number) => number.areaCode === 'NONE';

      const newMobileNumber = numbers.find(
        (number) => number !== newPrimaryNumber && phoneTypes.mobileNumber.includes(number.areaCode),
      );
      const newTollFreeNumber = numbers.find(
        (number) => number !== newPrimaryNumber && phoneTypes.tollFree.includes(number.areaCode),
      );

      const formattedPrimaryNumber = formatNumber(newPrimaryNumber.areaCode, newPrimaryNumber.number, isSpecial(newPrimaryNumber));
      const formattedMobileNumber = newMobileNumber
        ? formatNumber(newMobileNumber.areaCode, newMobileNumber.number)
        : {};
      const formattedTollFreeNumber = newTollFreeNumber
        ? formatNumber(newTollFreeNumber.areaCode, newTollFreeNumber.number)
        : {};

      const newAlternates = R.reject(
        ((number) => number === newPrimaryNumber || number === newMobileNumber || number === newTollFreeNumber), numbers,
      );
      const filteredAlternates = [];
      newAlternates.forEach((alternate) => filteredAlternates.push(
        { contactType: 'Phone', telephone: formatNumber(alternate.areaCode, alternate.number) },
      ));

      setPendingSave(true);
      const newData = R.assocPath( // Replace primary number data
        primaryPath,
        formattedPrimaryNumber,
      )(R.assocPath( // Replace mobile number data
        mobilePath,
        formattedMobileNumber,
      )(R.assocPath( // Replace toll free number data
        tollFreePath,
        formattedTollFreeNumber,
      )(R.assocPath( // Replace alternate number data
        alternatePath,
        filteredAlternates,
      )(productState.formData))));

      const { success } = await productState.saveData({
        path: [basePath],
        data: newData.location,
      });

      setPendingSave(false);
      if (success) {
        onDismiss();
      }
    }
  };

  return (
    <Flex flexDirection="column" width={1}>
      {Array.isArray(numbers) && (
        numbers?.map((contact, index) => (
          <Contact key={index}>
            {index === 0 && <p>Primary Contact</p>}
            {index === 1 && <p>Additional Contacts</p>}
            <Flex
              justifyContent="space-between"
              alignItems="baseline"
              flexDirection={['column', null, null, 'row']}
              paddingBottom={['1rem']}
            >
              <PhoneInput formData={numbers[index]} onChange={(e) => handleChange(e, index)} hideLabel isStaff={isStaff} />
              {index !== 0 && (
              <Box alignSelf="flex-end">
                <Button
                  type="button"
                  onClick={() => handleRemove(index)}
                  variant="link"
                  size="sm"
                >Remove
                </Button>
              </Box>
              )}
            </Flex>
          </Contact>
        )))}
      {errors?.map((error) => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      {(!addingActive && numbers?.length < 8) || (!numbers) ? (
        <Button
          type="button"
          onClick={() => handleAddNumber(numbers?.length || 0)}
          variant="link"
          size="sm"
        >Add new phone number
        </Button>
      ) : null}
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">Save</Button>
      </ButtonContainer>
    </Flex>
  );
};

AllNumbers.defaultProps = {
  onDismiss: () => { },
};
AllNumbers.propTypes = {
  onDismiss: PropTypes.func,
};

export default AllNumbers;
