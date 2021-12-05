import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import ReviewAndReply from '../ReviewAndReply';
import { ReviewType } from '../ReviewRatings.proptypes';

const ReviewsList = ({ reviews }) => (
  <Flex flexDirection="column" sx={{ gridGap: 2 }}>
    {reviews?.map((rev) => (
      <ReviewAndReply key={rev.id} review={rev} reply={rev.response} />
    ))}
  </Flex>
);

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewType).isRequired,
};

export default ReviewsList;
