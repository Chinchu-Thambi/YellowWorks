import axios from 'axios';
import * as R from 'ramda';

const endpoint = process.env.GATSBY_PRODUCT_API_ENDPOINT ?? process.env.STORYBOOK_PRODUCT_API_ENDPOINT;

const alphaNumeric = R.replace(/[^a-z0-9]/gi, '');

const createPresignedValuesGraphqlMutation = (customerId) => R.compose(
  R.join('\n'),
  R.prepend('mutation {'),
  R.append('}'),
  R.map((file) => `
      CreatePresignedPost_${alphaNumeric(file.name)}: createPresignedPost(
        input: {filename: "${file.name}"},
        customerId: "${customerId}"
      ) {
        id
        path
        presignedPost {
          fields
          url
        }
        url
      }
    `),
);

const normalizePresignedValues = (files, data) => {
  const values = Object.values(data);

  return R.compose(
    R.fromPairs,
    R.map((file) => [
      file.name,
      {
        file,
        ...R.find(
          R.propSatisfies(R.endsWith(file.name), 'path'),
        )(values),
      },
    ]),
  )(files);
};

const getPresignedPost = (jwtToken, customerId) => async (files) => {
  const query = createPresignedValuesGraphqlMutation(customerId)(files);

  const response = await axios.post(
    endpoint,
    { query },
    {
      headers: {
        Authorization: jwtToken,
      },
    },
  );

  return normalizePresignedValues(files, response.data.data);
};

export default getPresignedPost;
