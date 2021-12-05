import React from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select/async';

import ValidationController from '../../../../../components/ValidationController';
import listClassifications from '../../../../../services/graphql/listClassifications';

const transformToOption = ({ name, id }) => ({
  value: id,
  label: name,
});

const Classifications = (props) => {
  const selectRef = React.useRef(null);
  const {
    formData,
    onChange,
    title,
    description,
    path,
  } = props;
  const isBlocked = !formData.classification;
  const handleChange = ({ value: id, label }) => {
    const selectedCategory = {
      id,
      name: label,
    };

    onChange({ ...formData, classification: selectedCategory });
  };

  const loadClassifications = async (inputValue) => {
    const categoryList = await listClassifications({
      autocomplete: inputValue || 'a',
      book: formData.product.printProductCode,
    });

    return categoryList
      .slice(0, 20)
      .map(transformToOption);
  };
  return (
    <>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <Select
        id={path}
        defaultOptions
        aria-label="Yellow Pages main category select"
        placeholder="Search for your category..."
        loadOptions={loadClassifications}
        onChange={(e) => handleChange(e)}
        value={formData?.classification && transformToOption(formData?.classification)}
        isMulti={false}
        ref={selectRef}
      />
      <ValidationController requiredRef={selectRef} isBlocked={isBlocked} />
    </>
  );
};

Classifications.defaultProps = {
  formData: {},
  title: '',
  path: undefined,
  description: '',
};

Classifications.propTypes = {
  formData: PropTypes.shape({
    product: PropTypes.shape({
      printProductCode: PropTypes.string,
      name: PropTypes.string,
    }),
    classification: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  path: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Classifications;
