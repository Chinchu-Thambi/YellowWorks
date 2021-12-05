import axios from 'axios';
import * as R from 'ramda';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import mapPricingPlan from './mapPricingPlan';
import { infoText } from '../../../../../util';

const orderProcessor = async ({
  product,
  productOptions,
  customerId,
  promotionCode,
  paymentMethodId,
  userDetails,
  companyDetails,
  jwtToken,
}) => {
  const query = `
  mutation createSubscription(
    $product: ProductInput!
    $productOptions: [ProductInput!]
    $customerId: ID
    $promotionCode: String
    $paymentMethodId: ID
    $customerDetails: CustomerDetailsInput
  ) {
    createSubscription (
      product: $product
      productOptions: $productOptions
      customerId: $customerId
      promotionCode: $promotionCode
      paymentMethodId: $paymentMethodId 
      customerDetails: $customerDetails
    ) {
        id
        details {
          provider
        }
        orderDetails {
          updated
          activated
          customerOrderId
          product {
            sku
            id
            name
            configuration
          }
          productOptions {
            name
            id
            sku
            configuration
          }
        }
        productDetails {
          userConfiguration
          status
        }
      }
    }
  `;
  const variables = {
    product: mapPricingPlan(product),
    productOptions: productOptions.map(mapPricingPlan),
    customerId,
    promotionCode,
    paymentMethodId,
    customerDetails: { ...userDetails },
  };

  // Next three blocks assemble full customerDetails from entries
  if (companyDetails?.companyName) {
    variables.customerDetails = {
      companyName: companyDetails.companyName,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    };
  }

  if (companyDetails?.phone?.areaCode && companyDetails?.phone?.number) {
    variables.customerDetails = {
      ...variables.customerDetails,
      phone: companyDetails.phone,
    };
  }

  if (companyDetails?.address?.streetAddress && companyDetails?.address?.postalCode) {
    variables.customerDetails = {
      ...variables.customerDetails,
      address: {
        ...companyDetails.address,
        country: 'NZ',
      },
    };
  }
  // Clears stored notifications to prevent caching of notification messages
  NotificationManager.listNotify = [];
  NotificationManager.success(infoText.submit, '', 5000);

  const {
    data,
  } = await axios.post(
    process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
    { query, variables },
    { headers: { Authorization: jwtToken } },
  );
  const subscription = R.path(['data', 'createSubscription'])(data);
  if (data.errors) {
    throw data.errors;
  }
  return { subscription };
};

export default orderProcessor;
