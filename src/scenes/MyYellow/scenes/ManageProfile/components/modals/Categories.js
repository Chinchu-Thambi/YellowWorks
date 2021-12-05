import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';
import Select from 'react-select/async';
import styled from 'styled-components';

import { ButtonContainer, ErrorMessage, EditWrapper } from './Styled';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';
import Tag from '../../../../../../components/Tag';

import AuthContext from '../../../../../../components/Auth/AuthContext';
import listCategories from '../../../../../../services/graphql/listCategories';

import ProductContext from '../../../../services/ProductContext';

const SetSelect = styled(Select)`
`;

const TextLeft = styled.p`
  text-align: left;
`;

const path = ['categories'];

const defaultCategories = [
  { name: 'Builders', id: 396 },
  { name: 'Beauty Therapy', id: 343 },
  { name: 'Carpet & Furniture Cleaning', id: 464 },
  { name: 'Cleaners - Commercial', id: 510 },
  { name: 'Concrete', id: 554 },
  { name: 'Counselling Services', id: 583 },
  { name: 'Earthmovers', id: 684 },
  { name: 'Electricians', id: 701 },
  { name: 'Financial Services', id: 811 },
  { name: 'Furniture Removal & Packers', id: 9434 },
  { name: 'Handyman Services', id: 940 },
  { name: 'Lawnmowing Services', id: 1071 },
  { name: 'Mortgages & Loans', id: 1181 },
  { name: 'Osteopaths', id: 1233 },
  { name: 'Painters & Paperhangers', id: 1244 },
  { name: 'Plumbers', id: 1311 },
  { name: 'Restaurants', id: 1403 },
  { name: 'Scaffolding', id: 1443 },
  { name: 'Tile Installation', id: 1622 },
  { name: 'Tree Services', id: 1657 },
];

const CategoriesModal = ({ onDismiss }) => {
  const authStore = React.useContext(AuthContext) || {};
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [error, setError] = React.useState('');
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = ({ value: id, label }) => {
    setError('');
    const selectedCategory = {
      id,
      name: label,
    };

    const updatedCategories = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedCategory),
    )(localData);

    setLocalData(updatedCategories);
  };

  const handleSave = async () => {
    if (localData.length === 0) {
      setError('You must select at least one category.');
      return;
    }

    setError('');
    setPendingSave(true);

    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    setPendingSave(false);

    if (success) {
      onDismiss();
    }
  };

  const transformToOption = ({ name, id }) => ({
    value: id,
    label: name,
  });

  const loadCategories = async (inputValue) => {
    let categoryList;

    if (inputValue) {
      categoryList = await listCategories({
        autocomplete: inputValue,
        jwtToken: authStore.jwtToken,
      });
    } else {
      categoryList = defaultCategories;
    }

    return categoryList
      .slice(0, 20)
      .map(transformToOption);
  };

  const removeCategory = ({ id }) => {
    const matchingBoosts = R.compose(
      R.find(R.pathEq(['category', 'id'], id)),
      R.pathOr([], ['formData', 'productAttributes', 'boosts']),
    )(productState);

    if (matchingBoosts) {
      setError(`
        There's a boost configured for this category. 
        Please make sure your boosts are correctly set before removing a category.
      `);
      return;
    }

    setError('');
    const updatedCategories = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(localData);
    setLocalData(updatedCategories);
  };

  return (
    <EditWrapper>
      <Box as="p" textAlign="center" mb={3}>
        Select all relevant categories for your business
      </Box>
      <SetSelect
        defaultOptions
        placeholder="Select..."
        loadOptions={loadCategories}
        onChange={(e) => handleChange(e)}
        value={null}
      />
      <TextLeft>
        {localData && localData.map((category) => (
          <Tag
            key={category.id}
            onRemove={() => removeCategory({ id: category.id })}
          >
            {category.name}
          </Tag>
        ))}
      </TextLeft>
      { error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
      </ButtonContainer>
    </EditWrapper>
  );
};

CategoriesModal.defaultProps = {
  onDismiss: () => {},
};
CategoriesModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default CategoriesModal;
