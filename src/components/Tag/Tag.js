import React from 'react';
import PropTypes from 'prop-types';

import { BaseTag, RemoveTagButton } from './Styled';

/**
 * @readonly (optional) when present it doesn't renders the remove button.
 * @onRemove (required when readonly is false)
 */
const Tag = (props) => {
  const {
    children,
    readonly,
    onRemove,
    ...rest
  } = props;

  let removeButton = null;

  if (!readonly) {
    removeButton = (
      <RemoveTagButton
        type="button"
        title="Remove"
        aria-label="Remove"
        onClick={onRemove}
      >
        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="11" fill="#D2D4DA" />
          {/* eslint-disable-next-line max-len */}
          <path d="M11 6.90625V15.0927" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          {/* eslint-disable-next-line max-len */}
          <path d="M7.11719 11L15.3032 11" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </RemoveTagButton>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseTag {...rest}>
      {children}
      {removeButton}
    </BaseTag>
  );
};

export default Tag;

Tag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  readonly: PropTypes.bool,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  readonly: false,
  children: [],
  onRemove: () => {},
};
