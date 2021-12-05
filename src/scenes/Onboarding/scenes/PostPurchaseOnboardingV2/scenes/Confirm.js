import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from 'gatsby';
import * as R from 'ramda';
import styled from 'styled-components';

import AuthContext from '../../../../../components/Auth/AuthContext';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import Wizard from '../../../../../components/Wizard';
import { useLocalStorage } from '../../../../../util';

import { NavControlsContainer } from '../../../components/Styled';
import { getSteps } from '../../../services/productBrief';
import YolConfirm from './components/YolConfirm';
import WebsiteConfirm from './components/WebsiteConfirm';
import GmbConfirm from './components/GmbConfirm';

// This was supposed to be a structural change to the table but the css changes were much simpler.
const StyledWizard = styled(Wizard)`
  table {
    width: 100%;
    border-spacing: 0 ${({ theme }) => theme.space[1]};
    display: block;

    address {
      font-style: normal;
    }

    tbody {
      display: block;
      max-width: 100%;
    }

    thead {
      display: block;
      width: 100%;

      tr {
        td {
          :last-child {
            top: 5px;
          }
        }
      }
    }

    tr {
      display: block;
      border-bottom: 1px solid ${({ theme }) => theme.palette.contrast[4]};
      margin-bottom: ${({ theme }) => theme.space[2]};
      position: relative;
      width: 100%;
      overflow: hidden;

      > * {
        display: block;
      }

      th {
        text-align: left;
      }

      td {
        max-width: 80%;
        overflow: auto;
        padding-bottom: ${({ theme }) => theme.space[2]};
        word-wrap: break-word;

        :last-child {
          position: absolute;
          top: -${({ theme }) => theme.space[2]};
          right: 0;
          vertical-align: middle;
        }
      }
    }
  }
`;

const pushData = async ({
  subscriptionId,
  jwtToken,
  formData,
  customerId,
}) => {
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
    input: JSON.stringify(formData),
    publish: true,
  };

  const response = await axios.post(
    process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
    { query, variables },
    { headers: { Authorization: jwtToken } },
  );

  return response;
};

const Confirm = ({ subscriptionId, location }) => {
  // load auth utilities
  const {
    jwtToken, customerId, displayLoginModal, state: authState,
  } = React.useContext(AuthContext);

  // TODO: use same localStorage structure as ProductContext or ProductContext itself.
  const [formData] = useLocalStorage(`formData-${subscriptionId}`, null);
  const [schema, setSchema] = React.useState(null);
  const coreProductSku = schema?.metadata?.sku?.map(({ value }) => value)?.[0];

  const steps = getSteps({
    skuList: schema?.metadata?.sku,
  });

  // load schema and formData
  React.useEffect(() => {
    const loadSubscription = async () => {
      const query = `
        query getOnboardingData($subscriptionId: ID!, $customerId: ID!) {
          getSubscriptionById(
            subscriptionId: $subscriptionId
            customerId: $customerId
          ) {
            id
            orderDetails {
              userSchema
            }
          }
        }
      `;

      const variables = {
        subscriptionId,
        customerId,
      };

      setSchema();

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      const userSchema = R.compose(
        R.tryCatch(JSON.parse, () => ({})),
        R.path(['data', 'data', 'getSubscriptionById', 'orderDetails', 'userSchema']),
      )(response);

      setSchema(userSchema);
    };

    if (jwtToken && customerId) {
      if (schema === null) {
        loadSubscription();
      }
    } else if (!authState.modal.showAuthModal) {
      displayLoginModal();
    }
  }, [authState.modal.showAuthModal, customerId, displayLoginModal, jwtToken, schema, subscriptionId]);

  const done = async () => {
    const response = await pushData({
      subscriptionId, customerId, jwtToken, formData,
    });
    navigate(`/my-yellow/onboarding/${subscriptionId}/done`);
    console.log(response);
  };

  let CancelHandler;
  switch (coreProductSku) {
    case 'YPBASIC':
      CancelHandler = YolConfirm;
      break;
    case 'YPPREMIUM':
      CancelHandler = YolConfirm;
      break;
    case 'GMB':
      CancelHandler = GmbConfirm;
      break;
    case 'WEBSITE':
      CancelHandler = WebsiteConfirm;
      break;
    default:
      CancelHandler = Spinner;
      break;
  }

  return (
    <StyledWizard
      title="Confirm your info"
      completeSteps={steps.length + 1}
      totalSteps={steps.length + 1}
    >
      {!formData ? (
        <Spinner />
      ) : (
        <CancelHandler
          formData={formData}
          location={location}
          steps={steps}
        />
      )}

      <NavControlsContainer>
        <Button
          to={location.pathname.replace('confirm', steps.length)}
          variant="secondary"
        >
          Back
        </Button>
        <Button
          onClick={done}
        >Done
        </Button>
      </NavControlsContainer>
    </StyledWizard>
  );
};

Confirm.defaultProps = {
  subscriptionId: '',
  location: {},
};

Confirm.propTypes = {
  subscriptionId: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default Confirm;
