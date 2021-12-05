import React from 'react';
import PropTypes from 'prop-types';
import { ToggleWrapper } from './ToggleButton.styled';

const ToggleButton = ((props) => {
  const {
    options,
    active,
    onClick,
    disabled,
  } = props;

  const handleClick = (value) => {
    onClick(value);
  };

  return (
    <ToggleWrapper>
      {options.map((option) => (
        <button
          type="button"
          id={option.value}
          className={active === option.value ? 'active' : ''}
          onClick={() => handleClick(option.value)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </ToggleWrapper>
  );
});

ToggleButton.propTypes = {
  active: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ToggleButton.defaultProps = {
  options: [],
  disabled: false,
};

export default ToggleButton;
