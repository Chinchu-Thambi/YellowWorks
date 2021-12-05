import React from 'react';
import PropTypes from 'prop-types';
import { faStar as fullStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import theme from '../../../../../../../../util/theme';

export const StarType = {
  FULL: 'FULL',
  HALF: 'HALF',
  EMPTY: 'EMPTY',
};

const typeToIcon = (type) => {
  switch (type) {
    case StarType.FULL:
      return fullStar;
    case StarType.HALF:
      return halfStar;
    case StarType.EMPTY:
      return emptyStar;
    default:
      return null;
  }
};

const Star = ({ type, color, size }) => <FontAwesomeIcon size={size} color={color} icon={typeToIcon(type)} />;

Star.propTypes = {
  type: PropTypes.oneOf([StarType.FULL, StarType.HALF, StarType.EMPTY]).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'lg', 'sm', '1x', '2x', '3x', '4x', '5x']),
};

Star.defaultProps = {
  color: theme.palette.contrast[0],
  size: '1x',
};

export default Star;
