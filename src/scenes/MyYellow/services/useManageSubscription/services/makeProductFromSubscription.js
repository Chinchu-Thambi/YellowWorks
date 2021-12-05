import * as R from 'ramda';

import findProduct from './findProduct';

const makeBigCommerceOptions = ({
  bcModifiers,
  options,
}) => Object.entries(options).map(
  ([key, value]) => ({
    option_id: R.compose(
      R.prop('id'),
      R.find(R.propEq('display_name', key)),
    )(bcModifiers),
    option_value: value,
  }),
);

const makeProductFromSubscription = ({
  bcProducts, originalSubscription,
}) => (subscriptionItem) => {
  const subscriptionProduct = findProduct({
    bcProducts, sku: subscriptionItem.sku,
  });

  let options = {
    subscriptionId: originalSubscription.subscriptionId,
    itemId: subscriptionItem.id,
    startDate: 1,
  };

  let existingItem;

  if (originalSubscription.subscriptionId === subscriptionItem.id) {
    existingItem = originalSubscription.product;
  } else {
    existingItem = R.compose(
      R.find(R.propEq('id', subscriptionItem.id)),
      R.prop('productOptions'),
    )(originalSubscription);
  }

  if (existingItem) {
    if (existingItem.sku === subscriptionItem.sku) return null;

    const changeTypeOption = R.compose(
      ({ display_name: optionName, option_values: optionId }) => ({
        optionName,
        optionId,
      }),
      R.evolve({
        option_values: R.compose(
          R.prop('id'),
          R.find(R.propEq('label', existingItem.sku)),
        ),
      }),
      R.find(
        R.compose(
          R.includes(existingItem.sku),
          R.map(R.prop('label')),
          R.prop('option_values'),
        ),
      ),
      R.prop('modifiers'),
    )(subscriptionItem);

    // changeTypeOption is expected to contain displayName:optionId value pairs like
    // 'upgradeFrom':122 or 'downgradeFrom':194, representing the bigcommerce options

    options = {
      ...options,
      [changeTypeOption.optionName]: changeTypeOption.optionId,
    };
  }

  const optionSelections = makeBigCommerceOptions({
    bcModifiers: subscriptionProduct.modifiers,
    options,
  });

  return {
    quantity: 1,
    productId: subscriptionProduct.bigCommerceId,
    optionSelections,
  };
};

export default makeProductFromSubscription;
