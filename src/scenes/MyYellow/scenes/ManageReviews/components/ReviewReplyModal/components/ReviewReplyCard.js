import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Box } from 'rebass/styled-components';

import TextArea from '../../../../../../../components/formElements/TextArea';
import Button from '../../../../../../../components/Button';
import { theme } from '../../../../../../../util';

import ReviewContext from '../../../services/ReviewContext';

import SingleReview from '../../SingleReview';
import { ReviewType } from '../../ReviewRatings.proptypes';

const REPLY_MAX_CHARS = 2000;
const REPLY_MIN_CHARS = 8;

const ReviewReplyCard = ({ review, onDismiss }) => {
  const reviewStore = React.useContext(ReviewContext) || {};
  const [reply, setReply] = React.useState(null);
  const canSubmit = reply && reply.length >= REPLY_MIN_CHARS && reply.length <= REPLY_MAX_CHARS;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    const { errors } = await reviewStore.respondReview({
      reviewId: review.id, responseText: reply,
    });

    if (Array.isArray(errors)) {
      return;
    }

    onDismiss();
  };

  return (
    <Flex flexDirection="column">
      <SingleReview user={review.user} text={review.text} rating={review.rating} date={review.created} />
      <Box
        as="form"
        onSubmit={handleSubmit}
        mt={3}
        sx={{ borderRadius: 2 }}
      >
        <TextArea
          id="review-reply"
          name="Reply"
          aria-label="Reply to this review"
          sx={{
            border: `1px solid ${theme.palette.contrast[4]}`,
            borderRadius: 1,
            width: '100%',
            // to prevent browser for allowing text area to be resized
            maxWidth: '100%',
            // to prevent browser for allowing text area to be resized
            minWidth: '100%',
            height: '10vh',
            minHeight: '5vh',
          }}
          color={theme.palette.contrast[2]}
          placeholder="Reply to this review"
          fontSize={1}
          value={reply || ''}
          onChange={(e) => setReply(e.target.value)}
        />
        <Flex mt={2} justifyContent="flex-end" alignItems="center">
          <Flex sx={{ gridGap: 1 }} alignItems="center">
            {reply && reply.length >= REPLY_MIN_CHARS && (
              <Text
                mr={1}
                fontSize={0}
                color={reply.length <= REPLY_MAX_CHARS ? theme.palette.contrast[4] : theme.palette.accent[0][2]}
              >
                {reply.length}/2000
              </Text>
            )}
            {reply && reply.trim().length < REPLY_MIN_CHARS && (
              <Text mr={1} fontSize="0" color={theme.palette.accent[0][2]}>
                Minimum {REPLY_MIN_CHARS} letters.
              </Text>
            )}
            <Button size="sm" variant="secondary" onClick={onDismiss}>
              <Text fontSize={1}>Cancel</Text>
            </Button>
            <Button
              size="sm"
              variant="primary"
              disabled={!canSubmit}
            >
              <Text fontSize={1}>Submit</Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

ReviewReplyCard.defaultProps = {
  onDismiss: () => {},
};

ReviewReplyCard.propTypes = {
  review: ReviewType.isRequired,
  onDismiss: PropTypes.func,
};

export default ReviewReplyCard;
