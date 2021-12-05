import React from 'react';
import PropTypes from 'prop-types';

import CheckCircle from '../../../../../../../../components/CheckCircle';
import { Input } from '../../../../../../../../components/FormElements';

const HonorificSelector = (props) => {
  const {
    options, currentValue, onChange, name,
  } = props;

  const handleChange = (e) => {
    if (e.target) {
      const { value } = e.target;
      onChange(name, value);
      return;
    }
    onChange(name, e);
  };

  const checkCustomValue = (value) => options.includes(value);

  return (
    <div>
      <CheckCircle label="None" checked={!currentValue} onChange={handleChange} value="" />
      {options.map((option) => (
        <CheckCircle
          label={option}
          key={option}
          checked={currentValue === option}
          onChange={handleChange}
          value={option}
        />
      ))}
      <Input
        label="Other"
        placeholder="Other"
        type="text"
        name={name}
        id={name}
        data-testid="customInput"
        value={(!currentValue || checkCustomValue(currentValue)) ? '' : currentValue}
        onChange={handleChange}
        minLength={1}
        autoComplete="no"
        autoCorrect="off"
      />
    </div>
  );
};

HonorificSelector.defaultProps = {
  options: ['Dr', 'Hon.', 'Prof.'],
  currentValue: null,
  onChange: () => { },
};
HonorificSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string,
  ),
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default HonorificSelector;
