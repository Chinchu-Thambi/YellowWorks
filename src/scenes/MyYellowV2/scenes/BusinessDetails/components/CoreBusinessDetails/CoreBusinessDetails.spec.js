import React from 'react';
import {
  render, screen, waitFor, act,
} from '@testing-library/react';

import BusinessContext from '../../../../../MyYellow/services/BusinessContext';
import businessStoreModel from '../../../../../MyYellow/services/BusinessContext/__mocks__/businessStoreModel';

import CoreBusinessDetails from './CoreBusinessDetails';

const mockUpload = jest.fn();

jest.mock('./components/ChooseImage', () => ({
  __esModule: true,
  default: ({ onSelect }) => {
    mockUpload.mockImplementation(onSelect);
    return null;
  },
}));

describe('CoreBusinessDetails', () => {
  const businessStore = businessStoreModel;

  it('renders data from business store', () => {
    render(
      <BusinessContext.Provider value={businessStore}>
        <CoreBusinessDetails />
      </BusinessContext.Provider>,
    );

    expect(screen.getByLabelText('Legal Business name').value).toBe(businessStore.currentBusiness.details.legalName);
    expect(screen.getByLabelText('Display Business name').value).toBe(businessStore.currentBusiness.details.name);
    expect(screen.getByLabelText('Website').value).toBe(businessStore.currentBusiness.details.url);
  });

  it('handles selected logo', async () => {
    const selectedLogoUrl = 'file url';

    render(
      <BusinessContext.Provider value={businessStore}>
        <CoreBusinessDetails />
      </BusinessContext.Provider>,
    );

    act(() => {
      mockUpload(selectedLogoUrl);
    });

    act(() => {
      screen.getByText('Save').click();
    });

    await waitFor(() => {
      expect(businessStore.saveBusinessChange.mock.calls[0][0].data.details.logo).toBe(selectedLogoUrl);
    });
  });
});
