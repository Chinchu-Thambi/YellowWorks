
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AuthContext from '../../../../../../../components/Auth';
import BusinessContext from '../../../../../services/BusinessContext';

const endpoint = process.env.GATSBY_PRODUCT_API_ENDPOINT ?? process.env.STORYBOOK_PRODUCT_API_ENDPOINT;

const INSTALL_SHOPIFY_QUERY = `
mutation InstallShopify (
  $hmac: String!
  $shop: String!
  $timestamp: String!
  $businessId: ID!
  $customerId: ID
) {
  installShopify(
    input: {hmac: $hmac, shop: $shop, timestamp: $timestamp}, 
    businessId: $businessId, 
    customerId: $customerId)
}
`;

const Install = (props) => {
  const { location: { search } } = props;

  const authStore = React.useContext(AuthContext) ?? {};
  const businessStore = React.useContext(BusinessContext) ?? {};
  const [missingParameters, setMissingParameters] = React.useState([]);

  // get shopify installing url and redirect to it
  React.useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const variables = {
      hmac: searchParams.get('hmac'),
      shop: searchParams.get('shop'),
      timestamp: searchParams.get('timestamp'),
      businessId: businessStore.businessId,
      customerId: authStore.customerId,
    };

    const localMissingParameters = Object.entries({
      ...variables,
      token: authStore.jwtToken,
    })
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (localMissingParameters.length > 0) {
      setMissingParameters(localMissingParameters);
      return;
    }

    const getInstallShopifyUrl = async () => {
      const parseUrlFromResponse = (response) => response.data.installShopify;

      const query = INSTALL_SHOPIFY_QUERY;

      const response = await axios.post(
        endpoint,
        { query, variables },
        {
          headers: {
            Authorization: authStore.jwtToken,
          },
        },
      );

      const shopifyUrl = parseUrlFromResponse(response);

      if (shopifyUrl) {
        window.location.assign(shopifyUrl);
      }
    };

    getInstallShopifyUrl();
  }, [authStore.customerId, authStore.jwtToken, businessStore.businessId, search]);

  if (missingParameters.length > 0) {
    return (
      <>
        <p>
          We can&#39;t redirect you because the following parameters are missing:
        </p>
        <ul>
          {missingParameters.map((parameter) => (
            <li key={parameter}>{parameter}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      Redirecting you to Shopify App authorisation page.
    </>
  );
};

Install.defaultProps = {
  location: {},
};

Install.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

export default Install;
