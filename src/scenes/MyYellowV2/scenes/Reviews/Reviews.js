import React from 'react';
import * as R from 'ramda';
// import BusinessContext from '../../../MyYellow/services/BusinessContext';
// import Spinner from '../../../../components/Spinner';
import Axios from 'axios';
import Notice from '../../../MyYellow/components/Notice';
import AuthContext from '../../../../components/Auth';
import Spinner from '../../../../components/Spinner';
import ManageReviewsScene from '../../../MyYellow/scenes/ManageReviews';
import { OneColumnContainer } from '../../components/Containers';

const Reviews = () => {
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

      const response = await Axios.post(
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
        const subs = R.reject((sub) => !sub, data.subscriptions);
        const yellowProfiles = R.compose(
          R.filter(
            R.compose(
              R.includes('YP'),
              R.path(['orderDetails', 'product', 'sku']),
            ),
          ),
        )(subs);

        setSubscriptionList(yellowProfiles);
        setQueryStatus('success');
      }
    }());

    return () => { shouldSetData = false; };
  }, [customerId, jwtToken]);

  if (queryStatus === 'loading') return <Spinner />;
  if (queryStatus === 'error') return null;

  return (
    <div>
      <h1>Ratings &amp; Reviews</h1>
      {subscriptionList && subscriptionList.map((subscription) => {
        const { businessProfile } = R.tryCatch(
          JSON.parse, () => ({}),
        )(subscription?.productDetails?.userConfiguration);
        return (
          <div className="mb-3">
            <OneColumnContainer
              title={subscription.orderDetails?.product?.name}
              subtitle={businessProfile?.name}
            >
              <ManageReviewsScene subscriptionId={subscription.id} hideHeader />
            </OneColumnContainer>
          </div>
        );
      })}
      <div className="mb-3">
        <OneColumnContainer
          title="Google Reviews"
        >
          <Notice
            heading="Feature coming soon"
          />
        </OneColumnContainer>
      </div>
      <div className="mb-3">
        <OneColumnContainer
          title="Facebook Reviews"
        >
          <Notice
            heading="Feature coming soon"
          />
        </OneColumnContainer>
      </div>
    </div>
  );
};

export default Reviews;
