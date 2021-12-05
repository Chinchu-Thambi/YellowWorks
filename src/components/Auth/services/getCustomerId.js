import * as R from 'ramda';

const getCustomerId = (authState) => R.compose(
  R.head,
  R.tryCatch(Object.keys, () => []),
  R.tryCatch(JSON.parse, () => {}),
  R.path(['user', 'signInUserSession', 'idToken', 'payload', 'custom:accounts']),
)(authState);

export default getCustomerId;
