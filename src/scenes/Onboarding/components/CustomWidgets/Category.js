import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import * as R from 'ramda';

import Tag from '../../../../components/Tag';

import AuthContext from '../../../../components/Auth/AuthContext';
import ValidationController from '../../../../components/ValidationController';
import listCategories from '../../../../services/graphql/listCategories';

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

const transformToOption = ({ name, id }) => ({
  value: id,
  label: name,
});

const Category = (props) => {
  const authStore = React.useContext(AuthContext) || {};
  const selectRef = React.useRef(null);

  const {
    formData,
    onChange,
    maxItems,
    minItems,
  } = props;

  const isBlocked = formData && formData.length < minItems;

  const handleChange = ({ value: id, label }) => {
    const selectedCategory = {
      id,
      name: label,
    };

    const updatedCategories = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedCategory),
    )(formData);

    onChange(updatedCategories);
  };

  const removeCategory = ({ id }) => {
    const updatedCategories = R.reject(
      R.pathEq(['id'], id),
    )(formData);

    onChange(updatedCategories);
  };

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

  return (
    <>
      <h2>My business categories</h2>
      <p>Select all relevant categories for your business</p>
      <Select
        defaultOptions
        placeholder="Select..."
        loadOptions={loadCategories}
        onChange={handleChange}
        value={null}
        isDisabled={maxItems && maxItems === formData.length}
        ref={selectRef}
      />
      <ValidationController requiredRef={selectRef} isBlocked={isBlocked} />
      <p>
        {formData && formData.map((category) => (
          <Tag
            key={category.id}
            onRemove={() => removeCategory({ id: category.id })}
          >
            {category.name}
          </Tag>
        ))}
      </p>
    </>
  );
};

Category.defaultProps = {
  formData: [],
  maxItems: 99,
  minItems: 1,
};

Category.propTypes = {
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      keywords: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
    }),
  ),
  maxItems: PropTypes.number,
  minItems: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Category;
