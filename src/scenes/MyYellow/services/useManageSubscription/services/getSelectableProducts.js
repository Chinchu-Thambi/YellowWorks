import * as R from 'ramda';
import { skuMappings } from './skuMappings';

const getSelectableProducts = ({
  allProducts, product,
}) => {
  let selectableProducts = R.filter(
    (p) => skuMappings[product.sku]?.includes(
      R.prop('sku', p),
    ),
  )(allProducts);

  if (product?.sku !== 'YPPREMIUMLOYAL') {
    selectableProducts = R.reject((option) => option.sku === 'YPPREMIUMLOYAL')(selectableProducts);
  }
  if (R.any(R.propEq('sku', 'YPPREMIUM'), selectableProducts)) {
    const premiumProd = R.find(R.propEq('sku', 'YPPREMIUM'))(selectableProducts);
    const desiredPricingPlan = product?.sku === 'YPPREMIUM' ? R.find(R.propEq('id', product?.pricingPlan))(premiumProd?.pricingPlan) : premiumProd?.pricingPlan?.[1];
    const newProduct = R.assoc('pricingPlan', [desiredPricingPlan], R.find(R.propEq('sku', 'YPPREMIUM'))(selectableProducts));
    selectableProducts = R.compose(
      R.append(newProduct),
      R.reject(R.propEq('sku', 'YPPREMIUM')),
    )(selectableProducts);
  }
  return selectableProducts;
};

export default getSelectableProducts;
