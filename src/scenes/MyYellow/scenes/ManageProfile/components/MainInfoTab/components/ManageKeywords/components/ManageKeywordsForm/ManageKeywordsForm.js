import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import * as R from 'ramda';
import { Box } from 'rebass';

import Tag from '../../../../../../../../../../components/Tag';
import Spinner from '../../../../../../../../../../components/Spinner';
import { shuffle } from '../../../../../../../../../../util';

import useKeywords from '../../services/useKeywords';
import getKeywordsFromCategories from '../../services/getKeywordsFromCategories';
import selectRelativeStyles from '../../services/selectRelativeStyles';

const transformToOption = (k) => ({
  label: `${k.property}: ${k.keyword}`, keyword: k,
});

const ManageKeywordsForm = ({
  value, onChange,
}) => {
  const categoryIds = value.map(R.prop('id'));
  const keywordsFromCategories = getKeywordsFromCategories(value);

  const [loadKeywords, { keywords, loading }] = useKeywords({ categoryIds });
  const [selectedKeywords, setSelectedKeywords] = React.useState(keywordsFromCategories);
  const [lastKeywordAdded, setLastKeywordAdded] = React.useState(null);

  const orderedKeywords = R.sortWith([
    R.ascend(R.prop('property')),
    R.ascend(R.prop('keyword')),
  ])(selectedKeywords);

  const loadOptions = async (inputValue) => {
    let selector;
    if (inputValue === '') {
      selector = R.compose(
        R.uniqBy(R.prop('property')),
        shuffle,
      );
    } else {
      selector = R.filter(({ keyword, property }) => (
        keyword.toLowerCase().startsWith(inputValue.toLowerCase())
          || property.toLowerCase().startsWith(inputValue.toLowerCase())
      ));
    }

    return R.compose(
      R.map(transformToOption),
      R.slice(0, 50),
      selector,
    )(keywords);
  };

  const handleChange = ({ keyword }) => {
    const updatedKeywords = R.compose(
      R.uniqBy(({ property: p, keyword: k }) => `${p}: ${k}`),
      R.append(keyword),
    )(selectedKeywords);

    setSelectedKeywords(updatedKeywords);
    setLastKeywordAdded(keyword);
  };

  const removeKeyword = ({ property, keyword }) => {
    const updatedKeywords = R.reject(
      R.allPass([
        R.propEq('property', property),
        R.propEq('keyword', keyword),
      ]),
    )(selectedKeywords);

    setSelectedKeywords(updatedKeywords);
    setLastKeywordAdded(null);
  };

  // load keywords on mount
  React.useEffect(() => {
    loadKeywords();
  }, [loadKeywords]);

  // pushes changes to parent
  React.useEffect(() => {
    const categoriesWithKeywords = R.map(
      (cat) => R.assoc(
        'keywords',
        R.compose(
          R.map(R.dissoc('categoryId')),
          R.filter(R.propEq('categoryId', cat.id)),
        )(selectedKeywords),
      )(cat),
    )(value);

    onChange(categoriesWithKeywords);
  }, [value, onChange, selectedKeywords]);

  // remove last added keyword so that the highlight effect lasts only for 400ms
  React.useEffect(() => {
    if (!setLastKeywordAdded) {
      return () => {};
    }

    const timeout = setTimeout(() => {
      setLastKeywordAdded(null);
    }, 400);

    return () => { clearTimeout(timeout); };
  }, [lastKeywordAdded]);

  return (
    <>
      <p id="keywords-label">Select the Products & Services associated with your business:</p>
      {loading ? (
        <Spinner size={16} />
      ) : (
        <Box textAlign="left">
          <Select
            aria-labelledby="keywords-label"
            defaultOptions
            cacheOptions={false}
            loadOptions={loadOptions}
            onChange={handleChange}
            value={null}
            styles={selectRelativeStyles}
          />
        </Box>
      )}

      {orderedKeywords.length > 0 && (
        <Box mt={4}>
          {orderedKeywords.map(({ property, keyword }) => (
            <Tag
              key={`${property}-${keyword}`}
              highlight={lastKeywordAdded && R.whereEq({
                property, keyword,
              })(lastKeywordAdded)}
              onRemove={() => removeKeyword({ property, keyword })}
            >
              {property}: {keyword}
            </Tag>
          ))}
        </Box>
      )}
    </>
  );
};

ManageKeywordsForm.defaultProps = {
  value: [],
  onChange: () => {},
};

ManageKeywordsForm.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      keywords: PropTypes.arrayOf(
        PropTypes.shape({
          keyword: PropTypes.string,
        }),
      ),
    }),
  ),
  onChange: PropTypes.func,
};

export default ManageKeywordsForm;
