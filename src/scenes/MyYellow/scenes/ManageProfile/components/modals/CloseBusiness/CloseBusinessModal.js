import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select/async';
import { Box } from 'rebass';

import AuthContext from '../../../../../../../components/Auth/AuthContext';

import {
  ButtonContainer, EditWrapper, Instruction, ErrorMessage, FormControl,
} from '../Styled';

import Button from '../../../../../../../components/Button';
import Spinner from '../../../../../../../components/Spinner';
import ProductContext from '../../../../../services/ProductContext';

import submitCloseRequest from '../../../../../services/submitCloseRequest';

const reasons = [
  { label: 'I cannot pay for my subscription anymore', value: 'Cannot pay' },
  { label: "I'm unhappy with the results I get from my Yellow Profile", value: 'Unhappy with Yellow' },
  { label: 'The business is permanently closing', value: 'Permanent Closure' },
  { label: 'Other reason', value: 'Other reason' },
];

const CloseBusinessModal = ({ onDismiss }) => {
  const {
    customerId, state,
  } = React.useContext(AuthContext) || {};
  const email = state?.user?.attributes?.email;
  const { subscriptionId } = React.useContext(ProductContext) || {};
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState();
  const [showRetentionMessage, setShowRetentionMessage] = React.useState(false);
  const [customReason, setCustomReason] = React.useState();
  const isPermanentClosure = selectedReason?.value === 'Permanent Closure';
  const isOtherReason = selectedReason?.value === 'Other reason';

  const handleReasonChange = (newReason) => {
    setHasErrors(false);
    setSelectedReason(newReason);
  };

  const handleSave = async () => {
    setPendingSave(true);
    const customReasonNotProvided = isOtherReason && !customReason;

    if (!selectedReason || customReasonNotProvided) {
      setHasErrors(true);
      setPendingSave(false);
      return;
    }
    try {
      const success = await submitCloseRequest({
        email,
        companyId: customerId,
        reason: selectedReason,
        subscriptionId,
        customReason,
      });
      if (success) {
        NotificationManager.success('Request to remove listing was successfully sent.');
      }
    } catch (error) {
      console.log(error);
    }
    if (isPermanentClosure) {
      onDismiss();
    }
    setShowRetentionMessage(true);
    setPendingSave(false);
  };

  return (
    <EditWrapper>
      {!showRetentionMessage ? (
        <>
          <Instruction>Your listing will be queued for removal from your account and yellow.co.nz.</Instruction>
          <Box marginY={4}>
            <Select
              id="closure-reason"
              placeholder="Please choose a removal reason..."
              defaultOptions={reasons}
              onChange={handleReasonChange}
              value={selectedReason}
            />
            {isOtherReason && (
              <Box as="div" marginTop={2}>
                <FormControl
                  placeholder="Reason for removal"
                  type="text"
                  value={customReason || ''}
                  onChange={(e) => {
                    setCustomReason(e.target.value);
                    setHasErrors(false);
                  }}
                  minLength={1}
                  size="30"
                  required
                />
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          <Instruction>A member of our team will be in touch to confirm your request.</Instruction>
        </>
      )}
      {hasErrors && <ErrorMessage>Please provide a reason for removal</ErrorMessage>}
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}

        {showRetentionMessage ? (
          <Box alignSelf="center" margin={2}>
            <Button onClick={onDismiss} size="sm" variant="tertiary" outline="true">Close</Button>
          </Box>
        ) : (
          <>
            <Box alignSelf="center" margin={2}>
              <Button onClick={onDismiss} disabled={pendingSave || undefined} size="sm" variant="secondary">Cancel</Button>
            </Box>
            <Box alignSelf="center" margin={2}>
              <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" variant="tertiary" outline="true">Request Removal</Button>
            </Box>
          </>
        )}
      </ButtonContainer>
    </EditWrapper>
  );
};

CloseBusinessModal.defaultProps = {
  onDismiss: () => { },
};
CloseBusinessModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default CloseBusinessModal;
