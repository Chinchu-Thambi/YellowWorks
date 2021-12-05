import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import PhoneInput from '../../../../../../components/PhoneInput';
import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';
import getPhoneConfig from '../../../../../../services/getPhoneConfig';

import ProductContext from '../../../../services/ProductContext';

import {
  ButtonContainer, ErrorMessage, EditWrapper,
} from './Styled';

const PhoneNumber = ({
  onDismiss, path, canClear,
}) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const phoneConfig = getPhoneConfig(localData?.areaCode);
  const phoneNumberValidator = new RegExp(`^\\d{${phoneConfig?.minLength},${phoneConfig?.maxLength}}$`);

  const checkPhoneNumberValidity = (number) => phoneNumberValidator.test(number.trim());

  const warningMessage = phoneConfig?.minLength === phoneConfig?.maxLength
    ? `Phone number must contain ${phoneConfig?.maxLength} digits.`
    : `Phone number should only contain between ${phoneConfig?.minLength} and ${phoneConfig?.maxLength} digits.`;

  const handleChange = (updatedData) => {
    setHasErrors(false);

    setLocalData(updatedData);
  };

  const handleSave = async () => {
    if (checkPhoneNumberValidity(localData.number)) {
      setHasErrors(false);
      setPendingSave(true);
      const value = { areaCode: localData.areaCode, number: localData.number, countryCode: '64' };
      const { success } = await productState.saveData({
        path,
        data: value,
      });
      setPendingSave(false);
      if (success) {
        onDismiss();
      }
    } else {
      setHasErrors(true);
    }
  };

  const handleClear = async () => {
    setHasErrors(false);
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: null,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  return (
    <EditWrapper>
      <PhoneInput formData={localData || {}} onChange={handleChange} hideLabel />
      {hasErrors && <ErrorMessage>{warningMessage}</ErrorMessage>}
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        {canClear && <Button onClick={handleClear} disabled={pendingSave || undefined} size="sm" variant="tertiary" outline="true">Clear</Button>}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
      </ButtonContainer>
    </EditWrapper>
  );
};

PhoneNumber.defaultProps = {
  onDismiss: () => { },
  path: ['location', 'telephone'],
  canClear: false,
};
PhoneNumber.propTypes = {
  onDismiss: PropTypes.func,
  path: PropTypes.arrayOf(
    PropTypes.string,
  ),
  canClear: PropTypes.bool,
};

export default PhoneNumber;
