import * as R from 'ramda';

const sameCartContent = (transaction, newSubscriptionItems) => {
  const existingCartSkus = R.countBy(R.prop('sku'))(transaction?.purchaseItems);
  const newSubscriptionSkus = R.countBy(R.prop('sku'))(newSubscriptionItems);

  return R.equals(existingCartSkus, newSubscriptionSkus);
};

export default sameCartContent;
