import * as R from 'ramda';

const getStaffStatus = (authState) => {
  const cognitoGroups = R.path(['user', 'signInUserSession', 'idToken', 'payload', 'cognito:groups'])(authState) || [];

  return cognitoGroups.includes('staff');
};

export default getStaffStatus;
