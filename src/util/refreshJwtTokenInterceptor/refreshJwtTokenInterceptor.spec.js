/* globals jest, describe, beforeAll, afterAll, it, expect */

import Auth from '@aws-amplify/auth';
import axios from 'axios';

import refreshJwtTokenInterceptor from './refreshJwtTokenInterceptor';

jest.unmock('axios');

describe('auto refresh jwt token', () => {
  let initialInterceptorsResponse;
  let useSpy;

  beforeAll(() => {
    useSpy = jest.spyOn(axios.interceptors.response, 'use');
    initialInterceptorsResponse = axios.interceptors.response;
    refreshJwtTokenInterceptor();
  });

  afterAll(() => {
    axios.interceptors.response = initialInterceptorsResponse;
    jest.restoreAllMocks();
  });

  it('should set an interceptor function for axios', () => {
    expect(useSpy.mock.calls).toHaveLength(1);
  });

  it('should retry the request with a new token if the initial response is a 401', async () => {
    const authSpy = jest.spyOn(Auth, 'currentAuthenticatedUser');

    authSpy.mockResolvedValueOnce({
      signInUserSession: {
        idToken: {
          jwtToken: 'token',
        },
      },
    });

    const successMessage = 'successMessage';

    const requestSpy = jest.spyOn(axios, 'request');
    requestSpy.mockResolvedValueOnce(successMessage);

    const response = await axios.interceptors.response.handlers[0].rejected({
      config: {
        url: 'mockUrl',
        headers: {
          Authorization: 'oldToken',
        },
      },
      response: {
        status: 401,
      },
    });

    expect(authSpy.mock.calls).toHaveLength(1);
    expect(requestSpy.mock.calls).toHaveLength(1);
    expect(response).toBe(successMessage);
  });

  it('should return the response for successful calls', async () => {
    const expectedResponse = {};
    const response = await axios.interceptors.response.handlers[0].fulfilled(expectedResponse);

    expect(response).toBe(expectedResponse);
  });

  it('should return the response for unsuccessful calls different from 401', async () => {
    const expectedResponse = {
      response: {
        status: 400,
      },
    };

    try {
      await axios.interceptors.response.handlers[0].rejected(expectedResponse);
    } catch (error) {
      expect(error).toBe(expectedResponse);
    }
  });
});
