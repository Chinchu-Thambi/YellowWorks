import React from 'react';
import PropTypes from 'prop-types';

import chevronDown from '../../../../../assets/chevron-down.svg';

import RoundButton from './RoundButton';

const ChevronButton = ({
  label, expanded, ...rest
}) => (
  <RoundButton
    label={label}
    // because RoundButton is DOM equivalent to button
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  ><img
    className={`
      w-2
      transform transition-transform duration-200
      ${expanded ? '' : 'rotate-90'}
    `}
    src={chevronDown}
    alt={label}
  />
  </RoundButton>
);

ChevronButton.defaultProps = {
  className: '',
  label: '',
  expanded: false,
};

ChevronButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  expanded: PropTypes.bool,
};

export default ChevronButton;
