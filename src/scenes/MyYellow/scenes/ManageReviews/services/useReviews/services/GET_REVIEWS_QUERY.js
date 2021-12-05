const GET_REVIEWS_QUERY = `
query reviews($customerId: ID!, $subscriptionId: ID!, $first: Int!, $after: String) {
  reviews(customerId: $customerId, subscriptionId: $subscriptionId, first: $first, after: $after){
    edges {
      node {
        id
        rating
        created
        text
        status
        user {
            id
            displayName
            avatar
        }
        response {
            id
            created
            text
            status
        }
        images {
            id
            image
            icon_image
            phone_image
            thumbnail_image
            caption
            created
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  reviewStats(customerId:$customerId, subscriptionId:$subscriptionId) {
    avgRating
    totalCount
  }
}
`;

export default GET_REVIEWS_QUERY;
