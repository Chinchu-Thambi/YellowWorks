import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Flex } from 'rebass/styled-components';
import theme from '../../../../../../util/theme';

import Star, { StarType } from './components/Star';

const StarRating = ({ stars, color, size }) => {
  const fullStars = Math.floor(Math.min(stars, 5));
  const halfStars = Math.ceil(stars % 1);
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <Flex sx={{ gridGap: 1 }}>
      {R.range(0, fullStars).map((i) => (
        <Star key={i} type={StarType.FULL} color={color} size={size} />
      ))}
      {R.range(0, halfStars).map((i) => (
        <Star key={i} type={StarType.HALF} color={color} size={size} />
      ))}
      {R.range(0, emptyStars).map((i) => (
        <Star key={i} type={StarType.EMPTY} color={color} size={size} />
      ))}
    </Flex>
  );
};

StarRating.propTypes = {
  stars: PropTypes.oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'lg', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
};

StarRating.defaultProps = {
  color: theme.palette.contrast[0],
  size: '1x',
};

export default StarRating;
