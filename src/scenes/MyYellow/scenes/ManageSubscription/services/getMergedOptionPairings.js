/* eslint-disable no-unused-expressions */
import * as R from 'ramda';

const boostMap = {
  CBBRONZE: 'BRONZE',
  CBSILVER: 'SILVER',
  CBGOLD: 'GOLD',
};

const getMergedOptionPairings = ({
  formData,
  originalSubscription,
  mergedSubscription,
  addressRegion,
  upcomingSubscription,
}) => {
  let categories = formData?.categories.length > 0 ? [...formData.categories] : [];
  // Add regions to list from servicing areas
  let regions = formData?.location?.areaServed?.region
    && (Array.isArray(formData?.location?.areaServed?.region)
      ? R.uniqBy(R.prop('id'), formData?.location?.areaServed?.region)
      : [formData?.location?.areaServed?.region]);

  // Add regions to list from address, accounting for no servicing areas
  if (addressRegion) {
    if (regions) {
      regions.push(addressRegion);
    } else {
      regions = [addressRegion];
    }
  }

  // Add regions to list from boosts
  const boostRegionList = originalSubscription?.productOptions
    && R.uniqBy(R.prop('id'), originalSubscription.productOptions.map(
      (option) => option?.configuration?.productAttributes?.boosts?.[0]?.region,
    ));
  regions?.push(...boostRegionList);

  const formDataBoostRegionList = formData?.productAttributes?.boosts
  && R.uniqBy(R.prop('id'), formData?.productAttributes?.boosts.map(
    (boost) => boost?.region,
  ));
  formDataBoostRegionList && regions?.push(...formDataBoostRegionList);

  // Filter duplicate regions
  regions = regions && R.uniqBy(R.prop('id'), regions);

  const boostCategoryList = originalSubscription.productOptions
    && R.uniqBy(R.prop('id'), originalSubscription.productOptions.map(
      (option) => option?.configuration?.productAttributes?.boosts?.[0]?.category,
    ));
  categories?.push(...boostCategoryList.filter((boost) => !!boost));

  const formDataBoostCategoryList = formData?.productAttributes?.boosts
  && R.uniqBy(R.prop('id'), formData?.productAttributes?.boosts.map(
    (boost) => boost?.category,
  ));
  formDataBoostCategoryList && categories?.push(...formDataBoostCategoryList.filter((boost) => !!boost));

  // Filter duplicate categories
  categories = categories && R.uniqBy(R.prop('id'), categories);

  const optionPairings = [];

  if (regions) {
    categories?.forEach((category) => {
      regions.forEach((region) => {
        region && optionPairings.push({
          configuration: {
            productAttributes: {
              boosts: [{ category, region }],
            },
          },
        });
      });
    });
  }
  const findCurrentBoost = (pairing) => {
    const path = ['configuration', 'productAttributes', 'boosts', 0];
    if (upcomingSubscription) {
      // upcomingSubscriptions configuration is a string, which only includes the name for region and category
      const parseConfiguration = (configuration) => R.tryCatch(JSON.parse, () => ({}))(configuration);
      const boostMatch = upcomingSubscription?.productOptions?.find(
        (boost) => {
          const parsedConfig = parseConfiguration(boost.configuration);
          return R.equals(parsedConfig?.category, R.path([...path, 'category', 'name'], pairing))
          && R.equals(parsedConfig?.region, R.path([...path, 'region', 'name'], pairing));
        }
      ) || null;
      if (!boostMatch) {
        return pairing;
      }
      const { category, region } = parseConfiguration(boostMatch.configuration);
      const newParsedConfiguration = {
        boost: boostMap[boostMatch?.sku],
        category: { name: category },
        id: boostMatch?.id,
        replaceId: boostMatch?.id,
        isNew: !!boostMatch?.id,
        region: { name: region },
      };
      return R.assocPath(
        ['configuration', 'productAttributes', 'boosts', 0],
        newParsedConfiguration,
        R.dissocPath(['configuration'], { ...boostMatch, newParsedConfiguration }),
      );
    }
    return mergedSubscription?.productOptions?.find(
      (boost) => R.equals(R.path(path, boost)?.category?.id, R.path(path, pairing)?.category?.id)
        && R.equals(R.path(path, boost)?.region?.id, R.path(path, pairing)?.region?.id)
    ) || pairing;
  };
  const mergedOptionPairings = optionPairings?.map(findCurrentBoost);
  return mergedOptionPairings;
};

export default getMergedOptionPairings;
