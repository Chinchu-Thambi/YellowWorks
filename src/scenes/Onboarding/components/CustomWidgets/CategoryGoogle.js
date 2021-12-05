import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select/async';
import * as R from 'ramda';

import Tag from '../../../../components/Tag';

import ValidationController from '../../../../components/ValidationController';
import AuthContext from '../../../../components/Auth';

let loadedCategories = [];

const defaultCategories = [
  {
    id: 'gcid:carpenter',
    name: 'Carpenter',
  },
  {
    id: 'gcid:beauty_salon',
    name: 'Beauty Salon',
  },
  {
    id: 'gcid:house_cleaning_service',
    name: 'House cleaning service',
  },
];

const transformToOption = (cat) => ({
  value: cat,
  label: cat.name,
});

const CategoryGoogle = (props) => {
  const {
    jwtToken,
  } = React.useContext(AuthContext);
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
    placeholder,
    required,
  } = props;

  const isBlocked = formData && formData.length < minItems;

  const handleChange = ({ value, label }) => {
    const selectedCategory = {
      id: value.id,
      name: label,
    };

    const updatedCategories = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedCategory),
    )(formData);
    if (maxItems === 1) {
      onChange(updatedCategories[0]);
      return;
    }
    onChange(updatedCategories);
  };

  const removeCategory = ({ id }) => {
    const updatedCategories = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(formData);
    if (maxItems === 1) {
      onChange(updatedCategories[0]);
      return;
    }
    onChange(updatedCategories);
  };

  const loadCategories = useCallback(async (inputValue) => {
    let returnValue = categoryList;
    if (jwtToken) {
      if (returnValue.length === 0 || currentInput !== inputValue) {
        const query = `
        query GetCategories {
          autocompleteGMBCategories(autocomplete: "${inputValue || ''}") {
            id
            name
          }
        }`;

        const response = await axios.post(
          process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
          { query },
          { headers: { Authorization: jwtToken } },
        );
        const data = response.data.data.autocompleteGMBCategories;
        loadedCategories = data.length > 0 ? data : defaultCategories;
        returnValue = data.length > 0 ? data : defaultCategories;
        setCurrentInput(inputValue);
        setCategoryList(returnValue);
      }
    }
    return returnValue
      .slice(0, 20)
      .map(transformToOption);
  }, [categoryList, currentInput, jwtToken]);

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
        placeholder={placeholder}
        loadOptions={loadCategories}
        onChange={handleChange}
        value={null}
        isDisabled={maxItems && maxItems === formData.length}
        ref={selectRef}
        required={required}
      />
      <ValidationController requiredRef={selectRef} isBlocked={isBlocked} />
      <p>

        {formData && (
          R.is(Array, formData) ? formData?.map((category) => (
            <Tag
              key={category.id}
              onRemove={() => removeCategory({ id: category.id })}
            >
              {category.name}
            </Tag>
          )) : (
            <Tag
              key={formData.id}
              onRemove={() => removeCategory({ id: formData.id })}
            >
              {formData.name}
            </Tag>
          )
        )}
      </p>
    </div>
  );
};

CategoryGoogle.defaultProps = {
  formData: [],
  maxItems: 0,
  minItems: 99,
  title: '',
  description: '',
  placeholder: 'Select...',
  required: false,
};

CategoryGoogle.propTypes = {
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
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default CategoryGoogle;
