/* globals localStorage */
import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import * as R from 'ramda';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import NotificationManager from 'react-notifications/lib/NotificationManager';

import { useLocalStorage } from '../../util';
import { segmentTrack } from '../../util/segment';

import AuthContext from '../../components/Auth';

import mapPricingPlan from '../../scenes/BuyJourney/scenes/Checkout/services/mapPricingPlan';
import ProductContext from '../../scenes/MyYellow/services/ProductContext';

const QUERY_CONTENTFUL_PRODUCTS = graphql`
{
  allContentfulProductOption {
    nodes {
      recurringPayment
      name
      sku
      cartIcon {
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
      }
    }
  }
}
`;

const usePurchase = () => {
  const { jwtToken, customerId, isStaff } = React.useContext(AuthContext) || {};
  const { subscriptionId } = React.useContext(ProductContext) || '';
  const clientId = Cookies.get('_ga') || null;

  const { allContentfulProductOption } = useStaticQuery(QUERY_CONTENTFUL_PRODUCTS) || {};
  const allContentfulProducts = allContentfulProductOption?.nodes;

  const [purchase, setPurchase] = useLocalStorage('purchase', null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [discount, setDiscount] = React.useState({ code: '' });
  const [cachedDiscountCode, setCachedDiscountCode] = React.useState();

  const [pricingLoading, setPricingLoading] = React.useState(false);
  const [pricingOptions, setPricingOptions] = React.useState();

  // Reset Purchase record
  const resetPurchase = () => {
    setPurchase();
  };

  // Replaces cart functionality and records the product and childProduct selection
  // Tracks events that would otherwise occur on cart events for GA
  const initiatePurchase = React.useCallback(async ({ product = null, childProducts = [] }) => {
    if (!product?.sku || !product?.pricingPlan) { return; }
    if ((!isSubmitting && product) || (!isSubmitting && childProducts.length > 0)) {
      setIsSubmitting(true);
      setPurchase({
        product: {
          ...product,
          sku: product?.sku && R.toUpper(product?.sku),
        },
        childProducts: [...childProducts],
      });
      setPricingOptions({});
      segmentTrack({
        event: 'cart.updated', // Cart events still required for GA
        payload: {
          cartedProducts: R.filter((p) => !!p, [product, ...childProducts]),
          jwtToken,
          category: 'cart integration',
          clientId,
          hubspotId: customerId,
          isStaff,
          label: (`add ${product?.name}`),
        },
      });
      setIsSubmitting(false);
    }
  }, [isSubmitting, setPurchase, jwtToken, clientId, customerId, isStaff]);

  // Segment Tracking for a sucessful order
  const purchaseSuccessful = ({ subscription }) => {
    const productOptions = R.map((option) => option?.name)(R.path(['orderDetails', 'productOptions'])(subscription));
    const productslist = [R.path(['orderDetails', 'product', 'name'])(subscription), ...(productOptions || [])];
    segmentTrack({
      event: 'Order Completed',
      payload: {
        jwtToken,
        orderId: subscription?.id,
        revenue: pricingOptions?.baseAmount,
        tax: (pricingOptions?.fullMonthPrice?.tax),
        currency: 'NZD',
        isStaff,
        label: productslist.join(','),
        products: [purchase.product, ...purchase.childProducts],
        hubspotId: customerId,
        clientId,
      },
    });
    resetPurchase();
    navigate('/checkout/order-confirmation', {
      state: { subscription },
    });
  };

  // get/update pricing information
  React.useEffect(() => {
    if (
      pricingLoading
    ) return;

    if (!purchase || !jwtToken || !purchase.product) return;

    if (
      (cachedDiscountCode === discount?.code) && (pricingOptions?.fullMonthPrice || pricingOptions?.fullYearPrice)
    ) return;
    setPricingLoading(true);
    const getPricing = async () => {
      const query = `
        query getpricingOptions($customerId: ID, $product: ProductInput, $productOptions: [ProductInput!], $promotionCode: String, $subscriptionId: ID) {
          pricing(
            customerId: $customerId
            product: $product
            productOptions: $productOptions
            promotionCode: $promotionCode
            subscriptionId: $subscriptionId
          ) {
            fullMonthPrice {
              discount {
                amount
                end
                name
                start
              }
              grandTotal
              subtotal
              tax
              endDate
              startDate
            }
            remainingDaysPrice {
              discount {
                amount
                end
                name
                start
              }
              grandTotal
              subtotal
              tax
              endDate
              startDate
            }
            fullYearPrice {
              endDate
              grandTotal
              startDate
              subtotal
              tax
            }
            discountValidity {
              name
              validity
              description
            }
        }
      }
      `;
      setCachedDiscountCode(discount?.code || '');
      const product = purchase?.product && mapPricingPlan(purchase.product);
      const productOptions = purchase?.childProducts && R.filter((o) => !!o, purchase.childProducts?.map((p) => mapPricingPlan(p)));
      const variables = {
        customerId,
        product,
        productOptions,
        promotionCode: discount?.code || null,
        subscriptionId,
      };

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      const data = response.data.data?.pricing;
      if (data) {
        setPricingOptions(data);
        setPricingLoading(false);
      } else {
        NotificationManager.error('Pricing failed to load, your purchase has been reset. Please try again');
        setPurchase();
        setPricingOptions({});
        setDiscount({ code: '' });
        setPricingLoading(false);
      }
    };
    getPricing();
  }, [discount, purchase, pricingLoading, jwtToken, customerId, pricingOptions, cachedDiscountCode,
    subscriptionId, setPurchase]);

  // Detect for when purchase is cleared and remove the localStorage history.
  React.useEffect(() => {
    if (!purchase && localStorage.purchase) {
      localStorage.removeItem('purchase');
    }
  }, [purchase]);

  const purchaseStore = {
    // Products
    allContentfulProducts,
    // Checkout
    purchase,
    initiatePurchase,
    // Pricing
    pricingOptions,
    pricingLoading,
    // Checkout and Abandonment
    isSubmitting,
    purchaseSuccessful,
    resetPurchase,
    // Discount
    setDiscount,
    discount,
  };

  return purchaseStore;
};

export default usePurchase;
