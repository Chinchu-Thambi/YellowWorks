import * as R from 'ramda';

const mapPricingPlan = (product) => {
  const mappedProduct = R.assocPath(
    ['pricingPlan'],
    (R.path(['pricingPlan', 'id'])(product)),
    product,
  );
  if (R.is(String, product?.pricingPlan)) {
    return product;
  }
  return mappedProduct;
};

export default mapPricingPlan;
