
import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import * as R from 'ramda';
import axios from 'axios';

import AuthContext from '../../../../components/Auth/AuthContext';

import BusinessContext, { BusinessProvider } from './BusinessContext';
import getBusinessIds from './__mocks__/getBusinessIds';
import getBusinessNode from './__mocks__/getBusinessnode';
import businessModel from './__mocks__/businessModel';

import createAssets from './services/createAssets';

const mockCreateAssets = jest.fn();

jest.mock('./services/createAssets', () => ({
  __esModule: true.valueOf,
  default: jest.fn(() => mockCreateAssets),
}));

describe('BusinessContext', () => {
  let businessStore;
  const authStore = { jwtToken: '123', customerId: '123' };

  axios.post.mockImplementation((endpotin, { query }) => {
    if (query.includes('getBusinessIds')) {
      return {
        data: {
          data: getBusinessIds,
        },
      };
    }

    if (query.includes('getBusinessNode')) {
      return {
        data: { data: getBusinessNode },
      };
    }

    return {};
  });

  it('does not throw with incomplete data', async () => {
    render(
      <AuthContext.Provider value={authStore}>
        <BusinessProvider>
          <BusinessContext.Consumer>
            {(latestState) => {
              businessStore = latestState;
            }}
          </BusinessContext.Consumer>
        </BusinessProvider>
      </AuthContext.Provider>,
    );

    await waitFor(() => {
      expect(businessStore);
    });
  });

  it('adds assets to business', async () => {
    render(
      <BusinessProvider>
        <BusinessContext.Consumer>
          {(latestState) => {
            businessStore = latestState;
          }}
        </BusinessContext.Consumer>
      </BusinessProvider>,
    );

    const asset = {
      file: new File([''], 'my file', { type: 'image/jpg' }),
      id: 'my id',
      url: 'my url',
    };

    const uploadedAssets = [asset];

    mockCreateAssets.mockResolvedValue([{
      contentUrl: asset.url,
    }]);

    businessStore.addAssets(uploadedAssets);

    await waitFor(() => {
      // setup
      expect(createAssets).toHaveBeenCalled();

      // asset creation
      expect(mockCreateAssets).toHaveBeenCalled();
    });

    const lastAsset = R.last(businessStore.currentBusiness.assets);
    expect(lastAsset.contentUrl).toBe(asset.url);
  });

  it('provides get/set methods for paths', async () => {
    const detailsPath = ['details'];

    render(
      <AuthContext.Provider value={authStore}>
        <BusinessProvider>
          <BusinessContext.Consumer>
            {(latestState) => {
              businessStore = latestState;
            }}
          </BusinessContext.Consumer>
        </BusinessProvider>
      </AuthContext.Provider>,
    );

    let details;

    await waitFor(() => {
      details = businessStore.getPath(detailsPath);
      expect(details).toEqual(businessModel.details);
    });

    const newDetails = {
      ...details,
      extraKey: 'thevalue',
    };

    act(() => {
      businessStore.setPath(detailsPath, newDetails);
    });

    details = businessStore.getPath(detailsPath);

    expect(details).toEqual(newDetails);
  });
});
