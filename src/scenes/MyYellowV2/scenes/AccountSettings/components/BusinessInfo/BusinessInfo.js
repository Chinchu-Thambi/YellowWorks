import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import AuthContext from '../../../../../../components/Auth';
import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import { ButtonStyled } from './BusinessInfo.styled';
import { TwoColumnContainer } from '../../../../components/Containers';
import { Input, FormGroup } from '../../../../../../components/FormElements';

const BusinessInfo = ({ isLoading, businessData }) => {
  const authState = React.useContext(AuthContext) || {};
  const userAttributes = R.path(['state', 'user', 'attributes'])(authState) || {};

  const handleUpdateClick = () => {
    authState.showHideModal({
      show: true,
      modalType: 'changePassword',
    });
  };

  return (
    <TwoColumnContainer title="Account Settings">
      {isLoading && (
        <Spinner />
      )}

      {!isLoading && !authState.customerId && (
        <>
          <p className="text-md">
            No company details found
          </p>
          <p className="text-md">Create a FREE Yellow Profile to get your business online with Yellow</p>
          <ButtonStyled
            size="sm"
            variant="link"
            to="/our-products/yellow-profile"
          >
            SET UP PROFILE
          </ButtonStyled>
        </>
      )}
      <FormGroup>
        {!isLoading && businessData && (
          <>
            {businessData.name && (
              <Input id="bus-data-name" label="Business name" value={businessData.name} onChange={() => { }} prefilled />
            )}
            {businessData.email && (
              <Input id="bus-data-email" label="Business email" value={businessData.email} onChange={() => { }} prefilled />
            )}
          </>
        )}
        {(userAttributes.given_name || userAttributes.family_name) && (
          <>
            {userAttributes.given_name && (
              <Input id="user-data-name" label="First name" value={userAttributes.given_name} onChange={() => { }} prefilled />
            )}
            {userAttributes.family_name && (
              <Input id="user-data-lastname" label="Last name" value={userAttributes.family_name} onChange={() => { }} prefilled />
            )}
          </>
        )}

        <Flex alignItems="flex-start" flexDirection="column">
          <p className="text-md text-contrast-400">Password</p>
          <Button variant="link" size="sm" className="p-0 -mx-3" onClick={handleUpdateClick}>update</Button>
        </Flex>
      </FormGroup>
    </TwoColumnContainer>
  );
};

BusinessInfo.defaultProps = {
  isLoading: false,
  businessData: {},
};

BusinessInfo.propTypes = {
  isLoading: PropTypes.bool,
  businessData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default BusinessInfo;
