import React from 'react';
import * as R from 'ramda';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useLocalStorage } from '../../util';

import AuthContext from '../../components/Auth';

const submitSchemaQuery = `
  mutation submitSchema(
    $subscriptionId: ID!
    $customerId: ID!
    $input: AWSJSON!
    $publish: Boolean!
  ) {
    updateConfiguration(
      subscriptionId: $subscriptionId
      customerId: $customerId
      input: $input
      publish: $publish
    )
  }
`;

const useProductSchemaFufillment = (successfulOrder = {}) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [brief] = useLocalStorage('productBrief', null);
  const [submitted, setSubmitted] = React.useState(false);
  const isSearchAds = R.pathEq(['orderDetails', 'product', 'sku'], 'SEARCHADS')(successfulOrder);
  const isPrint = R.pathEq(['details', 'provider'], 'PRINT')(successfulOrder);

  const submitSchema = React.useCallback(async ({ id }) => {
    const formData = brief || null;
    let input = {};

    if (isSearchAds) {
      input = JSON.stringify({
        categories: formData?.filteredCategories,
        location: {
          areaServed: { region: formData?.targetLocation?.regions },
          email: formData?.email,
          address: formData?.location?.location?.address,
          proximity: formData?.targetLocation?.radius,
          telephone: formData?.primaryPhoneNumber,
          secondaryPhone: formData?.additionalPhoneNumber,
        },
        businessProfile: {
          url: formData?.targetLandingPage?.url,
        },
      });
    }

    if (isPrint) {
      input = JSON.stringify({
        categories: [formData?.book?.classification],
        location: {
          address: formData?.location?.address,
          telephone: formData?.primaryPhoneNumber,
          email: formData?.email,
          secondaryTelephone: formData?.additionalPhoneNumber,
        },
        businessProfile: {
          name: formData?.name,
          url: formData?.url,
        },
      });
    }

    const variables = {
      subscriptionId: id,
      customerId,
      input,
      publish: true,
    };

    const response = await axios.post(
      process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
      { query: submitSchemaQuery, variables },
      { headers: { Authorization: jwtToken } },
    );

    const { data: { data, error } } = response;
    if (error) {
      console.log(error);
      NotificationManager.error('Details not saved', '', 5000);
      return error;
    }
    return data;
  }, [brief, isPrint, isSearchAds, customerId, jwtToken]);

  React.useEffect(() => {
    if (customerId && successfulOrder && !submitted) {
      setSubmitted(true);

      if ((isSearchAds || isPrint) && successfulOrder) {
        submitSchema({ id: successfulOrder?.id });
      }
    }
  }, [customerId, isSearchAds, isPrint, submitSchema, submitted, successfulOrder]);

  const fulfillmentStore = {
    submitted,
  };

  return fulfillmentStore;
};

export default useProductSchemaFufillment;
