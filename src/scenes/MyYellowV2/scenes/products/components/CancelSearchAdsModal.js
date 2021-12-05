import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select/async';
import { Box } from 'rebass';

import AuthContext from '../../../../../components/Auth/AuthContext';

import {
  ButtonContainer, EditWrapper, Instruction, ErrorMessage,
} from './Styled';

import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import submitCloseRequest from '../../../../MyYellow/services/submitCloseRequest';

const reasons = [
  { label: 'I want to change or amend my campaign', value: 'Change campaign' },
  { label: 'I want to change or amend my budget', value: 'Change budget' },
  { label: "I've finished with my current promotion", value: 'Promotion finished' },
  { label: "I'm unhappy with the results I'm getting from my campaign", value: 'Unhappy with campaign results' },
  { label: 'The business is permanently closing', value: 'Permanent Closure' },
  { label: 'Other reason', value: 'Other reason' },
];

const CancelSearchAdsModal = ({ onDismiss, subscriptionId }) => {
  const {
    customerId, state,
  } = React.useContext(AuthContext) || {};
  const email = state?.user?.attributes?.email;
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState();
  const [showRetentionMessage, setShowRetentionMessage] = React.useState(false);
  const isPermanentClosure = selectedReason?.value === 'Permanent Closure';

  const handleReasonChange = (newReason) => {
    setHasErrors(false);
    setSelectedReason(newReason);
  };

  const handleSave = async () => {
    setPendingSave(true);
    if (selectedReason) {
      try {
        const success = await submitCloseRequest({
          email,
          companyId: customerId,
          reason: selectedReason,
          subscriptionId,
        }, 'searchAds');
        if (success) {
          NotificationManager.success('Request for cancellation was successfully sent.');
        }
      } catch (error) {
        console.log(error);
      }
      if (isPermanentClosure) {
        onDismiss();
      }
      setShowRetentionMessage(true);
    } else {
      setHasErrors(true);
    }
    setPendingSave(false);
  };

  return (
    <EditWrapper>
      {!showRetentionMessage ? (
        <>
          <Instruction>Your Search Ads Campaign will be queued for cancellation. A member of our team will be in touch to confirm your request.</Instruction>
          <Box marginY={4}>
            <Select
              id="closure-reason"
              placeholder="Please choose a cancellation reason..."
              defaultOptions={reasons}
              onChange={handleReasonChange}
              value={selectedReason}
            />
          </Box>
        </>
      ) : (
        <Instruction>A member of our team will be in touch to confirm your request.</Instruction>
      )}
      {hasErrors && <ErrorMessage>Please select a reason</ErrorMessage>}
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
              <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" variant="tertiary" outline="true">Request Cancellation</Button>
            </Box>
          </>
        )}
      </ButtonContainer>
    </EditWrapper>
  );
};

CancelSearchAdsModal.defaultProps = {
  onDismiss: () => { },
  subscriptionId: null,
};
CancelSearchAdsModal.propTypes = {
  onDismiss: PropTypes.func,
  subscriptionId: PropTypes.string,
};

export default CancelSearchAdsModal;
