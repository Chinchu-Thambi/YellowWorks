import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AuthContext from '../../../../../../../components/Auth';

const endpoint = process.env.GATSBY_PRODUCT_API_ENDPOINT ?? process.env.STORYBOOK_PRODUCT_API_ENDPOINT;

const CONNECT_SHOPIFY_QUERY = `
mutation ConnectShopify (
  $code: String!
  $hmac: String!
  $shop: String!
  $state: String!
  $timestamp: String!
  $customerId: ID
  ) {
  connectShopify(
    input: {
      code: $code,
      hmac: $hmac,
      shop: $shop,
      state: $state,
      timestamp: $timestamp,
    }, 
    customerId: $customerId) {
    providerConfiguration {
      shopify {
        status
      }
    }
  }
}
`;

const Confirm = (props) => {
  const { location: { search } } = props;

  const authState = React.useContext(AuthContext) ?? {};
  const [confirmationStatus, setConfirmationStatus] = React.useState('PENDING');

  React.useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const variables = {
      code: searchParams.get('code'),
      hmac: searchParams.get('hmac'),
      shop: searchParams.get('shop'),
      state: searchParams.get('state'),
      timestamp: searchParams.get('timestamp'),
      customerId: authState.customerId,
    };

    const postConfirmation = async () => {
      const parseStatusFromResponse = (response) => response.data.connectShopify?.providerConfiguration.shopify.status;

      const response = await axios.post(
        endpoint,
        { query: CONNECT_SHOPIFY_QUERY, variables },
        {
          headers: {
            Authorization: authState.jwtToken,
          },
        },
      );

      const localStatus = parseStatusFromResponse(response);

      if (localStatus) {
        setConfirmationStatus(localStatus);
      } else {
        setConfirmationStatus('ERROR');
      }
    };

    postConfirmation();
  }, [authState.businessId, authState.customerId, authState.jwtToken, search]);

  return (
    <>
      <h4>Confirm Shopify</h4>
      {confirmationStatus === 'PENDING' && (
        <p>
          We are finishing up your setup.
        </p>
      )}
      {confirmationStatus === 'CONNECTED' && (
        <p>
          All done!
        </p>
      )}
      {confirmationStatus === 'ERROR' && (
        <p>
          There was an error with your confirmation, please try again or contact support.
        </p>
      )}
    </>
  );
};

Confirm.defaultProps = {
  location: {},
};

Confirm.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

export default Confirm;
