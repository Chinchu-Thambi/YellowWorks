import axios from 'axios';
import * as R from 'ramda';

const endpoint = process.env.GATSBY_PRODUCT_API_ENDPOINT ?? process.env.STORYBOOK_PRODUCT_API_ENDPOINT;

const query = `
mutation CreateAsset(
  $caption: String!,
  $contentUrl: AWSURL!,
  $businessId: ID!,
  $customerId: ID
) {
  createAsset(
    businessId: $businessId, 
    customerId: $customerId, 
    input: {
      caption: $caption,
      contentUrl: $contentUrl,
      type: ImageObject
    }
  ) {
    caption
    contentUrl
    encodingFormat
    height
    thumbnailUrl
    type
    width
  }
}
`;

/** @type {(
 * jwtToken: string, customerId: string, businessId: string
 * ) => (
 * files: {url: string}[]
 * ) => ({
 *  caption: string
 *  contentUrl: string
 *  encodingFormat: string
 *  height: string
 *  thumbnailUrl: string
 *  type: string
 *  width: string
 * }[])} */
const createAssets = (jwtToken, customerId, businessId) => (files) => {
  const variables = {
    businessId,
    customerId,
  };

  const axiosPost = (file) => axios.post(
    endpoint,
    {
      query,
      variables: {
        ...variables,
        contentUrl: file.url,
        caption: file.file.name,
      },
    },
    {
      headers: {
        Authorization: jwtToken,
      },
    },
  );

  return Promise.all(
    R.map(axiosPost)(files),
  ).then(
    R.map(R.path(['data', 'data', 'createAsset'])),
  );
};

export default createAssets;
