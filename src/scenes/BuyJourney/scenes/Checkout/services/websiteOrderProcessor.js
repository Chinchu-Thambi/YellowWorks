import axios from 'axios';
import * as R from 'ramda';
import NotificationManager from 'react-notifications/lib/NotificationManager';

import { infoText } from '../../../../../util';

import mapGoogleAddressToAddressInput from './mapGoogleAddressToAddressInput';

const websiteOrderProcessor = async ({
  product,
  productOptions,
  customerId,
  businessId,
  promotionCode,
  paymentMethodId,
  userDetails,
  companyDetails,
  jwtToken,
}) => {
  const query = `
  mutation createProductSubscription(
    $input: CreateProductSubscriptionInput!
    $customerId: ID
  ) {
    createProductSubscription (
      input: $input
      customerId: $customerId
    ) {
        id
        provider
        orders(last: 1) {
          edges {
            node {
              product {
                configuration
                id
                name
                sku
              }
              productOptions {
                configuration
                id
                name
                sku
              }
            }
          }
        }
      }
    }
  `;

  // Next three blocks assemble full customerDetails from entries
  let customerDetails = {};
  if (companyDetails?.companyName) {
    customerDetails = {
      companyName: companyDetails.companyName,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    };
  }

  if (companyDetails?.phone?.areaCode && companyDetails?.phone?.number) {
    customerDetails = {
      ...customerDetails,
      phone: companyDetails.phone,
    };
  }

  if (companyDetails?.address?.streetAddress && companyDetails?.address?.postalCode) {
    customerDetails = {
      ...customerDetails,
      address: (mapGoogleAddressToAddressInput(companyDetails.address)),
      geo: companyDetails.geo,
    };
  }
  // Clears stored notifications to prevent caching of notification messages
  NotificationManager.listNotify = [];
  NotificationManager.success(infoText.submit, '', 5000);

  const variables = {
    customerId,
    input: {
      businessId,
      customerDetails,
      promotionCode,
      paymentMethodId,
      product: {
        id: product.pricingPlan.id,
      },
      productOptions: productOptions.map((option) => ({ id: option.pricingPlan.id })),
    },
  };

  const {
    data,
  } = await axios.post(
    process.env.GATSBY_PRODUCT_API_ENDPOINT,
    { query, variables },
    { headers: { Authorization: jwtToken } },
  );
  const subscription = R.path(['data', 'createProductSubscription'])(data);
  if (data.errors) {
    throw data.errors;
  }
  return { subscription };
};

export default websiteOrderProcessor;
