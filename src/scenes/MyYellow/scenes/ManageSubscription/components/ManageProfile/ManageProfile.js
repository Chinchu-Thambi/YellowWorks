import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../../components/Button';

import profileIcon from '../../../../../../assets/icons/profile.svg';

import {
  getFirstPricingPlan, formatPricingPlanAmount, // getTotalFromSubscription,
} from '../../../../../../services/getPricingPlans';

import {
  StyledSection, FormControlSelect, DowngradeWarning,
} from '../../Styled';
import ProfileTypes from '../modals/Profiles';

const shortenName = (name, section) => name.split(' ')?.[section || 0];

const ManageProfile = (props) => {
  const {
    renderModalContent,
    handleProfileChange,
    selectableProducts,
    status,
    subscriptionSummary,
    mergedSubscription,
    disableInputs,
  } = props;

  return (
    <StyledSection justifyContent="space-between">
      <h2>
        <img src={profileIcon} alt="" />
        PROFILE
      </h2>
      <Button
        variant="link"
        size="sm"
        onClick={() => renderModalContent({
          title: 'Profile Types',
          component: () => <ProfileTypes />,
        })}
      >
        Learn More
      </Button>
      <FormControlSelect
        id="profile"
        aria-label="Profile Type"
        disabled={status === 'PENDING' || disableInputs}
        value={subscriptionSummary?.upcomingOrderDetails?.product?.sku || mergedSubscription?.product?.sku}
        onChange={handleProfileChange}
        required
      >
        <option value="" disabled>Choose Profile</option>
        {selectableProducts?.map((profile) => {
          const pricingPlan = profile?.pricingPlan?.[1] || getFirstPricingPlan(profile);
          return (
            <option
              key={profile.sku}
              value={profile.sku}
            >{formatPricingPlanAmount(pricingPlan)} - {shortenName(profile.name, 1)}
            </option>
          );
        })}
      </FormControlSelect>
      {(subscriptionSummary?.orderDetails?.product.sku === 'YPPREMIUMLOYAL'
        && mergedSubscription?.product?.sku !== 'YPPREMIUMLOYAL')
        && <DowngradeWarning />}
    </StyledSection>
  );
};

ManageProfile.defaultProps = {
  renderModalContent: () => { },
  handleProfileChange: () => { },
  selectableProducts: [],
  disableInputs: true,
  subscriptionSummary: {},
  mergedSubscription: {},
};

ManageProfile.propTypes = {
  renderModalContent: PropTypes.func,
  handleProfileChange: PropTypes.func,
  selectableProducts: PropTypes.arrayOf(PropTypes.shape({})),
  disableInputs: PropTypes.bool,
  status: PropTypes.string.isRequired,
  subscriptionSummary: PropTypes.shape({
    upcomingOrderDetails: PropTypes.shape({
      product: PropTypes.shape({
        sku: PropTypes.string,
      }),
    }),
    orderDetails: PropTypes.shape({
      product: PropTypes.shape({
        sku: PropTypes.string,
      }),
    }),
  }),
  mergedSubscription: PropTypes.shape({
    product: PropTypes.shape({
      sku: PropTypes.string,
    }),
  }),
};

export default ManageProfile;
