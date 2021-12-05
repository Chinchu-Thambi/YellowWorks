import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../Spinner';

const PaymentWrapper = Loadable({
  loader: () => import('./PaymentWrapper'),
  loading: Spinner,
});

/**
 * withPayment provides an async PaymentWrapper.
* @param {React.Component} Wrapped
*/

const withPayment = (Wrapped) => (props) => (
  <PaymentWrapper>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Wrapped {...props} />
  </PaymentWrapper>
);

export default withPayment;
