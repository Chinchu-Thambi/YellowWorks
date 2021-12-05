import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import { navigate } from 'gatsby';

import AuthContext from '../../AuthContext';

import {
  Card, BoostWrapper, CategoryBoost, StyledButton, Instructions, Title, MinifiedWrapper,
} from './ExistingProfile.styled';

const statusCardMap = {
  ACTIVE: 'success',
  PENDING: 'support',
  INCOMPLETE: 'warn',
};

const boostMap = {
  CBBRONZE: 'Bronze',
  CBSILVER: 'Silver',
  CBGOLD: 'Gold',
};

const getCardStatus = ({ subscriptionStatus }) => statusCardMap[subscriptionStatus] || 'info';

const ExistingProfile = ({ profiles = [] }) => {
  const {
    showHideModal,
  } = React.useContext(AuthContext) || {};
  const [shownProfiles, setShownProfiles] = React.useState(2);

  const handleClick = async (e) => {
    e.preventDefault();
    showHideModal({ show: false });
  };

  const handleShowMore = () => {
    setShownProfiles(profiles.length);
  };

  const navigateToProducts = () => {
    navigate('/my-yellow/my-products');
    showHideModal({ show: false });
  };

  const navigateToContact = () => {
    navigate('/company/contact-us/');
    showHideModal({ show: false });
  };

  return (
    <div>
      <Instructions tabIndex="0">
        Before you proceed, please confirm whether you want to create a brand new
        Yellow Profile for one of your locations, or update one that you have already.
      </Instructions>
      <Flex
        flexWrap={profiles.length < 10 ? 'nowrap' : 'wrap'}
        flexDirection={['column', null, null, (profiles.length < 10 ? null : 'row')]}
      >
        {(profiles.slice(0, shownProfiles)?.map((subscription) => {
          const { businessProfile, location } = JSON.parse(subscription?.productDetails?.userConfiguration);
          return (
            profiles.length < 10 ? (
              <Card
                key={subscription.id}
                status={getCardStatus({ subscriptionStatus: subscription?.orderDetails?.status })}
              >
                <Flex flexDirection={['column', null, null, 'row']}>
                  <Box flex="1" textAlign="left">
                    <h2>{subscription.orderDetails?.product?.name}</h2>
                    <h3>{businessProfile?.name}</h3>
                    <div>
                      {location?.address && (
                        <address>
                          {location?.address?.subpremise
                            && `${location?.address?.subpremise} / `}
                          {location?.address?.streetNumber}
                          {' '}
                          {location?.address?.streetAddress}
                          {', '}
                          {location?.address?.locality}
                          {', '}
                          {location?.address?.administrativeArea}
                        </address>
                      )}
                      <p>
                        STATUS: <strong>{subscription?.orderDetails?.status}</strong>
                      </p>
                    </div>
                  </Box>
                  <Box flex="1" textAlign={['left', null, null, 'right']}>
                    <BoostWrapper>
                      {subscription.orderDetails.productOptions?.map(({ sku }) => (
                        <CategoryBoost key={sku} categoryLevel={boostMap[sku]} />
                      ))}
                    </BoostWrapper>
                  </Box>
                </Flex>
              </Card>
            ) : (
              <MinifiedWrapper>
                <Title>{businessProfile?.name}</Title>
                <p>{subscription.productSummary?.name}</p>
                {location?.address && (
                  <address>
                    {location?.address?.subpremise
                      && `${location?.address?.subpremise} / `}
                    {location?.address?.streetNumber}
                    {' '}
                    {location?.address?.streetAddress}
                    {', '}
                    {location?.address?.locality}
                    {', '}
                    {location?.address?.administrativeArea}
                  </address>
                )}
                {subscription.orderDetails.productOptions?.map(({ sku }, index) => (
                  <p key={index}>{boostMap[sku]} Category Boost</p>
                ))}
              </MinifiedWrapper>
            ));
        }))}
      </Flex>
      <Box textAlign="center">
        {profiles.length > shownProfiles
          && <StyledButton onClick={handleShowMore} size="sm" variant="link">View More Profiles</StyledButton>}
      </Box>
      <Flex flexWrap="wrap" justifyContent="center">
        <StyledButton onClick={handleClick} size="sm">PROCEED WITH PURCHASE</StyledButton>
        <StyledButton onClick={navigateToProducts} size="sm" variant="secondary">MANAGE MY PRODUCTS</StyledButton>
        <StyledButton onClick={navigateToContact} size="sm" variant="tertiary" outline="true">GET IN TOUCH</StyledButton>
      </Flex>
    </div>
  );
};

export default ExistingProfile;

ExistingProfile.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
