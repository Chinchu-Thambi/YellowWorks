import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as R from 'ramda';
import { Flex, Box } from 'rebass';

import Button from '../../../../../../../../components/Button';
import Spinner from '../../../../../../../../components/Spinner';
import ValidationController from '../../../../../../../../components/ValidationController';
import useRegions from '../../../../../../../../services/useRegions';
import ProductContext from '../../../../../../services/ProductContext';

import { Wrapper } from './CategoryBoostEdit.styled';

const transformToOption = ({ id, name }) => ({
  value: id,
  label: name,
});

const transformToDynamo = ({ value, label } = {}) => ({
  id: value,
  name: label,
});

const CategoryBoostEdit = (props) => {
  const {
    index,
    onDismiss,
  } = props;

  const productContext = React.useContext(ProductContext) || {};
  const categoryRef = React.useRef(null);
  const regionRef = React.useRef(null);
  const { getRegions, getRegionFromString } = useRegions();

  const categoryList = productContext.formData?.categories?.map(transformToOption);
  const boostList = productContext.formData?.productAttributes?.boosts;
  const boostObject = boostList[index];

  const [pairSelection, setPairSelection] = React.useState({
    category: categoryList.find((c) => c.value === boostObject.category.id),
    region: null, // to be filled later when regionList is populated
  });
  const [pendingSave, setPendingSave] = React.useState(false);

  const regionIds = R.compose(
    R.uniq,
    R.map(R.prop('id')),
    R.filter(Boolean),
    R.flatten,
  )([
    // service regions
    productContext.formData?.location?.areaServed?.region,
    // address region
    getRegionFromString(productContext.formData?.location?.address?.administrativeArea),
  ]);

  const regionList = getRegions({ byType: 3 })
    ?.map(transformToOption)
    .filter((region) => regionIds.includes(region.value));

  const handleCategoryChange = (selectedCategory) => {
    setPairSelection({
      ...pairSelection,
      category: selectedCategory,
    });
  };

  const handleRegionChange = (selectedRegion) => {
    setPairSelection({
      ...pairSelection,
      region: selectedRegion,
    });
  };

  const handleSave = async () => {
    const { category, region } = pairSelection;

    if (category && region) {
      const updatedBoostSelection = {
        ...boostObject,
        category: transformToDynamo(category),
        region: transformToDynamo(region),
      };

      if (!R.equals(boostObject, updatedBoostSelection)) {
        setPendingSave(true);
        const { success } = await productContext.saveData({
          path: ['productAttributes', 'boosts', index],
          data: updatedBoostSelection,
        });
        setPendingSave(false);

        if (success) {
          onDismiss();
        }
      }
    }
  };

  // update internal state when regions are loaded
  React.useEffect(() => {
    const region = regionList?.find((r) => r.value === boostObject.region.id);

    if (region && !pairSelection.region) {
      setPairSelection({
        ...pairSelection,
        region,
      });
    }
  }, [boostObject.region.id, pairSelection, regionList]);

  return (
    <Wrapper>
      <h3 id="categoryLabel">Select the category</h3>
      <Select
        value={pairSelection.category || null}
        aria-labelledby="categoryLabel"
        options={categoryList}
        onChange={handleCategoryChange}
        ref={categoryRef}
      />
      <ValidationController requiredRef={categoryRef} isBlocked={!pairSelection.category} />
      <h3 id="regionLabel">Select the region</h3>
      <Select
        value={pairSelection.region || null}
        aria-labelledby="regionLabel"
        options={regionList}
        onChange={handleRegionChange}
        ref={regionRef}
      />
      <ValidationController requiredRef={regionRef} isBlocked={!pairSelection.region} />

      <Flex mt={3} justifyContent="center">
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
      </Flex>
    </Wrapper>
  );
};

CategoryBoostEdit.propTypes = {
  index: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default CategoryBoostEdit;
