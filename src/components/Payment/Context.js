import React from 'react';
import axios from 'axios';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import AuthContext from '../Auth/AuthContext';
import { billingClient } from '../../services/graphql';

const QUERY_ACCOUNT = gql`
  query paymentMethodId ($customerId:ID!) {
    getBillingAccountDetails(customerId:$customerId) {
      billingMethod {
        paymentMethods {
          __typename
          id
          default
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

const getPaymentMethod = async ({ jwtToken }) => {
  const { data: { data, errors } } = await axios.post(
    `${process.env.GATSBY_APPSYNC_URL}`,
    {
      query: `mutation createPaymentRegistrationToken{
        createPaymentRegistrationToken(input:{id: 0}) {
          clientSecret
          paymentMethod
        }
      }`,
    },
    { headers: { Authorization: jwtToken } },
  );

  if (errors) {
    // eslint-disable-next-line no-console
    console.error(errors);
    throw errors;
  }

  return data.createPaymentRegistrationToken;
};

const getCurrentPaymentMethod = async ({
  jwtToken, setState,
}) => {
  try {
    const result = await getPaymentMethod({ jwtToken });

    if (result.payment_method) {
      setState({
        status: 'AUTHORIZED',
        paymentMethod: result.paymentMethod,
        clientSecret: null,
      });
    } else {
      setState({
        status: 'AUTHORIZING',
        paymentMethod: null,
        clientSecret: result.clientSecret,
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    setState({
      status: 'AUTHORIZING',
      paymentMethod: null,
      clientSecret: null,
      error: e,
    });
  }
};

export const PaymentContext = React.createContext();

const initialState = {
  status: 'AUTHORIZING',
  paymentMethodToken: null,
  clientSecret: null,
  isRequired: false,
};

let providerValue;

const PaymentProvider = ({ stripe, children }) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [cardholder, setCardholder] = React.useState('');
  const [state, setState] = React.useState(initialState);
  const [billingMethod, setBillingMethod] = React.useState({});
  const defaultPaymentMethod = billingMethod?.paymentMethods?.find(
    R.prop('default'),
  );
  const isComplexCustomer = billingMethod?.__typename === 'ComplexBillingMethod';

  const accountQuery = useQuery(
    QUERY_ACCOUNT,
    {
      variables: { customerId },
      context: { headers: { Authorization: jwtToken } },
      client: billingClient,
    },
  );

  const confirmSetupIntent = (paymentMethodToken) => {
    setState({
      status: 'AUTHORIZED',
      paymentMethodToken,
    });
  };

  const handleCardSetup = async () => {
    const { setupIntent, error } = await stripe.handleCardSetup(
      state.clientSecret,
      {
        payment_method_data: {
          billing_details: { name: cardholder },
        },
      },
    );

    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return { error };
    }

    confirmSetupIntent(setupIntent.payment_method);

    return { success: true, paymentMethodToken: setupIntent.payment_method };
  };

  const requestPaymentToken = () => {
    setState({
      ...state,
      isRequired: true,
    });
  };

  const reset = () => {
    setState(initialState);
    accountQuery.refetch();
  };

  // Gets initial payment state
  React.useEffect(() => {
    if (jwtToken && state.isRequired) {
      getCurrentPaymentMethod({
        jwtToken,
        setState,
      });
    }
  }, [jwtToken, state.isRequired]);

  React.useEffect(() => {
    if (customerId && jwtToken) {
      const data = accountQuery.data?.getBillingAccountDetails?.billingMethod;
      setBillingMethod(data);
    }
  }, [accountQuery, customerId, jwtToken]);

  providerValue = {
    confirmSetupIntent,
    handleCardSetup,
    cardholder,
    setCardholder,
    requestPaymentToken,
    state,
    reset,
    billingMethod,
    defaultPaymentMethod,
    isComplexCustomer,
  };

  return (
    <PaymentContext.Provider value={providerValue}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.defaultProps = {
  stripe: null,
};

PaymentProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  stripe: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default injectStripe(PaymentProvider);
