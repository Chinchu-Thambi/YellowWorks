import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import * as R from 'ramda';
import styled from 'styled-components';

import InfoIcon from '../../../../../../assets/icons/info.svg';
import StarGoldIcon from '../../../../../../assets/icons/gold-boost-star.svg';
import StarSilverIcon from '../../../../../../assets/icons/silver-boost-star.svg';
import StarBronzeIcon from '../../../../../../assets/icons/bronze-boost-star.svg';

import { theme } from '../../../../../../util';
import Modal from '../../../../../../components/Modal';
import Button from '../../../../../../components/Button';

import Card from '../../../../components/Card';

import YellowTooltip from '../YellowTooltip';
import ServiceAreaLine from '../ServiceAreaLine';
import CancelSearchAdsModal from '../CancelSearchAdsModal';


const BoostWrapper = styled.div`
  img {
    margin-right: ${theme.space[2]};
    height: ${theme.space[3]};
  }

  strong {
    text-transform: capitalize;
  }
`;


const imageMap = {
  GOLD: StarGoldIcon,
  SILVER: StarSilverIcon,
  BRONZE: StarBronzeIcon,
};

const boostMap = {
  CBBRONZE: 'BRONZE',
  CBSILVER: 'SILVER',
  CBGOLD: 'GOLD',
};

const statusCardMap = {
  ACTIVE: 'success',
  PENDING: 'support',
  INCOMPLETE: 'warn',
};

const printStatusMap = {
  ACTIVE: 'PRINTED',
  PENDING: 'BOOKED',
  NEW: 'UNDER APPROVAL',
};

const CategoryBoost = ({
  categoryLevel,
}) => (imageMap[categoryLevel] ? (
  <Flex alignItems="center">
    <img src={imageMap[categoryLevel]} alt="Boost Level" />
    <p><strong>{categoryLevel.toLowerCase()}</strong> Category Boost</p>
  </Flex>
) : null);

CategoryBoost.defaultProps = {
  categoryLevel: '',
};

CategoryBoost.propTypes = {
  categoryLevel: PropTypes.string,
};

export const getCardStatus = ({ subscriptionStatus }) => statusCardMap[subscriptionStatus] || 'info';

const formatDate = (timestamp) => {
  const dateObj = new Date(timestamp * 1000);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
};

const ProductCard = ({ subscription }) => {
  // internal state
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();

  // parse json strings
  const { businessProfile, location, categories } = R.tryCatch(
    JSON.parse, () => ({}),
  )(subscription?.productDetails?.userConfiguration);
  const areaServed = R.tryCatch(JSON.parse, () => ({}))(location?.areaServed);

  // read state
  const isYol = subscription?.orderDetails?.product?.sku?.includes('YP');
  const isSearchAds = subscription?.orderDetails?.product?.sku?.includes('SEARCHADS');
  const isPrint = subscription?.orderDetails?.product?.sku?.includes('PRT');
  const isGmb = subscription?.orderDetails?.product?.sku?.includes('GMB');

  const existingEffectiveDate = subscription?.orderDetails
    ? new Date(subscription.orderDetails.scheduled * 1000)
    : Date.now();
  const planChangesPending = !!subscription?.upcomingOrderDetails || existingEffectiveDate >= Date.now();

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Card
        key={subscription.id}
        status={getCardStatus({ subscriptionStatus: subscription?.orderDetails?.status })}
      >
        <Flex flexDirection={['column', null, null, 'row']} justifyContent="space-between">
          <h2>{subscription.orderDetails?.product?.name}</h2>
          {planChangesPending && isYol && (
            <Flex justifyContent={['start', 'space-between']}>
              <p>Updates pending</p>
              <Box ml={2} alignSelf="center" data-tip data-for="infoTip">
                <img src={InfoIcon} alt="Info" />
              </Box>
              <YellowTooltip id="infoTip">
                <p>You have subscription changes which will take effect on the date specified while you were ordering.<br /> Downgrades & cancellations take effect at the start of the next billing period. Upgrades take effect the day after your order was made.</p>
              </YellowTooltip>
            </Flex>
          )}
        </Flex>
        <Flex flexDirection={['column', null, null, 'row']}>
          <Box flex="1">
            <h3>{businessProfile?.name}</h3>
            <div>
              {location?.address
                ? (
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
                ) : (
                  <ServiceAreaLine
                    areaServed={areaServed}
                  />
                )}
              {isSearchAds && (
                <>
                  {categories && (
                    <p>{categories.map((cat) => cat.name).join(',')}</p>
                  )}
                  {businessProfile?.url && (
                    <p>{businessProfile.url}</p>
                  )}
                </>
              )}
              <p>Last action: {formatDate(subscription?.orderDetails.updated)}</p>
              <BoostWrapper>
                {subscription?.orderDetails.productOptions?.map(({ sku }) => (
                  <CategoryBoost key={sku} categoryLevel={boostMap[sku]} />
                ))}
              </BoostWrapper>
            </div>
          </Box>
          <Box flex="1">
            <h3>
              {'Status: '}
              <strong>
                {!isPrint
                  ? subscription?.orderDetails?.status
                  : printStatusMap[subscription?.orderDetails?.status]}
              </strong>
            </h3>
            {isSearchAds && subscription?.orderDetails?.status === 'ACTIVE' && (
              <Box mr={2} mb={2} display="inline-block">
                <Button
                  onClick={() => renderModalContent({
                    title: 'Cancel your campaign',
                    component: () => (
                      <CancelSearchAdsModal
                        onDismiss={dismissModal}
                        subscriptionId={subscription?.id}
                      />
                    ),
                  })}
                  variant="tertiary"
                  size="sm"
                  outline="true"
                >Request Cancellation
                </Button>
              </Box>
            )}
            {isYol && (
              <>
                {subscription?.orderDetails?.status !== 'NEW' && (
                  <>
                    <Box mr={2} mb={2} display="inline-block">
                      <Button
                        href={`/y/${subscription?.orderDetails.providerData.slug}?invalidate_cache=True`}
                        target="_blank"
                        variant="tertiary"
                        size="sm"
                        outline="true"
                        rel="noopener noreferrer"
                      >View your profile
                      </Button>
                    </Box>
                    <Box mr={2} mb={2} display="inline-block">
                      <Button
                        to={`/my-yellow/my-products/manage-profile/${subscription.id}`}
                        variant="tertiary"
                        size="sm"
                        outline="true"
                      >Manage Profile
                      </Button>
                    </Box>
                    <Box mr={2} mb={2} display="inline-block">
                      <Button
                        to={`/my-yellow/my-products/manage-reviews/${subscription.id}`}
                        variant="tertiary"
                        size="sm"
                        outline="true"
                      >Manage Reviews
                      </Button>
                    </Box>
                    <Box mr={2} mb={2} display="inline-block">
                      <Button
                        to={`/my-yellow/my-products/manage-plan/${subscription.id}`}
                        variant="tertiary"
                        size="sm"
                        outline="true"
                      >Manage Plan
                      </Button>
                    </Box>
                  </>
                )}
              </>
            )}
            {(isYol || isGmb) && (subscription?.orderDetails?.status === 'NEW') && (
              <>
                <p>Complete your set up to set this product live</p>
                <Button
                  to={`/my-yellow/onboarding/${subscription.id}`}
                  variant="tertiary"
                  size="sm"
                  outline="true"
                >Set up
                </Button>
              </>
            )}
          </Box>
        </Flex>
        <Modal
          title={modalTitle}
          isVisible={isVisible}
          onDismiss={setIsVisible}
        >
          {modalContent}
        </Modal>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.string,
    orderDetails: PropTypes.shape({
      updated: PropTypes.string,
      scheduled: PropTypes.string,
      product: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        configuration: PropTypes.shape({}),
      }).isRequired,
      productOptions: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        configuration: PropTypes.shape({}),
      }).isRequired,
      providerData: PropTypes.shape({
        slug: PropTypes.string,
      }),
      status: PropTypes.string.isRequired,
    }).isRequired,
    upcomingOrderDetails: PropTypes.shape({
      updated: PropTypes.string,
      scheduled: PropTypes.string,
      product: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        configuration: PropTypes.shape({}),
      }).isRequired,
      productOptions: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        configuration: PropTypes.shape({}),
      }).isRequired,
      providerData: PropTypes.shape({
        slug: PropTypes.string,
      }),
      status: PropTypes.string.isRequired,
    }),
    productDetails: PropTypes.shape({
      userConfiguration: PropTypes.shape({}),
      status: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
