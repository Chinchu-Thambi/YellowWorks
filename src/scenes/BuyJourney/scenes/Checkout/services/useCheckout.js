import React from 'react';
import { navigate } from 'gatsby';
import * as R from 'ramda';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

import AuthContext from '../../../../../components/Auth';
import { PaymentContext } from '../../../../../components/Payment';
import { errorText, getErrorString } from '../../../../../util';
import usePurchase from '../../../../../services/usePurchase';

import BusinessContext from '../../../../MyYellow/services/BusinessContext';

import isPaymentNeeded from './isPaymentNeeded';
import orderProcessor from './orderProcessor';
import websiteOrderProcessor from './websiteOrderProcessor';

export const fetchingStatus = {
  idle: 'idle',
  fetching: 'fetching',
  complete: 'complete',
  error: 'error',
};

const useCheckout = () => {
  const {
    state, jwtToken, displayLoginModal, customerId, showHideModal,
  } = React.useContext(AuthContext);
  const {
    businessId,
  } = React.useContext(BusinessContext) || {};
  const {
    purchase,
    purchaseSuccessful,
    allContentfulProducts,
    pricingOptions,
    discount,
    setDiscount,
  } = usePurchase();

  const {
    state: paymentState,
    cardholder,
    handleCardSetup,
    requestPaymentToken,
  } = React.useContext(PaymentContext) || {};

  const discountValid = pricingOptions?.discountValidity?.validity;

  const [accountDetailsRequestStatus, setAccountDetailsRequestStatus] = React.useState(fetchingStatus.idle);
  const [accountDetails, setAccountDetails] = React.useState(null);
  const formRef = React.useRef(null);

  const [subscriptionListRequestStatus, setSubscriptionListRequestStatus] = React.useState(fetchingStatus.idle);
  const [subscriptionList, setSubscriptionList] = React.useState([]);
  const [hasConfirmedExistingProduct, setHasConfirmedExistingProduct] = React.useState(false);
  const [companyDetails, setCompanyDetails] = React.useState({
    companyName: '',
    phone: {
      countryCode: '64',
      areaCode: '',
      number: '',
    },
    address: {
      streetNumber: '',
      streetAddress: '',
      sublocality: '',
      locality: '',
      administrativeArea: '',
      postalCode: '',
      subpremise: '',
      floor: '',
      premise: '',
    },
    geo: {
      latitude: undefined,
      longitude: undefined,
    },
  });
  const [termsDetails, setTermsDetails] = React.useState({
    terms: false,
    authorize: false,
  });
  const [submitting, setSubmitting] = React.useState(false);

  const [selectedDiscount, setSelectedDiscount] = React.useState('');
  const submittedDiscount = pricingOptions?.discountValidity;
  const useNewProvisioning = purchase?.product?.sku?.includes('WEBSITE');

  React.useEffect(() => {
    if (!submittedDiscount?.name) {
      return;
    }
    if (submittedDiscount?.name !== selectedDiscount) {
      setSelectedDiscount(submittedDiscount);
    }
  }, [submittedDiscount, selectedDiscount]);


  const needPayment = purchase ? isPaymentNeeded({ purchase }) : true;
  const isComplexCustomer = accountDetails?.billingMethod?.__typename === 'ComplexBillingMethod';
  const isPaymentAvailable = (
    accountDetails?.billingMethod?.paymentMethods
    && accountDetails?.billingMethod?.paymentMethods.length > 0
  );

  const handleCheckoutClick = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setSubmitting(true);

    // company name validation
    if (!accountDetails?.billingAccount?.companyName) {
      if (!companyDetails.companyName) {
        NotificationManager.error(errorText.requiredFieldMissing, '', 5000);
        return;
      }
    }

    // phone validation
    if (!accountDetails?.billingAccount?.formattedPhoneNumber) {
      // following five lines are required to get component from form or react-jsonschema-form
      let { formElement } = formRef.current;

      if (!formElement) {
        formElement = formRef.current;
      }

      if (!formElement.reportValidity()) {
        return;
      }
    }

    // address validation
    if (!accountDetails?.billingAccount?.formattedAddress) {
      if (
        !companyDetails.address.streetAddress
        || !companyDetails.address.locality
        || !companyDetails.address.administrativeArea
      ) {
        NotificationManager.error(errorText.requiredFieldMissing, '', 5000);
        return;
      }
    }

    // terms validation
    if (!termsDetails.terms) {
      NotificationManager.error(errorText.termsNotAccepted, '', 5000);
      return;
    }

    // payment validation
    if (needPayment && !termsDetails.authorize) {
      NotificationManager.error(errorText.cardAuthorizationNotGiven, '', 5000);
      return;
    }

    let paymentMethodId = accountDetails?.billingMethod?.paymentMethods[0]?.id;

    // Stripe Setup
    if (
      needPayment
      && !isComplexCustomer
      && !paymentMethodId
      && !isPaymentAvailable
    ) {
      let { paymentMethodToken } = paymentState;

      if (!paymentMethodToken) {
        // only handle card setup from Stripe on paid order without saved paymentMethodToken
        if (!cardholder && !isPaymentAvailable) {
          NotificationManager.error(errorText.cardHolderMissing, '', 5000);
          return;
        }
        const { error, paymentMethodToken: paymentMethodUpdated } = await handleCardSetup();
        if (error) {
          NotificationManager.error(error.message, '', 5000);
          return;
        }
        paymentMethodToken = paymentMethodUpdated;
      }
      paymentMethodId = paymentMethodToken;
    }
    // Order Processor
    try {
      if (R.includes('WEBSITE')(purchase.product.sku)) {
        const { subscription } = await websiteOrderProcessor({
          product: purchase?.product,
          productOptions: [...purchase?.childProducts],
          promotionCode: (discountValid && discount?.code) ? discount?.code : null,
          jwtToken,
          paymentMethodId,
          userDetails: {
            firstName: R.path(['user', 'attributes', 'given_name'])(state),
            lastName: R.path(['user', 'attributes', 'family_name'])(state),
            email: R.path(['user', 'attributes', 'email'])(state),
          },
          companyDetails,
          businessId,
          customerId,
          useNewProvisioning,
        });
        purchaseSuccessful({ subscription });
        navigate('/checkout/order-confirmation', {
          state: { subscription, v2: true },
        });
      } else {
        const { subscription } = await orderProcessor({
          product: purchase?.product,
          productOptions: [...purchase?.childProducts],
          promotionCode: (discountValid && discount?.code) ? discount?.code : null,
          jwtToken,
          paymentMethodId,
          userDetails: {
            firstName: R.path(['user', 'attributes', 'given_name'])(state),
            lastName: R.path(['user', 'attributes', 'family_name'])(state),
            email: R.path(['user', 'attributes', 'email'])(state),
          },
          companyDetails,
          customerId,
          useNewProvisioning,
        });
        purchaseSuccessful({ subscription });
        navigate('/checkout/order-confirmation', {
          state: { subscription },
        });
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      NotificationManager.error(getErrorString(err), '', 5000);
    }
  };

  // Request payment token
  React.useEffect(() => {
    if (
      !paymentState.paymentMethodToken
      && !paymentState.isRequired
      && !isPaymentAvailable
    ) {
      requestPaymentToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { modal: { showAuthModal } } = state;

  // Display Login Modal
  React.useEffect(() => {
    if (!jwtToken && !showAuthModal) {
      const timeout = setTimeout(() => {
        displayLoginModal({ target: '/checkout', dismissTarget: '/our-products', dismissable: false });
      }, 250);
      return () => { clearTimeout(timeout); };
    }

    return () => { };
  }, [displayLoginModal, jwtToken, showAuthModal]);

  // Display Existing Profiles Modal
  React.useEffect(() => {
    const purchaseIncludesProfile = purchase?.product.sku.includes('YP');
    const profileList = subscriptionList.filter((sub) => sub?.orderDetails?.product?.sku.includes('YP'));
    const subListIncludesProfile = profileList.length > 0;

    if (!hasConfirmedExistingProduct && purchaseIncludesProfile && subListIncludesProfile) {
      setHasConfirmedExistingProduct(true);
      showHideModal({
        show: true,
        modalType: 'existingProfile',
        params: {
          profiles: profileList,
        },
        target: '/checkout',
      });
    }
  }, [subscriptionList, showHideModal, hasConfirmedExistingProduct, purchase]);

  // Get account details
  React.useEffect(() => {
    if (
      accountDetailsRequestStatus !== fetchingStatus.idle
      || accountDetails
      || !customerId
    ) return;

    const getAccountDetails = async () => {
      setAccountDetailsRequestStatus(fetchingStatus.fetching);
      const accountQuery = `
      {
        getBillingAccountDetails(customerId:${customerId}) {
          billingAccount {
            companyName
            formattedAddress
            formattedPhoneNumber
          }
          billingMethod {
            __typename
            id
            paymentMethods {
              ... on CreditCardPaymentMethod {
                id
                card {
                  brand
                  expirationMonth
                  expirationYear
                  lastDigits
                }
              }
            }
          }
        }
      }
      `;

      try {
        const response = await axios.post(
          process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
          { query: accountQuery },
          { headers: { Authorization: jwtToken } },
        );

        const details = response?.data?.data?.getBillingAccountDetails;

        if (details) {
          setAccountDetails(details);
        }
        setAccountDetailsRequestStatus(fetchingStatus.complete);
      } catch (error) {
        setAccountDetailsRequestStatus(fetchingStatus.error);
      }
    };

    getAccountDetails();
  }, [customerId, jwtToken, accountDetails, accountDetailsRequestStatus, companyDetails]);

  // Get subscription list details
  React.useEffect(() => {
    if (
      subscriptionListRequestStatus !== fetchingStatus.idle
      || !customerId
      || !jwtToken
    ) return;

    const getSubscriptionList = async () => {
      setSubscriptionListRequestStatus(fetchingStatus.fetching);
      const subscriptionQuery = `
      {
        subscriptions (customerId: "${customerId}") {
          id
          orderDetails {
            updated
            activated
            product {
              sku
              id
              name
              configuration
            }
            productOptions {
              name
              id
              sku
              configuration
            }
            providerData {
              slug
            }
            status
          }
          productDetails {
            userConfiguration
            status
          }
          upcomingOrderDetails {
            updated
            activated
            product {
              sku
              id
              name
              configuration
            }
            productOptions {
              name
              id
              sku
              configuration
            }
            status
          }
        }
      }
    `;

      try {
        const response = await axios.post(
          process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
          { query: subscriptionQuery },
          { headers: { Authorization: jwtToken } },
        );

        const { data: { data } } = response;

        if (data) {
          setSubscriptionList(R.reject((sub) => !sub, data.subscriptions));
        }
        setSubscriptionListRequestStatus(fetchingStatus.complete);
      } catch (error) {
        setSubscriptionListRequestStatus(fetchingStatus.error);
      }
    };

    getSubscriptionList();
  }, [customerId, jwtToken, subscriptionList, subscriptionListRequestStatus]);

  return {
    // auth
    customerId,
    jwtToken,

    // purchase/products
    purchase,
    allContentfulProducts,
    pricingOptions,
    formRef,

    // billing
    accountDetails,
    accountDetailsRequestStatus,
    companyDetails,
    setCompanyDetails,
    isComplexCustomer,

    // discount
    discount,
    discountValid,
    setDiscount,

    // payment
    needPayment,
    isPaymentAvailable,

    // terms
    termsDetails,
    setTermsDetails,
    submitting,
    handleCheckoutClick,
  };
};

export default useCheckout;
