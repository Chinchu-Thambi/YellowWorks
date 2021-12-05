/* globals localStorage */

import React, {
  createContext, useReducer,
} from 'react';
import { navigate } from 'gatsby';
import { Hub } from '@aws-amplify/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { NotificationManager } from 'react-notifications';

import useModule from '../../services/useModule';
import { storageAvailable, useLocalStorage } from '../../util';
import clearSubscriptionFormData from '../../util/clearSubscriptionFormData';
import { segmentIdentifyAndTrack } from '../../util/segment';

import getCustomerId from './services/getCustomerId';
import getStaffStatus from './services/getStaffStatus';

const initialState = {
  status: 'AUTHENTICATING',
  user: null,
  modal: {
    showAuthModal: false,
    // The target URL when this popup show up. Usually happens when accessing manage page directly
    params: null,
    target: null,
    dismissTarget: null,
  },
  customerId: null,
};

const reducer = (state, {
  type, user, error, modal,
  payload,
}) => {
  switch (type) {
    case 'AUTHENTICATED':
      return {
        ...state,
        status: 'AUTHENTICATED',
        user,
        modal: modal !== undefined ? modal : state.modal,
      };
    case 'UNAUTHENTICATED':
      return {
        ...state,
        status: 'UNAUTHENTICATED',
        error: error !== undefined ? error : state.error,
        modal: modal !== undefined ? modal : state.modal,
      };
    case 'AUTHENTICATING':
      return {
        ...state,
        status: 'AUTHENTICATING',
        modal: modal !== undefined ? modal : state.modal,
      };

    case 'LOGOUT':
      return {
        ...state,
        status: 'UNAUTHENTICATED',
        user: null,
      };

    case 'REGISTRATION_ERROR':
      return {
        ...state,
        error: error !== undefined ? error : state.error,
      };

    case 'SELECT_CUSTOMER':
      return {
        ...state,
        user: {
          ...state.user,
          selectedCustomer: payload.selectedCustomer,
        },
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          ...modal,
        },
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

export default AuthContext;

let authState;

export const AuthProvider = ({ children }) => {
  const { Auth } = useModule('@aws-amplify/auth') || {};
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedCustomer, setSelectedCustomer] = useLocalStorage('selectedCustomer', null);

  const jwtToken = R.path(['user', 'signInUserSession', 'idToken', 'jwtToken'])(state);
  const payload = R.path(['user', 'signInUserSession', 'idToken', 'payload'])(state);
  const expiryTime = R.path(['user', 'signInUserSession', 'idToken', 'payload', 'exp'])(state);
  const isStaff = getStaffStatus(state);
  const customerId = getCustomerId(state);

  // Gets current authentication state
  const getCurrentUser = async ({ bypassCache = false } = {}) => {
    try {
      dispatch({ type: 'AUTHENTICATING' });
      const currentUser = await Auth?.currentAuthenticatedUser({ bypassCache });

      dispatch({
        type: 'AUTHENTICATED', user: currentUser, modal: { showAuthModal: false },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: 'UNAUTHENTICATED', error });
    }
  };

  const refreshUser = React.useCallback(() => {
    if (!Auth) {
      return;
    }
    getCurrentUser({ bypassCache: true });
  }, [Auth]);

  const register = async (username, password, firstName, lastName) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      });
      return true;
    } catch (error) {
      // TODO handle login error
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({ type: 'REGISTRATION_ERROR', error });
      return false;
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      const result = await Auth.confirmSignUp(username, code);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    }
  };

  const resendCode = async (username) => {
    try {
      await Auth.resendSignUp(username);
      return { success: true };
    } catch (error) {
      // TODO handle login error
      // eslint-disable-next-line no-console
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

  const login = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      dispatch({ type: 'AUTHENTICATED', user, modal: { showAuthModal: false } });
      const {
        attributes: {
          sub: id, email, given_name: givenName, family_name: familyName,
        },
      } = user;
      segmentIdentifyAndTrack({
        event: 'Login',
        id,
        payload: {
          email,
          firstmame: givenName,
          lastname: familyName,
        },
      });
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      const { user } = state;
      if (user) {
        const {
          attributes: {
            sub: id, email, given_name: givenName, family_name: familyName,
          },
        } = user;
        segmentIdentifyAndTrack({
          event: 'Logout',
          id,
          payload: {
            email,
            firstname: givenName,
            lastname: familyName,
          },
        });
      }
      await Auth.signOut();

      clearSubscriptionFormData();

      navigate('/');
    } catch (error) {
      // TODO generic error handler
      // eslint-disable-next-line no-console
      console.log(error);
    }
    dispatch({ type: 'LOGOUT', modal: { showAuthModal: false } });
  };

  const forgotPassword = async (username) => {
    try {
      const result = await Auth.forgotPassword(username);
      return result;
    } catch (error) {
      // TODO generic error handler
      // eslint-disable-next-line no-console
      console.log(error);
      return { error };
    }
  };

  const forgotPasswordSubmit = async (username, code, newPassword) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      return true;
    } catch (error) {
      // TODO generic error handler
      // eslint-disable-next-line no-console
      console.log(error);
      return { error };
    }
  };

  const changePassword = async ({ previousPassword, proposedPassword }) => {
    const response = await Auth.changePassword(
      state.user,
      previousPassword,
      proposedPassword,
    );

    return response;
  };

  const loginGoogle = () => {
    if (storageAvailable()) {
      localStorage.setItem('yp_redirect', R.path(['modal', 'target'])(state));
      localStorage.setItem('yp_provider', 'Google');
      Auth.federatedSignIn({ provider: 'Google' });
    }
  };

  const loginFacebook = () => {
    if (storageAvailable()) {
      localStorage.setItem('yp_redirect', R.path(['modal', 'target'])(state));
      localStorage.setItem('yp_provider', 'Facebook');
      Auth.federatedSignIn({ provider: 'Facebook' });
    }
  };

  const loginYellow = () => {
    if (storageAvailable()) {
      localStorage.setItem('yp_redirect', R.path(['modal', 'target'])(state));
      localStorage.setItem('yp_provider', 'Yellow');
      Auth.federatedSignIn({ provider: 'Yellow' });
    }
  };

  const showHideModal = ({
    show, modalType, target, params, dismissTarget, dismissable,
  }) => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: {
        modalType, showAuthModal: show, target, params, dismissTarget, dismissable,
      },
    });
  };

  const displayLoginModal = ({ target, dismissTarget, dismissable } = {}) => {
    showHideModal({
      show: true,
      modalType: 'login',
      target,
      dismissTarget,
      dismissable,
    });
  };

  const getCustomerListByEmail = async (email) => {
    const { data: { data, errors } } = await axios.post(
      process.env.GATSBY_APPSYNC_URL,
      {
        query: `query {
          getCustomerListByEmail(email: "${email}"){
            name
            companyId
          }
        }`,
      },
      {
        headers: {
          Authorization: jwtToken,
        },
      },
    );

    if (errors) {
      // eslint-disable-next-line no-console
      console.error('ERRORS', errors);
      throw errors;
    }

    return data;
  };

  const selectCustomer = React.useCallback(async (customerObject) => {
    if (!customerObject || !isStaff) return;

    const { contactId, customerId: selectedCustomerId, customerName } = customerObject;

    setSelectedCustomer({
      contactId,
      customerId: selectedCustomerId,
      customerName,
    });
  }, [isStaff, setSelectedCustomer]);

  // Configure Auth
  React.useEffect(() => {
    if (!Auth) {
      return;
    }

    Auth.configure({
      region: `${process.env.GATSBY_AWS_REGION}`,
      userPoolId: `${process.env.GATSBY_COGNITO_USER_POOL_ID}`,
      userPoolWebClientId: `${process.env.GATSBY_COGNITO_POOL_CLIENT_ID}`,
      oauth: {
        domain: `${process.env.GATSBY_OAUTH_DOMAIN}`,
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: `${process.env.GATSBY_OAUTH_REDIRECT_SIGN_IN}`,
        redirectSignOut: `${process.env.GATSBY_OAUTH_REDIRECT_SIGN_OUT}`,
        responseType: 'code',
      },
    });
  }, [Auth]);

  // Gets initial authentication state
  // Second argument of empty array means this effect will only run once
  React.useEffect(() => {
    if (!Auth) {
      return;
    }

    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth]);

  // Redirects user post social login
  React.useEffect(() => {
    if (storageAvailable() && jwtToken) {
      const redirectUrl = localStorage.getItem('yp_redirect');
      localStorage.removeItem('yp_redirect');
      localStorage.removeItem('yp_provider');
      // After redirecting from Social Login, log to Segment
      const {
        sub: id,
        email,
        given_name: givenName,
        family_name: familyName,
      } = state.user?.attributes || {};
      segmentIdentifyAndTrack({
        event: 'Login',
        id,
        payload: {
          email,
          firstname: givenName,
          lastname: familyName,
        },
      });
      if (redirectUrl && redirectUrl !== 'undefined') {
        navigate(redirectUrl);
      }
    }
  }, [jwtToken, state]);

  // set listener for post social auth
  React.useEffect(() => {
    if (
      !Auth
    ) { return () => {}; }

    let isPending = false;
    const hubListener = async (data) => {
      const { payload: { event } } = data;

      if (event === 'signIn' && !isPending) {
        isPending = true;

        if (!state.user) {
          const currentUser = await Auth.currentAuthenticatedUser();
          dispatch({ type: 'AUTHENTICATED', user: currentUser });
        }
        isPending = false;
      }
    };

    Hub.listen('auth', hubListener);

    return () => {
      Hub.remove('auth', hubListener);
    };
  }, [Auth, state.user]);

  // refreshes user session when it expires
  React.useEffect(() => {
    if (!expiryTime) { return () => {}; }

    const now = new Date();
    const expiryDate = new Date(expiryTime * 1000);
    const delay = expiryDate - now;

    const timeout = setTimeout(async () => {
      refreshUser();
    }, delay);

    return () => { clearTimeout(timeout); };
  }, [expiryTime, refreshUser]);

  // replaces jwtToken when a customerId is selected
  React.useEffect(() => {
    if (!Auth) {
      return;
    }

    const getUserToken = async () => {
      if (
        isStaff
        && selectedCustomer?.customerId
        && selectedCustomer?.customerId !== customerId
      ) {
        const { username } = state.user;

        const challengedUser = await Auth.signIn(username);

        const user = await Auth.sendCustomChallengeAnswer(
          challengedUser,
          jwtToken,
          {
            contactId: selectedCustomer.contactId,
            customerId: selectedCustomer.customerId,
          },
        );

        if (getCustomerId({ user }) === selectedCustomer.customerId) {
          dispatch({ type: 'AUTHENTICATED', user });
        } else {
          setSelectedCustomer({ customerId });
          NotificationManager.error(
            `Customer ID ${selectedCustomer.customerId} couldn't be found in HubSpot. `
            + 'Please make sure you\'ve got the right one.',
          );
        }
      }
    };

    getUserToken();
  }, [Auth, customerId, isStaff, jwtToken, selectedCustomer, setSelectedCustomer, state.user]);

  authState = {
    // Auth Attributes
    state,
    jwtToken,
    payload,
    customerId,
    isStaff,

    // AWS Cognito Auth
    getCurrentUser,
    refreshUser,
    register,
    confirmSignUp,
    resendCode,
    login,
    logout,
    forgotPassword,
    forgotPasswordSubmit,
    changePassword,
    loginGoogle,
    loginFacebook,
    loginYellow,

    // Modal
    showHideModal,
    displayLoginModal,

    // Staff Tools
    getCustomerListByEmail,
    selectCustomer,
    selectedCustomer,
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
