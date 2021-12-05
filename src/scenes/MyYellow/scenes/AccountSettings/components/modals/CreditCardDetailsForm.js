import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';
import { Box } from 'rebass/styled-components';

import AuthContext from '../../../../../../components/Auth';
import Button from '../../../../../../components/Button';
import withPayment from '../../../../../../components/Payment/withPayment';
import PaymentForm from '../../../../../../components/Payment/PaymentForm';
import { PaymentContext } from '../../../../../../components/Payment/Context';
import { mediaBreakpointUp } from '../../../../../../util';

// Icons
import VisaIcon from '../../../../../../assets/icons/visa.svg';
import MasterCardIcon from '../../../../../../assets/icons/mastercard.svg';
import secureCheckoutIcon from '../../../../../../assets/icons/secure-checkout-icons.svg';

import updateDefaultPaymentMethod from '../../services/updateDefaultPaymentMethod';

const CardsLogoContainer = styled.div`
  text-align: center;

  img {
    width: auto;
    height: ${({ theme }) => theme.space[3]};
  }
`;

const SecureCheckoutImg = styled.img`
  max-width: 100%;
  display: inherit;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    width: 56%;
  }
`;

const SaveButtonContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: ${({ theme }) => theme.space[4]};
`;

const PaymentFormContainer = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const getErrorMessage = (error) => {
  if (!error?.message) {
    return 'An error occurred, please try again.';
  }
  if (error.param === 'payment_method_data[billing_details][name]') {
    return 'Name on Card is required.';
  }

  return error.message;
};

const CreditCardDetailsForm = ({ onSave }) => {
  const {
    state: paymentState,
    requestPaymentToken,
    handleCardSetup,
    reset,
  } = React.useContext(PaymentContext) || {};
  const { customerId, jwtToken } = React.useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    const response = await handleCardSetup();
    setIsSubmitting(false);

    if (response && !response.success) {
      const errMsg = getErrorMessage(response.error);
      NotificationManager.error(errMsg, '', 5000);
    }
  };

  // on component mount: setups stripe client token
  React.useEffect(() => {
    if (
      !paymentState.paymentMethodToken
      && !paymentState.isRequired
    ) {
      requestPaymentToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when all requirements are met, update payment and close modal
  React.useEffect(() => {
    let isMounted = true;
    const { status, paymentMethodToken } = paymentState;
    if (
      !isSubmitting
      && status === 'AUTHORIZED'
      && paymentMethodToken
      && customerId
      && jwtToken
    ) {
      const updatePaymentMethod = async () => {
        setIsSubmitting(true);
        await updateDefaultPaymentMethod({
          customerId,
          paymentMethodId: paymentMethodToken,
          jwtToken,
        });

        NotificationManager.success('Card details saved', '', 5000);
        onSave();
        reset();

        if (!isMounted) { return; }
        setIsSubmitting(false);
      };

      updatePaymentMethod();
    }
    return () => { isMounted = false; };
  }, [customerId, jwtToken, onSave, paymentState, reset, isSubmitting]);

  return (
    <div>
      <CardsLogoContainer>
        <img src={MasterCardIcon} alt="MasterCard" />
        <img src={VisaIcon} alt="Visa" />
      </CardsLogoContainer>
      <Box textAlign="center">
        <p>This will update the card on record used for all of your current subscriptions.</p>
      </Box>
      <PaymentFormContainer>
        <PaymentForm />
      </PaymentFormContainer>

      <div>
        <SecureCheckoutImg src={secureCheckoutIcon} alt="Visa" />
      </div>

      <SaveButtonContainer>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </Button>
      </SaveButtonContainer>
    </div>
  );
};

CreditCardDetailsForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default withPayment(CreditCardDetailsForm);
