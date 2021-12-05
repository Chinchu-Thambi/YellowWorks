import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import axios from 'axios';

import AuthContext from '../Auth/AuthContext';
import Spinner from '../Spinner';

import {
  FlexContainer, Container, ChangeButton,
} from './Styled';

const CustomerIDLink = ({ customerId }) => (
  <a
    href={`https://app.hubspot.com/contacts/${process.env.GATSBY_HUBSPOT_ACCOUNT}/company/${customerId}/`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {customerId}
  </a>
);

CustomerIDLink.propTypes = {
  customerId: PropTypes.string.isRequired,
};

const CompanyNameLink = ({ customerId, companyName }) => (
  <a
    href={`https://app.hubspot.com/contacts/${process.env.GATSBY_HUBSPOT_ACCOUNT}/company/${customerId}/`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {companyName}
  </a>
);

CompanyNameLink.propTypes = {
  customerId: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
};

const CustomerStatusBarSwitch = () => {
  const {
    customerId: customerTokenId, selectedCustomer, jwtToken, payload,
  } = React.useContext(AuthContext) || {};
  const [isPending, setIsPending] = React.useState(false);
  const [accountDetails, setAccountDetails] = React.useState(null);
  const [error, setError] = React.useState('');

  const { customerId } = selectedCustomer || {};

  const staffEmail = payload?.email;

  React.useEffect(() => {
    setAccountDetails(null);
    setError('');

    if (!customerTokenId) {
      return;
    }

    const getCustomerData = async () => {
      const query = `
        query getCustomerData($customerId: ID!) {
          getBillingAccountDetails(customerId: $customerId) {
            billingAccount {
              companyName
            }
          }
        }
      `;

      const variables = {
        customerId: customerTokenId,
      };

      setIsPending(true);
      const response = await axios.post(
        process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );
      setIsPending(false);

      const loadedDetails = response?.data?.data?.getBillingAccountDetails?.billingAccount;

      if (loadedDetails) {
        setAccountDetails(loadedDetails);
      }

      const errors = response?.data?.errors?.[0];

      if (errors?.errorType === 'Unauthorized') {
        setError(
          `Customer ID ${customerTokenId} couldn't be found in HubSpot. Please make sure you've got the right one.`,
        );
      }
    };

    getCustomerData();
  }, [customerTokenId, jwtToken]);

  if (!customerId) {
    return (
      <Container>
        <FlexContainer>
          <Box flex="1">
            <strong data-testid="currentAccountEmail">{staffEmail}</strong>&nbsp;
            <span> - You have not selected a customer yet.</span>
          </Box>
          <ChangeButton
            variant="link"
            size="sm"
            to="/my-yellow/choose-customer"
          >Select
          </ChangeButton>
        </FlexContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FlexContainer>
        <Box flex="1">
          <strong data-testid="currentAccountEmail">{staffEmail}</strong>

          { error ? (
            <span> - {error}</span>
          ) : (
            <>
              <span> - You are currently acting on behalf of </span>

              {accountDetails ? (
                <>
                  <strong data-testid="companyName">
                    <CompanyNameLink customerId={customerId} companyName={accountDetails.companyName} />
                  </strong>
                </>
              ) : (
                <>
                  ID <CustomerIDLink customerId={customerId} />.
                </>
              )}
            </>
          )}

          { isPending && (
          <Box display="inline-block">
            <Spinner size={16} />
          </Box>
          )}

        </Box>
        <ChangeButton
          variant="link"
          size="sm"
          to="/my-yellow/choose-customer"
        >Change
        </ChangeButton>
      </FlexContainer>
    </Container>
  );
};

export default CustomerStatusBarSwitch;
