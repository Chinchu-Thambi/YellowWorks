import * as R from 'ramda';

const getKeywordsFromCategories = R.compose(
  R.flatten,
  R.map(({ id, keywords = [] }) => R.map(
    R.assoc('categoryId', id),
  )(keywords)),
);

export default getKeywordsFromCategories;
