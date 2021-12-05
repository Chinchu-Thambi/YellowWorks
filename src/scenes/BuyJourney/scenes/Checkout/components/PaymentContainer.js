import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../../../../components/Spinner';

import { fetchingStatus } from '../services/useCheckout';

import ComplexCustomerPayment from './ComplexCustomerPayment';
import ExistingCard from './ExistingCard';
import PaymentDetails from './PaymentDetails';
import { Separator } from './Styled';

const PaymentContainer = ({
  customerId,
  accountDetailsRequestStatus,
  isComplexCustomer,
  isPaymentAvailable,
  accountDetails,
}) => (
  <>
    {!customerId && <PaymentDetails />}
    {accountDetailsRequestStatus === fetchingStatus.fetching && <Spinner />}
    {accountDetailsRequestStatus === fetchingStatus.complete && (
      <>
        {
          // I'm disabling nested ternary because this was the best way to express the following:
          // eslint-disable-next-line no-nested-ternary
          isComplexCustomer ? ( // first check for isCustomerComplex
            <ComplexCustomerPayment /> // render the complex customer payment notice.
          ) : ( // otherwise
            isPaymentAvailable // checks if payment is available
              ? accountDetails?.billingMethod?.paymentMethods?.slice(0, 1).map(({ card }) => (
                <ExistingCard // and render the existing card
                  key={card.lastDigits}
                  brand={card.brand}
                  expirationMonth={card.expirationMonth}
                  expirationYear={card.expirationYear}
                  lastDigits={card.lastDigits}
                />
              )) // if no account is found (complex customer) and no card is registered
              : <PaymentDetails /> // ask for payment details.
          )
        }
      </>
    )}
    <Separator />
  </>
);

PaymentContainer.defaultProps = {
  customerId: undefined,
  accountDetailsRequestStatus: undefined,
  isComplexCustomer: undefined,
  isPaymentAvailable: undefined,
  accountDetails: undefined,
};

PaymentContainer.propTypes = {
  customerId: PropTypes.string,
  accountDetailsRequestStatus: PropTypes.string,
  isComplexCustomer: PropTypes.bool,
  isPaymentAvailable: PropTypes.bool,
  accountDetails: PropTypes.shape({
    billingMethod: PropTypes.shape({
      paymentMethods: PropTypes.arrayOf(PropTypes.shape({
        card: PropTypes.shape({
          lastDigits: PropTypes.string,
          brand: PropTypes.string,
          expirationMonth: PropTypes.number,
          expirationYear: PropTypes.number,
        }),
      })),
    }),
  }),
};

export default PaymentContainer;
