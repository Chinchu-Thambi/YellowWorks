import axios from 'axios';
import * as R from 'ramda';

const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;

const listClassifications = async ({ autocomplete, book }) => {
  const query = `
  query autocompletePrintCategories($autocomplete: String!, $book: String!) {
    autocompletePrintCategories(autocomplete: $autocomplete, book: $book) {
      id
      name
    }
  }
  `;
  const variables = { autocomplete, book: R.toLower(book) };

  const response = await axios.post(
    process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
    { query, variables },
    { headers: { 'x-api-key': apiKey } },
  );
  return response?.data?.data?.autocompletePrintCategories;
};

export default listClassifications;
