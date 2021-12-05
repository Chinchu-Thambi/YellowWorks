import * as R from 'ramda';

const getIsPremium = R.compose(
  R.any(
    R.compose(
      R.startsWith('YPPREMIUM'),
      R.prop('value'),
    ),
  ),
  R.pathOr([], ['orderDetails', 'userSchema', 'metadata', 'sku']),
);


export default getIsPremium;
