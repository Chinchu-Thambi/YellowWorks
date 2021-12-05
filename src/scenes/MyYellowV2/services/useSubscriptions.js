import React from 'react';
import * as R from 'ramda';
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import AuthContext from '../../../components/Auth';

const useSubscriptions = () => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [subscriptions, setSubscriptions] = React.useState() || [];
  const [subsLoading, setSubsLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      subsLoading
    ) return;

    if (!jwtToken || !customerId) return;

    if (
      (subscriptions)
    ) return;
    setSubsLoading(true);
    const getSubs = async () => {
      const subQuery = `
    query getSubscriptions($customerId: ID) {
      subscriptions(
        customerId: $customerId
      ) {
          edges {
            node {
              id
              provider
              providerData
              providerId
              status
              orders(last:1) {
                edges {
                  node {
                    product {
                      sku
                      id
                    }
                    productOptions {
                      id
                      sku
                    }
                    status
                  }
                }
              }
            }
          }
        }
      }
    `;

      const variables = {
        customerId,
      };

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_API_ENDPOINT,
        { query: subQuery, variables },
        { headers: { Authorization: jwtToken } },
      );

      const data = response?.data?.data;
      const subs = R.compose(
        R.map(R.prop('node')),
        R.defaultTo([]),
        R.prop('edges'),
        R.prop('subscriptions'),
      )(data);

      if (subs) {
        console.log(subs);
        setSubscriptions(subs);
        setSubsLoading(false);
      } else {
        NotificationManager.error('Subscriptions failed to load. Please try again');
        setSubscriptions();
        setSubsLoading(false);
      }
    };
    getSubs();
  }, [jwtToken, customerId, subsLoading, subscriptions, setSubscriptions]);


  return {
    subscriptions,
    subsLoading,
  };
};

export default useSubscriptions;
