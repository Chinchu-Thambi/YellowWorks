import axios from 'axios';
import * as R from 'ramda';

import { importableModules } from '../../services/useModule';

export default () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Return any error which is not due to authentication back to the calling service
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      const { Auth } = await importableModules['@aws-amplify/auth']();

      return Auth.currentAuthenticatedUser()
        .then((user) => {
          // Gets new token from aws response
          const jwtToken = R.path(['signInUserSession', 'idToken', 'jwtToken'])(user);

          // New request with new token
          const { config } = error;
          config.headers.Authorization = jwtToken;

          // Makes a new request with the updated config
          return axios.request(config);
        });
    },
  );
};
