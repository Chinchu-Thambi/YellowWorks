import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

import CheckWrapper from './CheckCircle.styled';

import checkedIcon from '../../assets/icons/light/checked-circle.svg';
import uncheckedIcon from '../../assets/icons/light/unchecked-circle.svg';

/**
 * This component adds a custom CheckCircle element with accompanying label
 * @label The label associated with the CheckCircle
 * @checked is the current checked value of the CheckCircle
 *
 * Example:
 * <CheckCircle label="Miss" value="Miss" checked={checked} />
 */

const CheckCircle = (props) => {
  const {
    label, value, checked, onChange,
  } = props;

  return (
    <CheckWrapper>
      <Flex
        alignItems="center"
        role="listbox"
        tabIndex="0"
        onClick={() => onChange(value)}
      >
        <img src={checked ? checkedIcon : uncheckedIcon} alt={checked ? 'checked' : 'unchecked'} />
        <span>{label}</span>
      </Flex>
    </CheckWrapper>
  );
};

CheckCircle.defaultProps = {
  label: '',
  value: '',
  checked: false,
};

CheckCircle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
export default CheckCircle;
