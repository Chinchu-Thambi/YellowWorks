
import React from 'react';
import Loadable from 'react-loadable';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';

import AuthContext from '../../../../../../components/Auth';
import BusinessContext from '../../../../services/BusinessContext/BusinessContext';
import renderWithRouter from '../../../../../../util/renderWithRouter';

import Shopify from './Shopify';

import installShopify from './__mocks__/installShopify';
import connectShopify from './__mocks__/connectShopify';

describe('Shopify', () => {
  const originalWindowLocation = window.location;

  const hmac = '9a2e83d6a30f52b40c0de0b2b22412a404294fba25ba71edd2df5d821626568d';
  const shop = 'yellow-sandbox.myshopify.com';
  const timestamp = '1610677655';

  const authStore = {
    jwtToken: 'token',
    customerId: '5035383512',
  };

  const businessStore = {
    businessId: 'QlVTSU5FU1MjSkVYd0xERFI3WTcwSHFnRmgxdkI3',
  };

  beforeAll(() => {
    Loadable.preloadAll();

    delete window.location;
    window.location = { assign: jest.fn() };
  });

  afterAll(() => {
    window.location = originalWindowLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a redirecting install component', async () => {
    axios.post.mockResolvedValue(installShopify);

    renderWithRouter(
      <AuthContext.Provider value={authStore}>
        <BusinessContext.Provider value={businessStore}>
          <Shopify />
        </BusinessContext.Provider>
      </AuthContext.Provider>,
      { route: `install?hmac=${hmac}&shop=${shop}&timestamp=${timestamp}` },
    );

    screen.getByText('Redirecting you to Shopify App authorisation page.');

    await waitFor(() => {
      expect(axios.post.mock.calls[0][1].query).toContain('installShopify');

      expect(axios.post.mock.calls[0][1].variables.hmac).toBe(hmac);
      expect(axios.post.mock.calls[0][1].variables.shop).toBe(shop);
      expect(axios.post.mock.calls[0][1].variables.timestamp).toBe(timestamp);
      expect(axios.post.mock.calls[0][1].variables.customerId).toBe(authStore.customerId);
      expect(axios.post.mock.calls[0][1].variables.businessId).toBe(businessStore.businessId);
      expect(axios.post.mock.calls[0][2].headers.Authorization).toBe(authStore.jwtToken);

      expect(window.location.assign).toBeCalledWith(installShopify.data.installShopify);
    });
  });

  it('renders warning for missing parameters', () => {
    renderWithRouter(
      <Shopify />,
      { route: `install?hmac=${hmac}&shop=${shop}&timestamp=${timestamp}` },
    );

    expect(axios.post).not.toBeCalled();

    screen.getByText('We can\'t redirect you because the following parameters are missing:');
    screen.getByText('token');
    screen.getByText('customerId');
    screen.getByText('businessId');
  });

  it('renders a confirmation component', async () => {
    axios.post.mockResolvedValue(connectShopify);

    const code = 'bda542a46a7c0cd10120bc50399e9ab4';
    const state = 'U0VTU0lPTiNoRGNyS1VDNkFWSko1Y2Z2ejJNUmR0Z1ZiTllBWjZnTQ';

    const pendingMessage = 'We are finishing up your setup.';
    const confirmationMessage = 'All done!';

    renderWithRouter(
      <AuthContext.Provider value={authStore}>
        <Shopify />
      </AuthContext.Provider>,
      { route: `confirm?code=${code}&hmac=${hmac}&shop=${shop}&state=${state}&timestamp=${timestamp}` },
    );

    screen.getByText(pendingMessage);

    await waitFor(() => {
      expect(axios.post.mock.calls[0][1].query).toContain('ConnectShopify');

      expect(axios.post.mock.calls[0][1].variables.code).toBe(code);
      expect(axios.post.mock.calls[0][1].variables.hmac).toBe(hmac);
      expect(axios.post.mock.calls[0][1].variables.shop).toBe(shop);
      expect(axios.post.mock.calls[0][1].variables.state).toBe(state);
      expect(axios.post.mock.calls[0][1].variables.timestamp).toBe(timestamp);
      expect(axios.post.mock.calls[0][1].variables.customerId).toBe(authStore.customerId);

      expect(axios.post.mock.calls[0][2].headers.Authorization).toBe(authStore.jwtToken);

      screen.getByText(confirmationMessage);
      expect(screen.queryByText(pendingMessage)).not.toBeInTheDocument();
    });
  });
});
