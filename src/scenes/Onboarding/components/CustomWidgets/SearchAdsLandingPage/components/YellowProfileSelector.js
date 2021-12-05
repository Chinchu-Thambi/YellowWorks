import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import Select from 'react-select';

import { ActionButton } from '../../../../../MyYellow/components/ListGroup';
import ValidationController from '../../../../../../components/ValidationController';

const YellowProfileSelector = ({ subscriptionList, required, onChange }) => {
  const [selectedProfile, setSelectedProfile] = React.useState();
  const selectRef = React.useRef(null);
  const isBlocked = required && !selectedProfile;
  const toLabel = (name, address) => `${name} - ${address?.subpremise ? `${address?.subpremise} / ` : ''}${address?.streetNumber} ${address?.streetAddress}`;

  const handleProfileChange = ({ value }) => {
    const result = R.find(R.propEq(['id'], value), subscriptionList);
    setSelectedProfile(result);
    const slug = result?.orderDetails?.providerData?.slug;
    const slugUrl = `www.yellow.co.nz/y/${slug}?invalidate_cache=True`;
    onChange(slugUrl);
  };

  const transformToOption = (subscription) => {
    const { businessProfile, location } = JSON.parse(subscription?.productDetails?.userConfiguration);
    const text = toLabel(businessProfile?.name, location?.address);
    return ({
      label: text,
      value: subscription.id,
    });
  };
  const profileList = subscriptionList?.map(transformToOption);
  return (
    profileList.length > 0 ? (
      <Select
        id="profile"
        aria-label="Yellow Profile Selection"
        value={(selectedProfile && transformToOption(selectedProfile)) || ''}
        onChange={handleProfileChange}
        required={required}
        options={profileList}
      />
    ) : (
      <>
        <p>You have no current Live Yellow Profiles.</p>
        <Box mr={4} marginBottom={2}>
          <ActionButton
            to="/my-yellow/my-products"
            variant="link"
            size="sm"
          >Manage your products
          </ActionButton>
        </Box>
        <Box mr={4} marginBottom={2}>
          <ActionButton
            to="/our-products/yellow-profile"
            variant="link"
            size="sm"
          >Get a Yellow Profile
          </ActionButton>
        </Box>
        <ValidationController
          requiredRef={selectRef}
          isBlocked={isBlocked}
          title="Please go back to enter a website URL"
        />
      </>
    )
  );
};

YellowProfileSelector.defaultProps = {
  subscriptionList: [],
  required: false,
  onChange: () => { },
};

YellowProfileSelector.propTypes = {
  subscriptionList: PropTypes.arrayOf({}),
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default YellowProfileSelector;
