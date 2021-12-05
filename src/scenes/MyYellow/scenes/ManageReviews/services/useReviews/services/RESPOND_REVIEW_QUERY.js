const RESPOND_REVIEW_QUERY = `
mutation respondReview($reviewId: ID!, $responseText: String!, $customerId: ID!) {
  respondReview(input: {reviewId: $reviewId, responseText: $responseText}, customerId: $customerId) {
    id
  }
}
`;

export default RESPOND_REVIEW_QUERY;
