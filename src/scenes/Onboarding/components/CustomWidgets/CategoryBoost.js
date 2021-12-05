import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import * as R from 'ramda';

import ValidationController from '../../../../components/ValidationController';
import useRegions from '../../../../services/useRegions';

const transformToOption = ({ id, name }) => ({
  value: id,
  label: name,
});

const getMainBoost = (purchasedBoosts = []) => ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE']
  // searches for available boost types
  .reduce((acc, boostType) => {
    if (!acc) {
      // in the purchased boost array
      const boostObject = purchasedBoosts?.find(
        R.pathEq(['properties', 'boost', 'const'],
          boostType),
      );

      if (boostObject) {
        const id = R.path(['properties', 'id', 'const'])(boostObject);
        // and returns the first one it finds
        return {
          id,
          boost: boostType,
        };
      }
    }

    return acc;
  }, null);

const CategoryBoost = (props) => {
  const {
    formData,
    onChange,
    schema,
  } = props;

  const selectedCategories = formData?.categories ?? [];
  const purchasedBoosts = R.path(['productAttributes', 'properties', 'boosts', 'items', 'oneOf'])(schema);
  const mainBoost = getMainBoost(purchasedBoosts);
  const selectedBoost = formData?.productAttributes?.boosts?.[0] ?? {};

  const categoryRef = React.useRef(null);
  const regionRef = React.useRef(null);
  const [pairSelection, setPairSelection] = React.useState(selectedBoost);
  const { getRegions, getRegionFromString } = useRegions();

  const regionIds = R.compose(
    R.uniq,
    R.map(R.prop('id')),
    R.filter(Boolean),
    R.flatten,
  )([
    // service regions
    formData?.location?.areaServed?.region,
    // address region
    getRegionFromString(formData?.location?.address?.administrativeArea),
  ]);

  const regionList = getRegions({ byType: 3 })
    ?.map(transformToOption)
    .filter((region) => regionIds.includes(region.value));

  const handleCategoryChange = ({ value: id, label: name }) => {
    const category = {
      id,
      name,
    };

    setPairSelection({
      ...pairSelection,
      category,
    });
  };

  const handleRegionChange = ({ value: id, label: name }) => {
    const region = { id, name };

    setPairSelection({
      ...pairSelection,
      region,
    });
  };

  const loadRegions = async (inputValue) => {
    if (inputValue === '') {
      return regionList;
    }
    return regionList.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadCategories = async () => selectedCategories
    .map(transformToOption);

  // remove non-matching category/region
  React.useEffect(() => {
    const updatedPair = { ...pairSelection };
    const matchingCategory = selectedCategories.some(({ id }) => id === pairSelection.category?.id);
    const matchingRegion = regionIds.includes(pairSelection.region?.id);

    if (pairSelection.category && !matchingCategory) {
      delete updatedPair.category;
    }

    if (pairSelection.region && !matchingRegion) {
      delete updatedPair.region;
    }

    if (!R.equals(pairSelection, updatedPair)) {
      setPairSelection(updatedPair);
    }
  }, [pairSelection, regionIds, selectedCategories]);

  // fire onChange when category and region are selected
  React.useEffect(() => {
    const { category, region } = pairSelection;

    if (category && region && mainBoost) {
      const boostInput = [{
        ...mainBoost,
        category,
        region,
      }];

      if (!R.equals(boostInput, formData?.productAttributes?.boosts)) {
        onChange({
          ...formData,
          productAttributes: {
            ...formData.productAttributes,
            boosts: boostInput,
          },
        });
      }
    }
  }, [formData, mainBoost, onChange, pairSelection]);

  return (
    <>
      <h2>Boost one of your categories</h2>
      <p>
        You&rsquo;ve purchased a Category Boost.
        This can be used for one of your categories in one region.
      </p>
      <h3 id="categoryLabel">Select the category</h3>
      <Select
        value={transformToOption(pairSelection.category ?? {})}
        aria-labelledby="categoryLabel"
        defaultOptions
        loadOptions={loadCategories}
        onChange={handleCategoryChange}
        ref={categoryRef}
      />
      <ValidationController requiredRef={categoryRef} isBlocked={!pairSelection.category} />
      <h3 id="regionLabel">Select the region</h3>
      <Select
        value={transformToOption(pairSelection.region ?? {})}
        aria-labelledby="regionLabel"
        defaultOptions={regionList}
        loadOptions={loadRegions}
        onChange={handleRegionChange}
        ref={regionRef}
      />
      <ValidationController requiredRef={regionRef} isBlocked={!pairSelection.region} />
    </>
  );
};

CategoryBoost.defaultProps = {
  formData: {
    categories: [],
    productAttributes: {
      boosts: [],
    },
  },
  onChange: () => {},
  schema: {},
};

CategoryBoost.propTypes = {
  formData: PropTypes.shape({
    location: PropTypes.shape({
      areaServed: PropTypes.shape({
        region: PropTypes.arrayOf(PropTypes.shape({})),
      }),
      address: PropTypes.shape({
        administrativeArea: PropTypes.string,
      }),
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      }),
    ),
    productAttributes: PropTypes.shape({
      boosts: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
          region: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
  onChange: PropTypes.func,
  schema: PropTypes.shape({}),
};

export default CategoryBoost;
