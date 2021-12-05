const checkFreeSubscription = (orderDetails) => {
  const productSku = orderDetails?.product?.sku;
  const productOptionsSkus = orderDetails?.productOptions?.map((o) => o.sku);
  // TODO: Replace YPBASIC sku with a bigcommerce pricing check for a $0 subscription.
  const response = (productSku === 'YPBASIC') && productOptionsSkus?.length === 0;

  return response;
};

export default checkFreeSubscription;
