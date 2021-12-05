import React from 'react';
import PropTypes from 'prop-types';

import {
  SwitchContainer, SwitchGroup, SwitchHandle, SwitchInput, SwitchOption,
} from './Switch.styled';

/**
 * This component adds a (ON/OFF) Switch toggle button
 * @options Array of 2 options, must have max 3 chars for each options
 * @defaultValue it is the value for the checkbox
 *
 * Example:
 * <Switch options={['yes', 'no']} label="location" name="location" checked disabled />
 */
const Switch = (props) => {
  const {
    name, checked, required, disabled, label, defaultValue, options, onToggle, ...rest
  } = props;

  const isChecked = checked;

  const handleToggle = () => {
    if (!disabled) {
      onToggle(!isChecked);
    }
  };

  // Smart label
  const smartLabel = label || (name ?? defaultValue);

  // Check for disabled option
  const containerStyles = {
    opacity: disabled ? 0.5 : null,
    cursor: disabled ? 'not-allowed' : null,
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SwitchContainer style={containerStyles} {...rest}>
      <SwitchGroup
        onMouseDown={handleToggle}
      >
        <SwitchOption data-testid="SwitchOpt1" style={{ opacity: isChecked ? 1 : 0 }}>{options[0]}</SwitchOption>
        <SwitchOption data-testid="SwitchOpt2" style={{ opacity: !isChecked ? 1 : 0 }}>{options[1]}</SwitchOption>

        <SwitchInput
          type="checkbox"
          name={name ?? defaultValue}
          value={defaultValue ?? name}
          required={required}
          disabled={disabled}
          aria-checked={isChecked}
          aria-label={smartLabel}
          data-testid="SwitchInput"
          role="switch"
          checked={isChecked}
          readOnly
        />

        <SwitchHandle
          style={{ cursor: disabled ? 'not-allowed' : null }}
          tabIndex={0}
          aria-label={`${smartLabel}, ${isChecked ? options[0] : options[1]}`}
          aria-live="polite"
          data-testid="SwitchHandle"
          onKeyPress={handleToggle}
        />
      </SwitchGroup>
    </SwitchContainer>
  );
};

export default Switch;

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
    ]),
  ),
  onToggle: PropTypes.func,
};

Switch.defaultProps = {
  checked: false,
  required: false,
  disabled: false,
  options: ['ON', 'OFF'],
  onToggle: () => {},
};
