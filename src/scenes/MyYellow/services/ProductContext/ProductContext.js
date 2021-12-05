import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as R from 'ramda';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../../../../components/Auth/AuthContext';
import { useLocalStorage } from '../../../../util';

const ProductContext = React.createContext();
export default ProductContext;

export const ProductProvider = ({ children }) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [subscriptionId, setSubscriptionId] = React.useState(null);
  const [storageFormData, setStorageFormData] = useLocalStorage('storageFormData', null);
  const [storageOrderDetails, setStorageOrderDetails] = useLocalStorage('storageOrderDetails', null);
  const [storageFormDataExpiry, setStorageFormDataExpiry] = useLocalStorage('storageFormDataExpiry', {});
  const [isLoading, setIsLoading] = React.useState(false);
  const [storageErrors, setStorageErrors] = useLocalStorage('storageFormDataErrors', null);
  const formData = storageFormData?.[subscriptionId] || null;
  const orderDetails = storageOrderDetails?.[subscriptionId] || null;
  const expiryTime = storageFormDataExpiry?.[subscriptionId] || null;
  const errors = storageErrors?.[subscriptionId] || null;

  const expireFormData = React.useCallback(() => {
    delete storageFormDataExpiry[subscriptionId];
    setStorageFormDataExpiry({
      ...storageFormDataExpiry,
    });
  }, [setStorageFormDataExpiry, storageFormDataExpiry, subscriptionId]);

  const setExpiryDate = React.useCallback((delay) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + delay).toISOString();
    setStorageFormDataExpiry({
      ...storageFormDataExpiry,
      [subscriptionId]: futureDate,
    });
  }, [setStorageFormDataExpiry, storageFormDataExpiry, subscriptionId]);

  const saveData = async ({ path, data }) => {
    const updatedFormData = R.assocPath(
      path,
      data,
    )(formData);

    if (!R.equals(updatedFormData, formData)) {
      const query = `
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

      const variables = {
        subscriptionId,
        customerId,
        input: JSON.stringify(updatedFormData),
        publish: true,
      };

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      const submitProductBrief = R.compose(
        R.tryCatch(JSON.parse, () => ({})),
        R.path(['data', 'data', 'updateConfiguration']),
      )(response);

      if (submitProductBrief.error) {
        console.error('There was a problem with the user input.', {
          key: `subscription_${subscriptionId}`,
          variables,
          orderDetails,
        });
        NotificationManager.error('Input could not be saved.', '', 5000);
        return { success: false };
      }

      setStorageFormData({
        ...storageFormData,
        [subscriptionId]: updatedFormData,
      });

      const in3Seconds = 3 * 1000;
      setExpiryDate(in3Seconds);

      NotificationManager.success('Saved successfully.', '', 5000);

      return { success: true };
    }

    return { success: false };
  };

  // load formData
  React.useEffect(() => {
    // bare requirements for formData loading
    if (
      !jwtToken
      || !subscriptionId
      || isLoading
    ) return;

    // controls for data based loading necessity
    if (
      expiryTime && formData
    ) return;

    const tomorrow = (24 * 60 * 60 * 1000);
    setExpiryDate(tomorrow);
    setStorageErrors({
      ...storageErrors,
      [subscriptionId]: null,
    });

    const getSubscriptionContent = async () => {
      const query = `
        query getProductContextData($id: ID!, $customerId: ID!) {
          subscription(
            id: $id
            customerId: $customerId
          ) {
              id
              orderDetails {
                updated
                activated
                product {
                  sku
                  id
                  name
                  configuration
                  pricingPlan
                }
                productOptions {
                  name
                  id
                  sku
                  configuration
                  pricingPlan
                }
                providerData {
                  slug
                }
                status
                userSchema
              }
              productDetails {
                userConfiguration
                status
              }
              upcomingOrderDetails {
                updated
                activated
                product {
                  sku
                  id
                  name
                  configuration
                  pricingPlan
                }
                productOptions {
                  name
                  id
                  sku
                  configuration
                  pricingPlan
                }
                status
              }
            }
          }
      `;
      const variables = {
        id: subscriptionId,
        customerId,
      };

      if (expiryTime) {
        setStorageFormData({
          ...storageFormData,
          [subscriptionId]: undefined,
        });
        setStorageOrderDetails({
          ...storageOrderDetails,
          [subscriptionId]: undefined,
        });
      }
      setIsLoading(true);

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      if (response.data?.errors) {
        setStorageErrors({ [subscriptionId]: response.data.errors });
      }

      const orderDetailsData = R.path(['data', 'data', 'subscription', 'orderDetails'])(response);
      const userSchema = R.tryCatch(JSON.parse, () => {
        setStorageErrors({
          [subscriptionId]: [
            ...response.data.errors,
            {
              errorType: 'Schema parsing',
              message: 'Schema could not be parsed.',
            },
          ],
        });
        return null;
      })(orderDetailsData?.userSchema);
      orderDetailsData.userSchema = userSchema;

      const data = R.compose(
        R.tryCatch(JSON.parse, () => {
          setStorageErrors({
            [subscriptionId]: [
              ...response.data.errors,
              {
                errorType: 'Data parsing',
                message: 'Data could not be parsed.',
              },
            ],
          });
          return null;
        }),
        R.path(['data', 'data', 'subscription', 'productDetails', 'userConfiguration']),
      )(response);

      setStorageFormData({
        ...storageFormData,
        [subscriptionId]: data,
      });
      setStorageOrderDetails({
        ...storageOrderDetails,
        [subscriptionId]: orderDetailsData,
      });
      setIsLoading(false);
    };
    getSubscriptionContent();
  }, [customerId, expiryTime, formData, isLoading, jwtToken, orderDetails, setStorageErrors, setExpiryDate,
    setStorageFormData, setStorageOrderDetails, storageFormData, storageOrderDetails, subscriptionId, storageErrors]);

  // setup reload for existing expiration time
  React.useEffect(() => {
    if (!expiryTime) { return () => {}; }

    const now = new Date();
    const expiryDate = new Date(expiryTime);
    const delay = expiryDate - now;

    const timeout = setTimeout(() => {
      expireFormData();
    }, delay);

    return () => { clearTimeout(timeout); };
  }, [expireFormData, expiryTime]);

  // sets expiration time for pending listing
  React.useEffect(() => {
    if (!expiryTime) { return () => {}; }

    if (orderDetails?.status === 'PENDING') {
      const delay = 5000;
      const timeout = setTimeout(() => {
        expireFormData();
      }, delay);

      return () => { clearTimeout(timeout); };
    }

    return () => {};
  }, [expireFormData, expiryTime, orderDetails]);

  // sets expiration time for when an error happens
  React.useEffect(() => {
    if (!expiryTime) { return () => {}; }

    if (errors) {
      const in20Seconds = 20 * 1000;
      const timeout = setTimeout(() => {
        expireFormData();
      }, in20Seconds);

      return () => { clearTimeout(timeout); };
    }

    return () => {};
  }, [errors, expireFormData, expiryTime]);


  const productState = {
    // status
    subscriptionId,
    errors,

    // data
    formData,
    orderDetails,

    // action
    saveData,
    setSubscriptionId,
    expireFormData,
  };

  return (
    <ProductContext.Provider
      value={productState}
    >{children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
