import * as R from 'ramda';
import { getFirstPricingPlan } from './getPricingPlans';

const mapToProductInput = (product, subscriptionId = null) => {
  const input = {
    sku: product?.sku,
    replaceId: product.replaceId || subscriptionId,
    pricingPlan: R.is(String, product.pricingPlan) ? product.pricingPlan : getFirstPricingPlan(product)?.id,
    configuration: JSON.stringify(product?.configuration),
  };

  if (!input.sku && input.pricingPlan && input.pricingPlan) {
    input.sku = 'CANCEL';
  }

  if (input.sku && input.pricingPlan) {
    return input;
  }
  return null;
};

export default mapToProductInput;
