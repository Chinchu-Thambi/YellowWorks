import React from 'react';
import { Flex } from 'rebass/styled-components';

import theme from '../../../../../../util/theme';

import { ReviewType } from '../ReviewRatings.proptypes';

import Reply from './components/Reply';
import Review from './components/Review';

const ReviewAndReply = ({ review }) => {
  const hasReply = Boolean(review.response?.id);

  return (
    <Flex
      flexDirection="column"
      sx={{
        border: `1px solid ${theme.palette.contrast[4]}`,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Review review={review} hasReply={hasReply} />
      {hasReply && <Reply reply={review.response} />}
    </Flex>
  );
};

ReviewAndReply.propTypes = {
  review: ReviewType.isRequired,
};

export default ReviewAndReply;
