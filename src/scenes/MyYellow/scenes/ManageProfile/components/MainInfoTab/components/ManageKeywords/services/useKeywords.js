import React from 'react';
import * as R from 'ramda';
import axios from 'axios';

import AuthContext from '../../../../../../../../../components/Auth/AuthContext';

let loadedKeywords = {};

const useKeywords = ({ categoryIds }) => {
  const { jwtToken } = React.useContext(AuthContext) || {};
  const [loading, setLoading] = React.useState(false);
  const [called, setCalled] = React.useState(false);
  const [keywords, setKeywords] = React.useState(loadedKeywords);

  const missingCategories = R.difference(categoryIds.map(R.toString), Object.keys(keywords));
  const filteredKeywords = R.compose(
    R.flatten, // in an array form
    R.into([], R.pipe( // this is a transducer so pipe reads as compose
      R.map(R.path([1])), // and returning just the value
      R.filter(
        R.compose( // filtering for keys in categoryIds
          R.flip(R.includes)(categoryIds),
          R.path([0]),
        ),
      ),
      R.map(
        R.over(
          R.lensIndex(0),
          R.flip(parseInt)(10), // keys are originally strings so we need them to be int for comparison with ids
        ),
      ),
    )),
    Object.entries, // puts keys and values in an iterable
  )(keywords);

  const callHandler = React.useCallback((force = true) => { setCalled(force); }, []);

  React.useEffect(() => {
    if (
      missingCategories.length === 0
      || loading
      || !called
      || !jwtToken
    ) { return; }

    const loadKeywords = async () => {
      const missingCategoriesQuery = missingCategories
        .map((categoryId) => `category${categoryId}: getCategoryById(id:${categoryId})`)
        .join('\n');

      const query = `
        query getKeywords {
          ${missingCategoriesQuery}
        }
      `;

      setLoading(true);
      const { data } = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query },
        { headers: { Authorization: jwtToken } },
      );

      const transformedKeywords = R.compose(
        R.into({}, R.pipe( // by the might of transducing
          R.map(([key, value]) => {
            const categoryKey = R.compose(
              R.flip(parseInt)(10),
              R.replace('category', ''),
            )(key);
            return [
              categoryKey,
              R.compose(
                R.map(R.assoc('categoryId', categoryKey)),
                R.path(['properties', 'keywords', 'items', 'enum']),
                JSON.parse,
              )(value),
            ];
          }),
        )),
        Object.entries,
        R.prop('data'),
      )(data);

      loadedKeywords = {
        ...loadedKeywords,
        ...transformedKeywords,
      };

      setKeywords(loadedKeywords);
      setLoading(false);
    };

    loadKeywords();
  }, [called, jwtToken, loading, missingCategories]);

  return [
    callHandler,
    {
      called,
      loading,
      keywords: filteredKeywords,
    }];
};

export default useKeywords;
