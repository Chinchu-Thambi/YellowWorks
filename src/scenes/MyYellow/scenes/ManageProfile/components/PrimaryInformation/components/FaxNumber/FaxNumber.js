import React from 'react';
import * as R from 'ramda';

import { Box } from 'rebass';
import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';
import Spinner from '../../../../../../../../components/Spinner';
import Button from '../../../../../../../../components/Button';
import Modal from '../../../../../../../../components/Modal';
import PhoneInput from '../../../../../../../../components/PhoneInput';

import faxIcon from '../../../../../../../../assets/icons/light/fax.svg';

import ProductContext from '../../../../../../services/ProductContext';
import getPhoneConfig from '../../../../../../../../services/getPhoneConfig';

import {
  ButtonContainer, ErrorMessage,
} from '../../../modals/Styled';

import EditWrapper from './FaxNumber.styled';
import AuthContext from '../../../../../../../../components/Auth';

const path = ['location', 'faxNumber'];
const allowedAreaCodes = [
  '800',
  '900',
  '508',
  '3',
  '4',
  '6',
  '7',
  '9',
];

const FaxNumber = () => {
  const productState = React.useContext(ProductContext) || {};
  const { isStaff } = React.useContext(AuthContext) || {};
  const faxNumber = R.path(path)(productState.formData);

  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [localData, setLocalData] = React.useState(faxNumber);
  const [error, setError] = React.useState('');
  const [pendingSave, setPendingSave] = React.useState(false);

  const phoneConfig = getPhoneConfig(localData?.areaCode);
  const phoneNumberValidator = new RegExp(`^\\d{${phoneConfig?.minLength},${phoneConfig?.maxLength}}$`);

  const checkPhoneNumberValidity = (number) => phoneNumberValidator.test(number.trim());

  const warningMessage = phoneConfig?.minLength === phoneConfig?.maxLength
    ? `Phone number must contain ${phoneConfig?.maxLength} digits.`
    : `Phone number should only contain between ${phoneConfig?.minLength} and ${phoneConfig?.maxLength} digits.`;


  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
    setLocalData(faxNumber || '');
  };

  const handleChange = (e) => {
    setError('');
    setLocalData({ ...localData, ...e });
  };

  const handleSave = async () => {
    if (!localData.areaCode || !allowedAreaCodes.includes(localData.areaCode)) {
      setError('Area Code is invalid. If problem persists please contact our team.');
      return;
    }
    if (checkPhoneNumberValidity(localData.number)) {
      setError('');
      setPendingSave(true);
      const number = localData.areaCode ? { ...localData, countryCode: '64' } : null;
      const { success } = await productState.saveData({
        path,
        data: number,
      });
      setPendingSave(false);
      if (success) {
        toggleModal();
      }
    } else {
      setError(warningMessage);
    }
  };

  const handleRemove = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: null,
    });
    setPendingSave(false);
    if (success) {
      toggleModal();
    }
  };

  if (!isStaff) return null;

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={faxIcon}>Fax Number</LabelItem>
          <div>
            <ActionButton
              variant="link"
              size="sm"
              onClick={toggleModal}
            >
              Edit
            </ActionButton>
          </div>

        </OptionItem>
        {faxNumber && <OptionDetails> 0{faxNumber.areaCode}{faxNumber.number}</OptionDetails>}
      </ListItem>

      {modalVisibility && (
        <Modal
          title="Fax number"
          onDismiss={toggleModal}
          isVisible
        >
          <EditWrapper>
            <PhoneInput formData={localData || {}} onChange={handleChange} hideLabel />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonContainer>
              {pendingSave && (
                <Box alignSelf="center" mr={2}>
                  <Spinner size={16} mr={2} />
                </Box>
              )}
              <Button
                disabled={pendingSave}
                onClick={handleRemove}
                size="sm"
                variant="secondary"
              >remove
              </Button>
              <Button
                disabled={pendingSave}
                onClick={handleSave}
                size="sm"
              >save
              </Button>
            </ButtonContainer>
          </EditWrapper>
        </Modal>
      )}
    </>
  );
};

export default FaxNumber;
