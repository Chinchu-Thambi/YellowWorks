/* globals describe, it, jest, expect, Storage */

import React from 'react';
import { render, act } from '@testing-library/react/pure';
import Auth from '@aws-amplify/auth';

import AuthContext, { AuthProvider } from './AuthContext';

Auth.configure = jest.fn();

describe('AuthContext', () => {
  let authState;
  const jwtToken = 'jwtToken';
  const user = {
    attributes: {
      sub: 'sub',
      email: 'email@example.com',
      given_name: 'given_name',
      family_name: 'family_name',
    },
    signInUserSession: {
      idToken: {
        jwtToken,
      },
    },
  };
  const staffUser = {
    attributes: {
      sub: 'sub',
      email: 'email@yellow.co.nz',
      given_name: 'given_name',
      family_name: 'family_name',
    },
    signInUserSession: {
      idToken: {
        jwtToken,
        payload: {
          'cognito:groups': ['staff'],
        },
      },
    },
  };

  it('returns a null user for rejected auth', async () => {
    const rejectValue = 'user not logged in';

    await act(async () => {
      const currentAuthenticatedUser = jest.spyOn(Auth, 'currentAuthenticatedUser');
      currentAuthenticatedUser.mockRejectedValueOnce(rejectValue);

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(latestState) => {
              authState = latestState;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
    });

    expect(authState.state.status).toBe('UNAUTHENTICATED');
    expect(authState.state.user).toBeNull();
    expect(authState.state.error).toBe(rejectValue);
  });

  it('provides a user for successful auth', async () => {
    await act(async () => {
      const currentAuthenticatedUser = jest.spyOn(Auth, 'currentAuthenticatedUser');
      currentAuthenticatedUser.mockResolvedValueOnce(user);

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(latestState) => {
              authState = latestState;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
    });

    expect(authState.state.status).toBe('AUTHENTICATED');
    expect(authState.state.user).toBe(user);
  });

  it('displays a login modal', async () => {
    const target = '/target/url';
    const dismissTarget = '/dismissTarget/url';

    // Display Modal Action
    await act(async () => {
      authState.displayLoginModal({
        target, dismissTarget,
      });
    });

    expect(authState.state.modal.target).toBe(target);
    expect(authState.state.modal.dismissTarget).toBe(dismissTarget);
  });

  it('sets federated logins and redirects', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const federatedSignIn = jest.spyOn(Auth, 'federatedSignIn');

    setItem.mockClear();

    federatedSignIn.mockImplementation(() => {});

    await act(async () => {
      authState.loginGoogle();
      authState.loginFacebook();
      authState.loginYellow();
    });

    expect(setItem.mock.calls).toMatchSnapshot();
    expect(federatedSignIn.mock.calls).toMatchSnapshot();
  });

  it('provides login functionality', async () => {
    const username = 'username';
    const password = 'password';
    const signIn = jest.spyOn(Auth, 'signIn');
    signIn.mockResolvedValueOnce(user);
    let result;

    await act(async () => {
      result = await authState.login(username, password);
    });

    expect(signIn.mock.calls[0]).toEqual([username, password]);
    expect(result.user).toBe(user);
  });

  it('provides register functionality', async () => {
    const signUp = jest.spyOn(Auth, 'signUp');
    signUp.mockImplementation(() => {});

    const username = 'username';
    const password = 'password';
    const firstName = 'firstName';
    const lastName = 'lastName';

    await act(async () => {
      await authState.register(username, password, firstName, lastName);
    });

    expect(signUp.mock.calls[0][0]).toEqual({
      username,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName,
      },
    });
  });

  it('provides signup confirmation functionality', async () => {
    const resolvedValue = {};
    const confirmSignUp = jest.spyOn(Auth, 'confirmSignUp');
    confirmSignUp.mockResolvedValueOnce(resolvedValue);

    const username = 'username';
    const code = 'code';

    let result;
    await act(async () => {
      result = await authState.confirmSignUp(username, code);
    });

    expect(confirmSignUp.mock.calls[0]).toEqual([username, code]);
    expect(result).toEqual({
      success: true,
      result: resolvedValue,
    });
  });

  it('provides resend code functionality', async () => {
    const resendSignUp = jest.spyOn(Auth, 'resendSignUp');
    resendSignUp.mockResolvedValueOnce();

    const username = 'username';
    await act(async () => {
      await authState.resendCode(username);
    });

    expect(resendSignUp.mock.calls[0]).toEqual([username]);
  });

  it('provides password manipulation functionality', async () => {
    // forgot password
    const resolvedValue = {};
    const forgotPassword = jest.spyOn(Auth, 'forgotPassword');
    forgotPassword.mockResolvedValueOnce(resolvedValue);

    const username = 'username';
    const code = 'code';
    const newPassword = 'newPassword';

    let result;
    await act(async () => {
      result = await authState.forgotPassword(username);
    });

    expect(forgotPassword.mock.calls[0][0]).toBe(username);
    expect(result).toBe(resolvedValue);

    // reset forgotten password
    const forgotPasswordSubmit = jest.spyOn(Auth, 'forgotPasswordSubmit');
    forgotPasswordSubmit.mockResolvedValueOnce();

    await act(async () => {
      result = await authState.forgotPasswordSubmit(username, code, newPassword);
    });

    expect(forgotPasswordSubmit.mock.calls[0]).toEqual([
      username, code, newPassword,
    ]);

    // change password
    const changePassword = jest.spyOn(Auth, 'changePassword');
    changePassword.mockResolvedValueOnce(resolvedValue);
    const previousPassword = 'previousPassword';
    const proposedPassword = 'proposedPassword';

    await act(async () => {
      result = await authState.changePassword({ previousPassword, proposedPassword });
    });

    expect(result).toBe(resolvedValue);
    expect(changePassword.mock.calls[0]).toEqual([
      user, previousPassword, proposedPassword,
    ]);
  });

  it('provides logout functionality', async () => {
    const username = 'username';
    const password = 'password';
    const signOut = jest.spyOn(Auth, 'signOut');
    signOut.mockImplementation(() => {});

    await act(async () => {
      await authState.logout(username, password);
    });

    expect(signOut.mock.calls).toHaveLength(1);
    expect(authState.state.user).toBe(null);
  });

  it('uses current staff login to select a customerAccount', async () => {
    const customerObject = {
      customerId: 'customerId',
    };

    const challengedUser = {};

    Auth.signIn = jest.fn();
    Auth.sendCustomChallengeAnswer = jest.fn();

    await act(async () => {
      Auth.signIn.mockResolvedValueOnce(staffUser);
      await authState.login();

      Auth.signIn.mockResolvedValueOnce(challengedUser);
      Auth.sendCustomChallengeAnswer.mockResolvedValueOnce(user);
      await authState.selectCustomer(customerObject);
    });

    expect(Auth.sendCustomChallengeAnswer.mock.calls[0][0]).toEqual(
      challengedUser,
      jwtToken,
      { customerId: customerObject.customerId },
    );

    Auth.signIn.mockRestore();
    Auth.sendCustomChallengeAnswer.mockRestore();
  });
});
