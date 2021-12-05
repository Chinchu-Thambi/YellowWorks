import React, { useEffect } from 'react';
import { Flex } from 'rebass/styled-components';
import axios from 'axios';
import * as R from 'ramda';
import { navigate } from 'gatsby';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../../../../components/Auth/AuthContext';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { Container } from '../../../../components/Grid';
import { PaymentContext } from '../../../../components/Payment/Context';
import PaymentWrapper from '../../../../components/Payment/PaymentWrapper';
import Spinner from '../../../../components/Spinner';
import {
  errorText, getErrorString,
} from '../../../../util';

import {
  CompanyDetails, PaymentDetails, TermsDetails, ExistingCard, ComplexCustomerPayment, SummaryColumn,
} from './components';
import {
  Separator, Loading, ExtendedContainer, CheckoutContainer, Details, DetailsContainer,
} from './components/Styled';
import DiscountDetails from './components/DiscountDetails';
import usePurchase from '../../../../services/usePurchase';
import orderProcessor from './services/orderProcessor';

const fetchingStatus = {
  idle: 'idle',
  fetching: 'fetching',
  complete: 'complete',
  error: 'error',
};

const isPaymentNeeded = ({ purchase }) => {
  if (!purchase) {
    return false;
  }
  const totalPrice = R.reduce(R.add, 0, [
    purchase?.product, ...purchase?.childProducts,
  ].map((product) => product?.price));
  if (totalPrice > 0) {
    return true;
  }

  if (purchase?.product?.requiresPayment) {
    return true;
  }

  if (R.any((o) => o?.pricingPlan?.amount > 0)([purchase.product, ...purchase?.childProducts])) {
    return true;
  }

  if (R.any((o) => o?.requiresPayment)(purchase.childProducts)) {
    return true;
  }

  return false;
};

const Checkout = () => {
  const {
    state, jwtToken, displayLoginModal, customerId, showHideModal,
  } = React.useContext(AuthContext);
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
      });
      purchaseSuccessful({ subscription });
      navigate('/checkout/order-confirmation', {
        state: { subscription },
      });
    } catch (err) {
      setSubmitting(false);
      console.log(err);
      NotificationManager.error(getErrorString(err), '', 5000);
    }
  };

  // Request payment token
  useEffect(() => {
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
  useEffect(() => {
    if (!jwtToken && !showAuthModal) {
      const timeout = setTimeout(() => {
        displayLoginModal({ target: '/checkout', dismissTarget: '/our-products', dismissable: false });
      }, 250);
      return () => { clearTimeout(timeout); };
    }

    return () => { };
  }, [displayLoginModal, jwtToken, showAuthModal]);

  // Display Existing Profiles Modal
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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

  return (
    <>
      <Header />
      <Container ExtendedContainer={ExtendedContainer}>
        <h1>Secure checkout</h1>
        <CheckoutContainer justifyContent="space-between" alignItems="start">
          {!purchase ? (
            <h2>Oh no! You haven&apos;t selected any valid products.<br /><a href="/our-products">Go to our products page</a></h2>
          ) : (
            <SummaryColumn
              purchase={purchase}
              allContentfulProducts={allContentfulProducts}
              pricingOptions={pricingOptions}
            />
          )}
          <Details>
            <DetailsContainer>
              <CompanyDetails
                formRef={formRef}
                existingDetails={accountDetails?.billingAccount}
                details={companyDetails}
                setDetails={setCompanyDetails}
              />
            </DetailsContainer>
            {((!!pricingOptions?.remainingDaysPrice?.grandTotal) || (discountValid && discount?.code)) && (
            <DetailsContainer>
              <DiscountDetails onChange={setDiscount} pricingOptions={pricingOptions} />
            </DetailsContainer>
            )}
            <DetailsContainer>
              {needPayment && (
                <>
                  {!customerId && <PaymentDetails />}
                  {accountDetailsRequestStatus === fetchingStatus.fetching && <Spinner />}
                  {accountDetailsRequestStatus === fetchingStatus.complete && (
                    <>
                      {
                        // I'm disabling nested ternary because this was the best way to express the following:
                        // eslint-disable-next-line no-nested-ternary
                        isComplexCustomer ? ( // first check for isCustomerComplex
                          <ComplexCustomerPayment /> // render the complex customer payment notice.
                        ) : ( // otherwise
                          isPaymentAvailable // checks if payment is available
                            ? accountDetails?.billingMethod?.paymentMethods?.slice(0, 1).map(({ card }) => (
                              <ExistingCard // and render the existing card
                                key={card.lastDigits}
                                brand={card.brand}
                                expirationMonth={card.expirationMonth}
                                expirationYear={card.expirationYear}
                                lastDigits={card.lastDigits}
                              />
                            )) // if no account is found (complex customer) and no card is registered
                            : <PaymentDetails /> // ask for payment details.
                        )
                      }
                    </>
                  )}
                  <Separator />
                </>
              )}
              <TermsDetails
                details={termsDetails}
                setDetails={setTermsDetails}
                needPayment={needPayment}
              />
              <Flex justifyContent="center" textAlign="center" mb={3}>
                {submitting ? (<Loading />) : null}
              </Flex>
              {(
                jwtToken
              ) && (
                <Flex justifyContent="center">
                  {!submitting && (
                    <Button
                      to="/checkout"
                      onClick={handleCheckoutClick}
                      disabled={submitting || !purchase}
                    >
                      Submit
                    </Button>
                  )}
                </Flex>
              )}
            </DetailsContainer>
          </Details>
        </CheckoutContainer>
      </Container>
      <Footer hideCategories />
    </>
  );
};

// using the component wrapper instead of the withPayment hoc because we don't want the async loader for the whole page.
export default () => (
  <PaymentWrapper>
    <Checkout />
  </PaymentWrapper>
);
