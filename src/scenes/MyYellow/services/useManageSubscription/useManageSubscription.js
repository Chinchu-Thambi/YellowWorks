import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import AuthContext from '../../../../components/Auth';
import { PaymentContext } from '../../../../components/Payment/Context';
import { formatDateWithMonthName } from '../../../../util/formatting';

import ProductContext from '../ProductContext';

import parseConfiguration from './services/parseConfiguration';
import getSelectableProducts from './services/getSelectableProducts';
import getSelectableOptions from './services/getSelectableOptions';
import findProduct from './services/findProduct';
import getInitialBoostConfiguration from './services/getInitialBoostConfiguration';
import usePurchase from '../../../../services/usePurchase';
import mapToProductInput from '../../../../services/mapToProductInput';
// import mapPricingPlan from '../../../BuyJourney/scenes/Checkout/services/mapPricingPlan';
import sameCartContent from './services/sameCartContent';
import getSubscriptionPrice from '../../../../services/getSubscriptionPrice';
import { getNextMonth } from '../../../../util';

const formatDate = (timestamp) => {
  const dateObj = new Date(timestamp * 1000);
  return dateObj;
};

const QUERY_PRODUCTS = graphql`
  {
      productPlatform {
        products {
          family
          name
          pricingPlan {
            amount
            id
            interval
          }
          printDeliveryDate
          printLastBookingDate
          printProductCode
          printProductName
          requiresPayment
          sku
        }
      }
    }
`;

const QUERY_NEW_SUBSCRIPTION_MUTATION = `
  mutation updateSubscription (
    $customerId: ID!,
    $subscriptionId: ID!,
    $product: ProductInput,
    $productOptions: [ProductInput!],
    $promotionCode: String,
    $paymentMethodId: ID) {
    updateSubscription(
      customerId: $customerId
      subscriptionId: $subscriptionId
      product: $product
      productOptions: $productOptions
      promotionCode: $promotionCode
      paymentMethodId: $paymentMethodId
    ) {
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

const emptyTransaction = {
  loading: false,
  purchaseItems: [],
};

const useManageSubscription = () => {
  const rawProducts = useStaticQuery(QUERY_PRODUCTS) || {};
  const allProducts = R.path(['productPlatform', 'products'])(rawProducts);

  const { customerId, jwtToken } = React.useContext(AuthContext) || {};
  const productContext = React.useContext(ProductContext);
  const { defaultPaymentMethod } = React.useContext(PaymentContext) || {};
  const {
    pricingOptions, initiatePurchase, discount, setDiscount, resetPurchase,
  } = usePurchase();
  const [transaction, setTransaction] = React.useState(emptyTransaction);
  const [cachedPricingOptions, setCachedPricingOptions] = React.useState(pricingOptions);
  const getSubscriptionSummary = async () => {
    const query = `
        query getProductSummaryData($customerId: ID!) {
          subscriptions(
            customerId: $customerId
          ) {
              id
              orderDetails {
                scheduled
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
              upcomingOrderDetails {
                status
                scheduled
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
              }
            }
        }
      `;
    const variables = {
      customerId,
    };

    const response = await axios.post(
      process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
      { query, variables },
      { headers: { Authorization: jwtToken } },
    );
    return response.data.data.subscriptions;
  };

  const [newSubscription, setNewSubscription] = React.useState({
    product: {}, productOptions: [],
  });
  const originalSubscription = {
    subscriptionId: productContext?.subscriptionId,
    product: parseConfiguration(productContext?.orderDetails?.product) ?? {}, // add pricingplans
    productOptions: productContext?.orderDetails?.productOptions?.map(
      getInitialBoostConfiguration(productContext.formData?.productAttributes?.boosts)
    ) ?? [],
  };

  const mergedSubscription = {
    product: {
      ...originalSubscription.product,
      ...newSubscription.product, // merges content in newSubscription on the original
    },
    productOptions: R.uniqBy(R.prop('id'))([
      ...newSubscription.productOptions, // new first because the original will be filtered by uniqBy
      ...originalSubscription.productOptions,
    ]),
  };

  // consolidate subscription changes in an array
  const newSubscriptionItems = [
    newSubscription.product,
    ...newSubscription.productOptions,
  ].filter(R.prop('pricingPlan'));

  const selectableProducts = getSelectableProducts({
    allProducts,
    product: originalSubscription?.product,
  });

  const selectableOptions = getSelectableOptions({
    allProducts,
    product: originalSubscription?.product,
  });

  const editProduct = ({ newSku }) => {
    const newProduct = findProduct({
      allProducts,
      sku: newSku,
      originalProduct: originalSubscription?.product,
    });

    if (newProduct.sku === originalSubscription.product.sku) {
      setNewSubscription({
        ...newSubscription,
        product: {},
      });
      return;
    }

    setNewSubscription({
      ...newSubscription,
      product: {
        ...newProduct,
        id: originalSubscription.subscriptionId,
        replaceId: originalSubscription.subscriptionId,
      },
    });
  };

  const editOption = ({
    id, replaceId, newSku, originalSku, configuration,
  }) => {
    let rawProductOptions = newSubscription.productOptions;
    if (id) {
      // remove current id from previously selected options
      rawProductOptions = R.reject(
        R.propEq('id', id),
      )(rawProductOptions);
    }

    let newOption = findProduct({
      allProducts,
      sku: newSku === 'CANCEL' ? originalSku : newSku,
    });

    if (newSku === 'CANCEL') {
      newOption = R.assocPath( // Replace sku and pricing plan
        ['sku'],
        '',
      )(R.assocPath(
        ['pricingPlan', 0, 'id'],
        'CANCEL',
      )(newOption));
    }
    // cases where the item in new subscription is a "non" item:
    const originalOption = originalSubscription.productOptions.find(R.propEq('id', id));
    if (
      // the user selects the same sku as the original
      originalOption?.sku === newSku
      // the user removes a selection that wasn't in the original
      || (!originalOption && newSku === 'CANCEL')
    ) {
      setNewSubscription({
        ...newSubscription,
        productOptions: rawProductOptions,
      });
      return;
    }
    setNewSubscription({
      ...newSubscription,
      productOptions: [
        ...rawProductOptions,
        {
          ...newOption,
          // adding configuration and id to the object appended to productOptions
          configuration,
          replaceId,
          id: id ?? uuid(),
        },
      ],
    });
  };

  const resetSubscription = () => {
    resetPurchase();
    setNewSubscription({
      product: {}, productOptions: [],
    });
  };

  const doSubmit = async () => {
    // New Change order input neededed for simplify TODO
    const variables = {
      customerId,
      subscriptionId: productContext?.subscriptionId,
      product: newSubscription.product.sku && mapToProductInput(newSubscription.product, originalSubscription.subscriptionId),
      productOptions: newSubscription.productOptions.map((option) => mapToProductInput(option)) || [],
      paymentMethodId: defaultPaymentMethod?.id,
    };
    const graphqlRequest = await axios.post(
      process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
      {
        query: QUERY_NEW_SUBSCRIPTION_MUTATION,
        variables,
      },
      { headers: { Authorization: jwtToken } },
    );
    const effectiveDate = (pricingOptions?.remainingDaysPrice?.grandTotal < 0)
      ? getNextMonth()
      : pricingOptions?.remainingDaysPrice?.startDate;

    setTransaction({
      ...transaction,
      todaysCharge: pricingOptions?.remainingDaysPrice?.subtotal / 100 < 0
        ? 0 : pricingOptions?.remainingDaysPrice?.subtotal / 100,
      effectiveDate: formatDateWithMonthName(formatDate(effectiveDate)),
    });
    return { graphqlRequest };
  };

  const getOriginalSubscriptionPrice = async () => {
    const variables = {
      customerId,
      subscriptionId: productContext?.subscriptionId,
    };
    const data = await getSubscriptionPrice(variables);
    const currentTotalPrice = data?.fullMonthPrice?.subtotal === 0
      ? 0 : data?.fullMonthPrice?.subtotal / 100 || undefined;
    return currentTotalPrice;
  };

  React.useEffect(() => {
    if (
      newSubscriptionItems.length === 0
      || transaction.loading
      || sameCartContent(transaction, newSubscriptionItems)
    ) {
      return;
    }
    setTransaction({
      ...transaction,
      loading: true,
    });
    if (discount?.code) {
      setDiscount({ code: '' });
    }
    const childProducts = R.filter((o) => !!o,
      newSubscription?.productOptions.map((option) => mapToProductInput(option)
    ));
    const product = newSubscription?.product.sku ? mapToProductInput(newSubscription.product) : mapToProductInput(originalSubscription.product, originalSubscription.subscriptionId);
    initiatePurchase({
      product,
      childProducts,
    });
  }, [newSubscription, initiatePurchase, productContext, newSubscriptionItems, transaction,
    mergedSubscription, originalSubscription, discount, setDiscount]);

  // update Todays Charge
  React.useEffect(() => {
    if (
      newSubscriptionItems.length === 0
      || (sameCartContent(transaction, newSubscriptionItems) && cachedPricingOptions === pricingOptions)
      || !pricingOptions
    ) {
      return;
    }
    setCachedPricingOptions(pricingOptions);
    const effectiveDate = (pricingOptions?.remainingDaysPrice?.grandTotal < 0)
      ? getNextMonth()
      : formatDate(pricingOptions?.remainingDaysPrice?.startDate);

    setTransaction({
      ...transaction,
      purchaseItems: newSubscriptionItems,
      loading: false,
      todaysCharge: pricingOptions?.remainingDaysPrice?.subtotal / 100 < 0
        ? 0 : pricingOptions?.remainingDaysPrice?.subtotal / 100,
      newSubscriptionMonthlyCharge: pricingOptions?.fullMonthPrice?.subtotal / 100 < 0
        ? 0 : pricingOptions?.fullMonthPrice?.subtotal / 100,
      effectiveDate: formatDateWithMonthName(effectiveDate),
    });
  }, [cachedPricingOptions, newSubscriptionItems, pricingOptions, transaction]);

  const subscriptionStore = {
    originalSubscription,
    newSubscription,
    mergedSubscription,
    selectableProducts,
    selectableOptions,
    editProduct,
    editOption,
    doSubmit,
    getSubscriptionSummary,
    resetSubscription,
    getOriginalSubscriptionPrice,
    transaction,
  };

  return subscriptionStore;
};

export default useManageSubscription;
