import React from 'react';
import PropTypes from 'prop-types';

const RoundButton = ({
  className, label, ...rest
}) => (
  <button
    type="button"
    className={`
      flex items-center justify-center
      w-4 h-4 overflow-hidden rounded-full
      bg-contrast-100
      ${className}
    `}
    aria-label={label}
    {...rest}
  />
);

RoundButton.defaultProps = {
  className: '',
  label: '',
};

RoundButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

export default RoundButton;
