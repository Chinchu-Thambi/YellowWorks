import * as R from 'ramda';

const getInitialBoostConfiguration = (boosts = []) => (productObject) => {
  const productObjectConfig = JSON.parse(productObject.configuration);
  const boostsMatch = boosts.find((boost) => productObjectConfig.category === boost.category.name && productObjectConfig.region === boost.region.name);
  return R.assocPath(
    ['configuration', 'productAttributes', 'boosts', 0],
    { ...boostsMatch, replaceId: boostsMatch?.id },
    R.dissocPath(['configuration'], { ...productObject, configuration: productObjectConfig }),
  );
};

export default getInitialBoostConfiguration;
