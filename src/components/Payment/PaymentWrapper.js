/* globals window, document */

import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { PaymentProvider } from '.';
import { PaymentContext } from './Context';

const PaymentWrapper = ({ children }) => {
  const paymentStore = React.useContext(PaymentContext);
  const [stripe, setStripe] = React.useState(null);

  React.useEffect(() => {
    const loadStripe = () => { setStripe(window?.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)); };

    if (!window?.Stripe) {
      const stripeScript = document.querySelector('#stripe-js');
      if (stripeScript) {
        stripeScript.addEventListener('load', loadStripe);
        return () => { stripeScript.removeEventListener('load', loadStripe); };
      }
      return () => {};
    }

    loadStripe();
    return () => {};
  }, []);

  // in case PaymentContext is already wrapping this component we don't want to wrap it again
  if (paymentStore) {
    return children;
  }

  return (
    <StripeProvider stripe={stripe}>
      <Elements
        fonts={[
          { cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat:400' },
        ]}
      >
        <PaymentProvider>
          {children}
        </PaymentProvider>
      </Elements>
    </StripeProvider>
  );
};

PaymentWrapper.defaultProps = {
  children: null,
};

PaymentWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PaymentWrapper;
