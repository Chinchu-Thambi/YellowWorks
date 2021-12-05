import * as R from 'ramda';

const findProduct = ({ allProducts, sku, originalProduct = null }) => {
  if (originalProduct) {
    const product = R.find(R.propEq('sku', sku))(allProducts);
    const desiredPricingPlan = originalProduct?.sku === 'YPPREMIUM' ? R.find(R.propEq('id', product?.pricingPlan?.[0]?.id))(product?.pricingPlan) : product?.pricingPlan?.[1];
    return R.assoc('pricingPlan', [desiredPricingPlan], product);
  }
  return R.find(R.propEq('sku', sku))(allProducts);
};

export default findProduct;
