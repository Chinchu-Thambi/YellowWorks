import * as R from 'ramda';
import { optionMappings } from './skuMappings';

const getSelectableOptions = ({
  allProducts, product,
}) => R.filter(
  (p) => optionMappings[product?.sku]?.includes(
    R.prop('sku', p),
  ),
)(allProducts);

export default getSelectableOptions;
