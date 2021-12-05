import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import axios from 'axios';
import * as R from 'ramda';

import AuthContext from '../../../../../components/Auth';
import Spinner from '../../../../../components/Spinner';
import YellowProfileSelector from './components/YellowProfileSelector';
import WebsiteInput from '../../../../../components/WebsiteInput';

const instructions = {
  Website: 'Please enter a link to your website',
  Facebook: 'Please enter a link to your Facebook page',
  'Yellow Profile': 'Select from your active profiles',
};

const placeholders = {
  Website: 'http://www.example.com',
  Facebook: 'http://www.facebook.com/example-page',
};

const SearchAdsLandingPage = (props) => {
  const {
    formData, onChange, uiSchema: {
      description, required,
    },
  } = props;
  const type = formData?.type || '';
  const [url, setUrl] = React.useState(formData?.url || '');
  const title = instructions[type];
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
            product {
              id
              name
              configuration
            }
            providerData {
              slug
            }
          }
          productDetails {
            userConfiguration
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
          setQueryStatus('error');
        });
      }

      if (data && shouldSetData) {
        const filteredSubscriptions = R.filter(R.pathSatisfies((s) => !!s, ['orderDetails', 'providerData', 'slug']))(data.subscriptions);
        setSubscriptionList(filteredSubscriptions);
        setQueryStatus('success');
      }
    }());

    return () => { shouldSetData = false; };
  }, [customerId, jwtToken]);

  const handleChange = (value) => {
    setUrl(value);
    onChange({ ...formData, url: value });
  };

  const handleYellowProfileChange = (value) => {
    setUrl(value);
    onChange({ ...formData, url: value });
  };

  if (queryStatus === 'loading') return <Spinner />;

  return (
    <div>
      <h2>{title}</h2>

      {description && (
        <Box marginBottom={4}>
          <p>{description}</p>
        </Box>
      )}
      {type !== 'Yellow Profile' ? (
        <Box marginY={3}>
          <WebsiteInput
            id="url"
            formData={url}
            onChange={handleChange}
            hideLabel
            placeholder={placeholders[type]}
            required={required}
          />
        </Box>
      )
        : (
          <YellowProfileSelector subscriptionList={subscriptionList} required={required} onChange={handleYellowProfileChange} />
        )}
    </div>
  );
};

SearchAdsLandingPage.propTypes = {
  formData: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
  }),
  uiSchema: PropTypes.shape({
    description: PropTypes.string,
    required: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
};

SearchAdsLandingPage.defaultProps = {
  formData: {
    type: '',
    url: '',
  },
  uiSchema: {
    description: '',
    required: false,
  },
};

export default SearchAdsLandingPage;
