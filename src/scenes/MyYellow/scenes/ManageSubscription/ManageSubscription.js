/* eslint-disable no-unused-expressions */
import React from 'react';
import * as R from 'ramda';

import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import { NotificationManager } from 'react-notifications';

import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';

import {
  formatPrice, formatRecurringPrice,
} from '../../../../util';

import {
  StyledGreySection, PageBreak,
  ConfirmContainer, Total, CreditCard, StyledBlueSection,
  ManageSubscriptionWrapper,
} from './Styled';

// Components
import { PaymentContext } from '../../../../components/Payment/Context';
import withPayment from '../../../../components/Payment/withPayment';
import CreditCardModal from './components/modals/CreditCardModal';
import FirstManage from './components/modals/FirstManage';
import ManageCategoryBoosts from './components/ManageCategoryBoosts';
import ManageProfile from './components/ManageProfile';
import WelcomeModal from '../WelcomeModal';

// Services
import useRegions from '../../../../services/useRegions';
import usePurchase from '../../../../services/usePurchase';
import getMergedOptionPairings from './services/getMergedOptionPairings';
import ProductContext from '../../services/ProductContext';
import useManageSubscription from '../../services/useManageSubscription';
import { formatDateWithMonthName } from '../../../../util/formatting';

const boostMap = {
  CBBRONZE: 'BRONZE',
  CBSILVER: 'SILVER',
  CBGOLD: 'GOLD',
};

const ManageSubscription = (props) => {
  const manageSubscription = useManageSubscription();
  const { subscriptionId } = props;
  const {
    formData, setSubscriptionId, expireFormData,
  } = React.useContext(ProductContext) || {};
  const { isComplexCustomer, defaultPaymentMethod } = React.useContext(PaymentContext) || {};
  const { getRegionFromString } = useRegions();
  const { pricingLoading, resetPurchase } = usePurchase();

  const {
    originalSubscription,
    mergedSubscription,
    selectableProducts,
    selectableOptions,
    editProduct,
    editOption,
    doSubmit,
    getSubscriptionSummary,
    getOriginalSubscriptionPrice,
    resetSubscription,
    transaction,
  } = manageSubscription;

  const [loading, setIsLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  const [subscriptionSummary, setSubscriptionSummary] = React.useState();
  const [originalSubscriptionPrice, setOriginalSubscriptionPrice] = React.useState();

  const status = subscriptionSummary?.orderDetails?.status;
  const mergedOptionPairings = formData ? getMergedOptionPairings({
    formData,
    originalSubscription,
    mergedSubscription,
    addressRegion: getRegionFromString(formData?.location?.address?.administrativeArea),
    upcomingSubscription: subscriptionSummary?.upcomingOrderDetails,
  }) : [];

  const currentScheduledDate = subscriptionSummary && new Date(
    subscriptionSummary?.upcomingOrderDetails?.scheduled * 1000
    || subscriptionSummary?.orderDetails?.scheduled * 1000,
  );
  const planChangesPending = !!subscriptionSummary?.upcomingOrderDetails
    || status !== 'ACTIVE'
    || currentScheduledDate >= new Date();

  const noChangeInPlan = (originalSubscription?.product?.sku === mergedSubscription?.product?.sku)
    && (JSON.stringify(originalSubscription?.productOptions) === JSON.stringify(mergedSubscription?.productOptions));
  const showSubmitPanel = !noChangeInPlan && !planChangesPending && (status === 'ACTIVE');
  const disableInputs = loading || pricingLoading || R.equals(NaN, transaction?.newSubscriptionMonthlyCharge) || planChangesPending;

  // check for loyalty force
  React.useEffect(() => {
    if (mergedSubscription.product.sku === 'YPPREMIUMLOYAL' && transaction?.todaysCharge < 0) {
      editProduct({ newSku: 'YPPREMIUM' });
    }
  }, [mergedSubscription, transaction, editProduct]);

  // set subscription Id
  React.useEffect(() => {
    if (typeof setSubscriptionId === 'function') {
      setSubscriptionId(subscriptionId);
    }
  }, [setSubscriptionId, subscriptionId]);

  // set subscription summary
  React.useEffect(() => {
    if (
      !subscriptionId
      || subscriptionSummary
      || loading
    ) return;

    const getExistingSubscriptionSummary = async () => {
      setIsLoading(true);
      const data = await getSubscriptionSummary();
      const result = data && R.find(R.propEq('id', subscriptionId), data);
      setSubscriptionSummary(result);
      setIsLoading(false);
    };

    getExistingSubscriptionSummary();
  }, [subscriptionId, getSubscriptionSummary, subscriptionSummary, loading]);

  // set original subscription price
  React.useEffect(() => {
    if (
      !subscriptionId
      || !originalSubscription
      || originalSubscriptionPrice === 0
      || originalSubscriptionPrice
      || loading
    ) return;

    const getPricing = async () => {
      setIsLoading(true);
      const data = await getOriginalSubscriptionPrice();
      setOriginalSubscriptionPrice(data);
      setIsLoading(false);
    };

    getPricing();
  }, [subscriptionId, planChangesPending, loading,
    originalSubscription, originalSubscriptionPrice, getOriginalSubscriptionPrice]);

  // Display and dismiss modal
  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  // Handle changes to YOL
  const handleProfileChange = (e) => {
    const { value } = e.target;

    editProduct({ newSku: value });
  };

  const handleBoostChange = (e, itemId, replaceId, originalSku, options) => {
    let { value } = e.target;
    if (itemId && value === '') {
      value = 'CANCEL';
      editOption({
        id: itemId,
        replaceId,
        newSku: value,
        originalSku,
        configuration: {
          productAttributes: {
            boosts: [{
              ...options, boost: boostMap[value], id: itemId,
            }],
          },
        },
        downgradeFrom: `CB${options.boost}`,
      });
      return;
    }
    editOption({
      id: itemId,
      replaceId,
      newSku: value,
      originalSku,
      configuration: {
        productAttributes: {
          boosts: [{ ...options, boost: boostMap[value], id: itemId }],
        },
      },
    });
  };

  const handleSubmit = async () => {
    if (!defaultPaymentMethod && !isComplexCustomer && transaction?.todaysCharge > 0) {
      renderModalContent({
        title: 'Please enter a valid payment method',
        component: () => <CreditCardModal onDismiss={dismissModal} />,
      });
      return;
    }
    setIsLoading(true);
    const submission = await doSubmit();
    if (submission?.graphqlRequest?.data?.errors) {
      submission.graphqlRequest.data.errors.forEach(
        () => NotificationManager.error('Subscription change failed, please refresh and try again'),
      );
    } else {
      NotificationManager.success('Subscription change submitted');
      resetPurchase();
      setSubscriptionSummary();
      setOriginalSubscriptionPrice();
      expireFormData();
    }
    setIsLoading(false);
  };
  return (
    <ManageSubscriptionWrapper>
      {(planChangesPending && subscriptionSummary) && (
        <StyledBlueSection>
          <h2>Thank you</h2>
          <Flex>
            <Box flex="1">
              {currentScheduledDate
                ? (<p>Your changes will be effective on <strong>{formatDateWithMonthName(currentScheduledDate)}.</strong></p>)
                : (<p>Your changes will be effective shortly.</p>)}
              {(transaction?.todaysCharge > 0)
                && (
                  <p>
                    {"We've charged "}
                    <strong>{formatPrice(transaction?.todaysCharge)} + GST</strong>
                    {' for the rest of this month on your new plan.'}
                  </p>
                )}
            </Box>
          </Flex>
        </StyledBlueSection>
      )}
      {subscriptionSummary ? (
        <>
          <StyledGreySection>
            {planChangesPending ? <h2>Your new plan</h2> : <h2>Your current plan</h2>}
            <Flex>
              <Box flex="1">
                <p>{formData?.businessProfile?.name}</p>
              </Box>
              <Box flex="3">
                <p>{originalSubscription?.product?.configuration?.location}</p>
              </Box>
              {R.is(Number, originalSubscriptionPrice) && (
                <Box flex="1">
                  <p>
                    <strong>{formatRecurringPrice(originalSubscriptionPrice, true, false)}</strong>
                  </p>
                </Box>
              )}
            </Flex>
          </StyledGreySection>
          <ManageProfile
            renderModalContent={renderModalContent}
            handleProfileChange={handleProfileChange}
            selectableProducts={selectableProducts}
            status={status}
            subscriptionSummary={subscriptionSummary}
            mergedSubscription={mergedSubscription}
            disableInputs={disableInputs}
          />
          <PageBreak />
          <ManageCategoryBoosts
            renderModalContent={renderModalContent}
            dismissModal={dismissModal}
            handleBoostChange={handleBoostChange}
            mergedOptionPairings={mergedOptionPairings}
            selectableOptions={selectableOptions}
            planChangesPending={planChangesPending}
            disableInputs={disableInputs}
          />
          {showSubmitPanel && (
            <ConfirmContainer>
              <Flex flexDirection="column">
                <Flex flexDirection="row" justifyContent="space-between">
                  {!R.equals(NaN, transaction?.newSubscriptionMonthlyCharge) ? (
                    <Total><strong>Total: {formatRecurringPrice(transaction?.newSubscriptionMonthlyCharge, false, true)}</strong> /month</Total>
                  ) : <Spinner />}
                  {transaction?.effectiveDate && !R.equals(NaN, transaction?.newSubscriptionMonthlyCharge) && (
                    <p>Effective date: {transaction?.effectiveDate}</p>
                  )}
                </Flex>
                <CreditCard>
                  {transaction?.todaysCharge > 0 && (
                    <p>
                      {isComplexCustomer ? (
                        'Your account'
                      ) : (
                        'Your credit card'
                      )}
                      {' will be charged '}
                      <strong>{formatPrice(transaction?.todaysCharge)} + GST</strong>
                      {' '}
                      {isComplexCustomer ? 'on your next billing cycle' : 'today'}
                    </p>
                  )}
                </CreditCard>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent={['space-evenly', null, null, 'space-between']}
                mt={2}
              >
                {(loading || pricingLoading || R.equals(NaN, transaction?.newSubscriptionMonthlyCharge)) && (
                  <Box mr={2}>
                    <Spinner size={24} />
                  </Box>
                )}
                <Box as="div" marginRight={2}>
                  <Button
                    type="submit"
                    size="sm"
                    variant="secondary"
                    onClick={resetSubscription}
                    disabled={loading}
                  >Reset
                  </Button>
                </Box>
                <Button
                  type="submit"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={loading || pricingLoading || R.equals(NaN, transaction?.newSubscriptionMonthlyCharge)}
                >Submit
                </Button>
              </Flex>
            </ConfirmContainer>
          )}
          <Modal
            title={modalTitle}
            isVisible={isVisible}
            onDismiss={dismissModal}
            scrollable
          >
            {modalContent}
          </Modal>
        </>
      ) : <Spinner />}
      <WelcomeModal context="ManageSubscription">
        <FirstManage />
      </WelcomeModal>
    </ManageSubscriptionWrapper>
  );
};

ManageSubscription.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
};

export default withPayment(ManageSubscription);
