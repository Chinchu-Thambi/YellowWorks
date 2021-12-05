import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select/async';
import * as R from 'ramda';

import Tag from '../../../../components/Tag';

import ValidationController from '../../../../components/ValidationController';

const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;
let loadedCategories = [];

const defaultCategories = [
  { name: 'Builders' },
  { name: 'Beauty Therapy' },
  { name: 'Carpet & Furniture Cleaning' },
  { name: 'Cleaners - Commercial' },
  { name: 'Concrete' },
  { name: 'Counselling Services' },
  { name: 'Earthmovers' },
  { name: 'Electricians' },
  { name: 'Financial Services' },
  { name: 'Furniture Removal & Packers' },
  { name: 'Handyman Services' },
  { name: 'Lawnmowing Services' },
  { name: 'Mortgages & Loans' },
  { name: 'Osteopaths' },
  { name: 'Painters & Paperhangers' },
  { name: 'Plumbers' },
  { name: 'Restaurants' },
  { name: 'Scaffolding' },
  { name: 'Tile Installation' },
  { name: 'Tree Services' },
];

const transformToOption = ({ name }) => ({
  value: name,
  label: name,
});

const CategorySearchAds = (props) => {
  const [categoryList, setCategoryList] = React.useState(loadedCategories);
  const [currentInput, setCurrentInput] = React.useState('');
  const selectRef = React.useRef(null);

  const {
    formData,
    onChange,
    minItems,
    maxItems,
    title,
    description,
    required,
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
    const updatedCategories = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(formData);
    onChange(updatedCategories);
  };

  const loadCategories = useCallback(async (inputValue) => {
    let returnValue = categoryList;
    if (apiKey) {
      if (returnValue.length === 0 || currentInput !== inputValue) {
        const query = `
        query GetCategories {
          getAdwordsCategories(category: "${inputValue || ''}") {
            name
          }
        }`;

        const response = await axios.post(
          process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
          { query },
          { headers: { 'x-api-key': apiKey } },
        );
        const data = response.data.data.getAdwordsCategories;
        loadedCategories = data.length > 0 ? data : defaultCategories;
        returnValue = data.length > 0 ? data : defaultCategories;
        setCurrentInput(inputValue);
        setCategoryList(returnValue);
      }
    }
    return returnValue
      .slice(0, 20)
      .map(transformToOption);
  }, [categoryList, currentInput]);

  // Gets initial category state
  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <div>
      {title && (<h2>{title}</h2>)}
      {description && (<p>{description}</p>)}
      <Select
        defaultOptions
        placeholder="Select..."
        loadOptions={loadCategories}
        onChange={handleChange}
        value={null}
        isDisabled={maxItems && maxItems === formData.length}
        ref={selectRef}
        required={required}
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
    </div>
  );
};

CategorySearchAds.defaultProps = {
  formData: [],
  maxItems: 0,
  minItems: 99,
  title: '',
  description: '',
  required: false,
};

CategorySearchAds.propTypes = {
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
  title: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default CategorySearchAds;
