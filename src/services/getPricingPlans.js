import {
  formatPrice,
} from '../util';

export const getMainPricingPlan = (sku, pricingPlans) => pricingPlans?.[sku]?.[0];

export const getFirstPricingPlan = (product) => (
    product?.pricingPlan?.[0]
);

export const formatPricingPlanAmount = (pricingPlan) => formatPrice(pricingPlan?.amount / 100);

export const getTotalFromSubscription = (subscription, pricingPlans) => {
  const productPricingPlan = getMainPricingPlan(subscription?.product?.sku, pricingPlans);
  const productOptionPricingPlans = subscription?.productOptions?.map((option) => getMainPricingPlan(option, pricingPlans));
  return productPricingPlan + productOptionPricingPlans;
};
