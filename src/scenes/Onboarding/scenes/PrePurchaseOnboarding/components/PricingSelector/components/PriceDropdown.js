import React from 'react';
import Select from 'react-select/async';
import PropTypes from 'prop-types';

import { theme } from '../../../../../../../util';

const selectStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 999,
    'background-color': `${theme.palette.base[0]}`,
    color: `${theme.palette.contrast[0]}`,
  }),
  placeholder: (provided) => ({
    ...provided,
    right: '5%',
    color: `${theme.palette.contrast[0]}`,
    'font-size': `${theme.fontSizes[5]}`,
    'font-weight': `${theme.fontWeight[1]}`,
  }),
  singleValue: (provided) => ({
    ...provided,
    right: '5%',
    'font-size': `${theme.fontSizes[5]}`,
    'font-weight': `${theme.fontWeight[1]}`,
  }),
  valueContainer: (provided) => ({
    ...provided,
    'min-width': '200px',
    'text-align': 'left',
    padding: `${theme.space[3]}`,
  }),
};

const PriceDropdown = ({ chosenPrice, filteredPriceOptions, handleChangePrice }) => (
  <Select
    id="price"
    placeholder={`$${chosenPrice / 100}`}
    defaultOptions={filteredPriceOptions}
    onChange={(e) => handleChangePrice(e.value)}
    value={chosenPrice}
    styles={selectStyles}
    isSearchable={false}
  />
);

PriceDropdown.propTypes = {
  chosenPrice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  filteredPriceOptions: PropTypes.arrayOf.isRequired,
  handleChangePrice: PropTypes.func.isRequired,
};

export default PriceDropdown;
