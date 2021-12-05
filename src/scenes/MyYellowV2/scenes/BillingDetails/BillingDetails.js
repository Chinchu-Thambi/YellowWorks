import React from 'react';
import * as R from 'ramda';
import Axios from 'axios';

import AuthContext from '../../../../components/Auth';

import PaymentDetails from '../../../MyYellow/scenes/AccountSettings/components/PaymentDetails';
import Invoices from './components/Invoices/Invoices';

const BillingDetails = () => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [billingData, setBillingData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // load billing data
  React.useEffect(() => {
    if (jwtToken && !customerId) {
      setIsLoading(false);
      return;
    }

    if (
      !jwtToken
      || !customerId
    ) return;

    if (billingData) {
      return;
    }

    const getPaymentMethods = async () => {
      const query = `
    {
      getBillingAccountDetails(customerId:${customerId}) {
        billingAccount {
          companyName
          companyEmail
        }
        billingMethod {
          __typename
          id
          paymentMethods {
            ... on CreditCardPaymentMethod {
              card {
                brand
                expirationMonth
                expirationYear
                lastDigits
              }
            }
          }
        }
      }
    }
    `;

      const response = await Axios.post(
        process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
        { query },
        { headers: { Authorization: jwtToken } },
      );
      if (response.data && response.data.errors) {
        setErrors(response.data.errors);
        setBillingData(null);
        setIsLoading(false);
      } else {
        setErrors(null);

        const companyPath = ['data', 'data', 'getBillingAccountDetails', 'billingAccount'];
        const cardPath = ['data', 'data', 'getBillingAccountDetails', 'billingMethod', 'paymentMethods', 0, 'card'];
        const methodPath = ['data', 'data', 'getBillingAccountDetails', 'billingMethod'];

        setBillingData({
          company: {
            name: R.path([...companyPath, 'companyName'])(response),
            email: R.path([...companyPath, 'companyEmail'])(response),
          },
          billing: {
            type: R.path([...methodPath, '__typename'])(response),
            id: R.path([...methodPath, 'id'])(response),
          },
          card: {
            lastDigits: R.path([...cardPath, 'lastDigits'])(response),
            expirationMonth: R.path([...cardPath, 'expirationMonth'])(response),
            expirationYear: R.path([...cardPath, 'expirationYear'])(response),
            brand: R.path([...cardPath, 'brand'])(response),
          },
        });
        setIsLoading(false);
      }
    };

    getPaymentMethods();
  }, [customerId, billingData, jwtToken]);
  return (
    customerId && (
      <div className="space-y-3">
        <PaymentDetails
          billingData={billingData && billingData.billing}
          errors={errors}
          cardData={billingData && billingData.card}
          isLoading={isLoading}
          reloadDetails={() => {
            setBillingData(null);
            setIsLoading(true);
          }}
        />
        <Invoices />
      </div>
    )
  );
};

export default BillingDetails;
