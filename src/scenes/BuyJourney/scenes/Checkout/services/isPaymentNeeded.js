import * as R from 'ramda';

const isPaymentNeeded = ({ purchase }) => {
  if (!purchase) {
    return false;
  }
  const totalPrice = R.reduce(R.add, 0, [
    purchase?.product, ...purchase?.childProducts,
  ].map((product) => product?.price));
  if (totalPrice > 0) {
    return true;
  }

  if (purchase?.product?.requiresPayment) {
    return true;
  }

  if (R.any((o) => o?.pricingPlan?.amount > 0)([purchase.product, ...purchase?.childProducts])) {
    return true;
  }

  if (R.any((o) => o?.requiresPayment)(purchase.childProducts)) {
    return true;
  }

  return false;
};

export default isPaymentNeeded;
