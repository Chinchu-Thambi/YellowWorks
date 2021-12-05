const { Auth } = require('@aws-amplify/auth');

const getToken = async ({
  region, userPoolId, userPoolWebClientId,
  username, password,
}) => {
  Auth.configure({
    region,
    userPoolId,
    userPoolWebClientId,
  });

  const user = await Auth.signIn(username, password);
  const { jwtToken } = user.signInUserSession.accessToken;

  return jwtToken;
};

module.exports = getToken;
