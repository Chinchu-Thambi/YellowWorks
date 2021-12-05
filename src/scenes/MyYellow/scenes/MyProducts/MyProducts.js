import React from 'react';
import axios from 'axios';
import * as R from 'ramda';

import AuthContext from '../../../../components/Auth';
import Spinner from '../../../../components/Spinner';

import Notice from '../../components/Notice';

import ProductCard from './components/ProductCard';

const MyProducts = () => {
  const authState = React.useContext(AuthContext) || {};
  const { jwtToken, customerId } = authState;
  const [subscriptionList, setSubscriptionList] = React.useState([]);
  const [queryStatus, setQueryStatus] = React.useState('loading');

  // listSubscriptionsForCustomer
  React.useEffect(() => {
    let shouldSetData = true;
    if (!jwtToken) {
      setQueryStatus('error');
      return () => { };
    }

    if (!customerId) {
      setSubscriptionList([]);
      setQueryStatus('success');
      return () => { };
    }

    (async function loadSubscriptions() {
      const query = `
      {
        subscriptions (customerId: "${customerId}") {
          id
          orderDetails {
            updated
            scheduled
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
            providerData {
              slug
            }
            status
          }
          productDetails {
            userConfiguration
            status
          }
          upcomingOrderDetails {
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
            status
            scheduled
          }
        }
      }
    `;

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query },
        { headers: { Authorization: jwtToken } },
      );
      const { data: { data, errors } } = response;

      if (errors) {
        errors.forEach((error) => {
          console.log(error.message);
          // NotificationManager.error(error.message);
          setQueryStatus('error');
        });
      }

      if (data && shouldSetData) {
        setSubscriptionList(R.reject((sub) => !sub, data.subscriptions));
        setQueryStatus('success');
      }
    }());

    return () => { shouldSetData = false; };
  }, [customerId, jwtToken]);

  if (queryStatus === 'loading') return <Spinner />;
  if (queryStatus === 'error') return null;
  return (
    <>
      {subscriptionList && subscriptionList.map((subscription) => (
        <ProductCard subscription={subscription} />
      ))}

      {Array.isArray(subscriptionList) && subscriptionList.length === 0 && (
        <Notice
          heading="You don’t have any products yet"
          message="Check out our range of solutions for connecting with your customers."
          buttonLabel="Browse"
          targetURL="/our-products/"
        />
      )}
    </>
  );
};

export default MyProducts;
