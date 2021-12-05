import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from 'rebass/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../../../../../components/Button';

import SingleReview from '../../../SingleReview';
import ReviewReplyModal from '../../../ReviewReplyModal';
import { ReviewType } from '../../../ReviewRatings.proptypes';

const Review = ({ review, hasReply }) => {
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  return (
    <>
      <Flex
        justifyContent="space-between"
        sx={{
          position: 'relative',
        }}
      >
        <Flex flex={1} p={[3, 4]} flexDirection="column">
          <SingleReview
            user={review.user}
            text={review.text}
            rating={review.rating}
            date={review.created}
            images={review.images}
          />
          {!hasReply && (
            <Flex mt={3}>
              <Button size="sm" variant="primary" onClick={() => setIsBeingEdited(true)}>
                <Box mr={2}>
                  <FontAwesomeIcon icon={faReply} />
                </Box>
                Reply
              </Button>
            </Flex>
          )}
        </Flex>
        {/* // TODO enable once pin review and/or report review is enabled */}
        {/* <Link
          p={3}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link> */}
      </Flex>

      {/* edit modal */}
      {isBeingEdited && (
        <ReviewReplyModal
          review={review}
          onDismiss={() => { setIsBeingEdited(false); }}
        />
      )}
    </>
  );
};

Review.propTypes = {
  review: ReviewType.isRequired,
  hasReply: PropTypes.bool,
};

Review.defaultProps = {
  hasReply: false,
};

export default Review;
