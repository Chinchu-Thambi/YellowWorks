import React from 'react';
import axios from 'axios';
import * as R from 'ramda';

import AuthContext from '../../../../../../components/Auth/AuthContext';

import RESPOND_REVIEW_QUERY from './services/RESPOND_REVIEW_QUERY';
import GET_REVIEWS_QUERY from './services/GET_REVIEWS_QUERY';

const NUM_REVIEWS_PER_QUERY = 5;

const useReviews = ({ subscriptionId }) => {
  const { customerId, jwtToken } = React.useContext(AuthContext) || {};

  const [reviews, setReviews] = React.useState(null);
  const [pageInfo, setPageInfo] = React.useState(null);
  const [shouldLoadNextPage, setShouldLoadNextPage] = React.useState(true);
  const [reviewStats, setReviewStats] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const hasNextPage = pageInfo?.hasNextPage;
  const nextCursor = pageInfo?.endCursor;

  const loadNextReviewPage = () => {
    setShouldLoadNextPage(true);
  };

  const respondReview = async ({
    reviewId, responseText,
  }) => {
    const variables = {
      reviewId,
      responseText,
      customerId,
    };

    try {
      const { data, errors } = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query: RESPOND_REVIEW_QUERY, variables },
        { headers: { Authorization: jwtToken } },
      );

      const businessResponse = {
        id: data?.data?.respondReview?.id,
        text: responseText,
        status: 'MOD',
      };

      const reviewsWithResponse = R.set(
        R.lensPath([
          R.findIndex(R.propEq('id', reviewId))(reviews),
          'response',
        ]),
        businessResponse,
      )(reviews);

      // update local state
      setReviews(reviewsWithResponse);

      return { data, errors };
    } catch (e) {
      return { errors: [e] };
    }
  };

  React.useEffect(() => {
    if (!customerId || !subscriptionId || !jwtToken) {
      return;
    }

    if (isLoading) {
      return;
    }

    if (!shouldLoadNextPage) {
      return;
    }

    const constructQueryAndFetchData = async () => {
      const variables = {
        customerId,
        subscriptionId,
        first: NUM_REVIEWS_PER_QUERY,
      };

      if (nextCursor) {
        variables.after = nextCursor;
      }

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query: GET_REVIEWS_QUERY, variables },
        { headers: { Authorization: jwtToken } },
      );

      setIsLoading(false);
      const reviewsData = response?.data?.data?.reviews?.edges
        ?.map((reviewEdge) => reviewEdge.node);

      setPageInfo(response?.data?.data?.reviews?.pageInfo);
      setReviewStats(response?.data?.data?.reviewStats);
      setReviews([...(reviews ?? []), ...reviewsData]);
    };

    setIsLoading(true);
    setShouldLoadNextPage(false);
    constructQueryAndFetchData();
  }, [customerId, isLoading, jwtToken, nextCursor, reviews, shouldLoadNextPage, subscriptionId]);

  return {
    isLoading,
    reviews,
    reviewStats,
    hasNextPage,
    respondReview,
    loadNextReviewPage,
  };
};

export default useReviews;
