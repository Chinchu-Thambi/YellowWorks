/* globals window */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from 'rebass/styled-components';

import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';

import Notice from '../../components/Notice';

import WelcomeModal from '../WelcomeModal';

import RatingsReviewsTopBanner from './components/RatingsReviewsTopBanner';
import ReviewsList from './components/ReviewsList';
import { ReviewType } from './components/ReviewRatings.proptypes';

import ReviewRelease from './scenes/ReviewRelease';

import useReviews from './services/useReviews';
import ReviewContext from './services/ReviewContext';

const ManageReviewsScene = ({
  subscriptionId,
}) => {
  const reviewStore = useReviews({ subscriptionId });
  const {
    isLoading,
    reviews,
    hasNextPage: hasNextReviewPage,
    reviewStats,
    loadNextReviewPage,
  } = reviewStore;

  const scrollTopClickHandler = () => { window.scrollTo(0, 0); };

  return (
    <ReviewContext.Provider value={reviewStore}>
      <Flex flexDirection="column">
        <ManageReviews
          reviews={reviews}
          reviewsCount={reviewStats?.totalCount}
          averageRating={reviewStats?.avgRating}
        />

        <Flex justifyContent="center" alignItems="center" mt={3}>
          {isLoading ? (
            <Box mr={2}>
              <Spinner />
            </Box>
          ) : (
            <>
              {reviews?.length > 0 && hasNextReviewPage && (
                <Box mr={2}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={loadNextReviewPage}
                  >
                    View More
                  </Button>
                </Box>
              )}
              {reviews?.length > 5 && (
                <Button
                  type="button"
                  variant="tertiary"
                  size="sm"
                  onClick={scrollTopClickHandler}
                >
                  Back to the top
                </Button>
              )}
            </>
          )}
        </Flex>

        {!isLoading && reviews?.length === 0 && (
          <Notice message="There are no reviews for this profile yet." />
        )}
      </Flex>
      <WelcomeModal context="ManageReviews">
        <ReviewRelease />
      </WelcomeModal>
    </ReviewContext.Provider>
  );
};

ManageReviewsScene.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
};

export const ManageReviews = ({ reviews, reviewsCount, averageRating }) => (
  <Flex flexDirection="column" sx={{ gridGap: 2 }}>
    <RatingsReviewsTopBanner averageRating={averageRating} reviewsCount={reviewsCount} />
    {reviews && <ReviewsList reviews={reviews} />}
  </Flex>
);

ManageReviews.propTypes = {
  reviews: PropTypes.arrayOf(ReviewType).isRequired,
  reviewsCount: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
};

export default ManageReviewsScene;
