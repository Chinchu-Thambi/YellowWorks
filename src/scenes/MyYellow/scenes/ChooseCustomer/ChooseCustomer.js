import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select';
import { navigate } from 'gatsby';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../../../../components/Auth';
import Button from '../../../../components/Button';
import Input from '../../../../components/formElements/Input';
import Spinner from '../../../../components/Spinner';
import Wizard from '../../../../components/Wizard';
import { webClient } from '../../../../services/graphql';
import useDebounce from '../../../../services/useDebounce';

const COMPANY_QUERY = gql`
  query companyQuery($email: String) {
    getCustomerListByEmail(email: $email) {
      contactId
      companyId
      name
    }
  }
`;

const ChooseCustomer = () => {
  const {
    isStaff, jwtToken, selectCustomer,
  } = React.useContext(AuthContext) || {};

  const [contactInput, setContactInput] = React.useState('');
  const [companyInput, setCompanyInput] = React.useState({
    contactId: undefined, customerId: undefined, customerName: undefined,
  });
  const debouncedContactInput = useDebounce(contactInput, 300);

  const companyQuery = useQuery(
    COMPANY_QUERY,
    {
      variables: { email: debouncedContactInput },
      context: { headers: { Authorization: jwtToken } },
      client: webClient,
    },
  );

  const handleEmailInput = (e) => {
    setContactInput(e.target.value);
    setCompanyInput({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyInput.customerId) {
      NotificationManager.error('You need to select a company.');
      return;
    }

    await selectCustomer(companyInput);
    navigate('/my-yellow/my-products');
  };

  if (!isStaff) {
    return null;
  }

  return (
    <Wizard title="Customer selection">
      <form onSubmit={handleSubmit}>
        <h3>Please enter the customer&#39;s contact email</h3>
        <Flex alignItems="center">
          <Input id="emailInput" value={contactInput} onChange={handleEmailInput} autoFocus />
          {companyQuery.loading && (
            <Box ml={2}>
              <Spinner size={16} />
            </Box>
          )}
        </Flex>
        <h3>Then select the company</h3>
        {(
          companyQuery.data
          && !companyQuery.error
          && !companyQuery.loading
          && companyQuery.variables.email === contactInput
        ) ? (
          <Select
            id="customerInput"
            onChange={({ contactId, companyId, name }) => {
              setCompanyInput({
                customerName: name,
                contactId,
                customerId: companyId,
              });
            }}
            options={companyQuery.data.getCustomerListByEmail.map(({ contactId, companyId, name }) => ({
              label: name,
              contactId,
              companyId,
              name,
            }))}
            autoFocus
          />
          ) : (
            <Input
              id="customerInput"
              value={companyInput.customerId || ''}
              onChange={(e) => { setCompanyInput({ customerId: e.target.value }); }}
            />
          )}
        <Box mt={3}>
          <Button size="sm">Done</Button>
        </Box>
      </form>
    </Wizard>
  );
};

export default ChooseCustomer;
