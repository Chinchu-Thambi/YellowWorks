import * as R from 'ramda';

const parseConfiguration = (productObject) => {
  if (productObject) {
    return R.over(
      R.lensProp('configuration'),
      R.tryCatch(JSON.parse, () => null),
    )(productObject);
  }

  return null;
};

export default parseConfiguration;
