import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from 'rebass/styled-components';

import theme from '../../../../../../util/theme';

import StarRating from '../StarRating';

const RatingsReviewsTopBanner = ({ averageRating, reviewsCount }) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    backgroundColor={theme.palette.contrast[5]}
    px={[1, 3]}
    py={[3, 4]}
    flexDirection={['column', 'row']}
    sx={{ borderRadius: theme.radii[3] }}
  >
    <Text fontSize={[3, 4]} mb={[3, 0]} as="h2">
      Ratings & Reviews
    </Text>
    {averageRating && (
      <Flex flexDirection="column" alignItems={['center', 'flex-end']}>
        <Text fontSize={[1, 1]}>Overall rating</Text>
        <Flex alignItems={['center', 'baseline']} justifyContent="flex-end" flexDirection={['column', 'row']}>
          <Text mx={3} my={[1, 0]} fontSize={5}>
            {averageRating.toFixed(1)}
          </Text>
          <Box display={['block', 'none']}>
            <StarRating stars={averageRating} size="1x" />
          </Box>
          <Box display={['none', 'block']}>
            <StarRating stars={averageRating} size="2x" />
          </Box>
        </Flex>
        <Text mt={[2, 0]} fontSize={[1, 1]}>
          Based on {reviewsCount} reviews
        </Text>
      </Flex>
    )}
  </Flex>
);

RatingsReviewsTopBanner.propTypes = {
  averageRating: PropTypes.number,
  reviewsCount: PropTypes.number,
};

RatingsReviewsTopBanner.defaultProps = {
  averageRating: undefined,
  reviewsCount: undefined,
};

export default RatingsReviewsTopBanner;
