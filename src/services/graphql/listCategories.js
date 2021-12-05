import axios from 'axios';
import * as R from 'ramda';

const listCategories = async ({ autocomplete, jwtToken }) => {
  const query = `
  query listCategories($autocomplete: String!) {
    listCategories(autocomplete: $autocomplete) {
      id
      name
    }
  }
  `;
  const variables = { autocomplete };

  const response = await axios.post(
    process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
    { query, variables },
    { headers: { Authorization: jwtToken } },
  );

  const parsedIds = R.map(R.over(
    R.lensProp('id'),
    parseInt,
  ))(response?.data?.data?.listCategories ?? []);
  return parsedIds;
};

export default listCategories;
