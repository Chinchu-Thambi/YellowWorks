import React from 'react';
import { render, screen } from '@testing-library/react';

import BusinessContext from '../../../../MyYellow/services/BusinessContext';
import businessStoreModel, {
  getPathMock,
} from '../../../../MyYellow/services/BusinessContext/__mocks__/businessStoreModel';
import yellowWebsiteModel from '../../../../MyYellow/services/BusinessContext/__mocks__/yellowWebsiteModel';

import ManageWebsite from './ManageWebsite';

describe('ManageWebsite', () => {
  const { name, slogan } = businessStoreModel.currentBusiness.details;
  const { telephone } = businessStoreModel.currentBusiness.locations[1];
  const { headline, alternativeHeadline, primaryImageOfPage } = yellowWebsiteModel;

  const flatBusiness = {
    primaryImageOfPage,
    'Trading name': name,
    'About your business': slogan,
    mainPhone: telephone,
    Headline: headline,
    'Sub-headline': alternativeHeadline,
  };

  businessStoreModel.getSubset.mockReturnValue(flatBusiness);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no website product state', () => {
    businessStoreModel.getPath.mockReturnValue({});

    render(
      <BusinessContext.Provider value={businessStoreModel}>
        <ManageWebsite />
      </BusinessContext.Provider>,
    );

    screen.getByText('It looks like you don\'t have a website yet.');
  });

  // it('renders not onboarded state', () => {
  //   businessStoreModel.getPath.mockImplementation((path) => {
  //     if (path.includes('subscriptions')) {
  //       const unOnboardedSubscription = { provider: 'WEBSITES', status: 'NEW' };
  //       return [unOnboardedSubscription];
  //     }

  //     if (path.includes('draft')) {
  //       return true;
  //     }

  //     return null;
  //   });

  //   render(
  //     <BusinessContext.Provider value={businessStoreModel}>
  //       <ManageWebsite />
  //     </BusinessContext.Provider>,
  //   );

  //   screen.getByText("It looks like you haven't setup your website yet.");
  // });

  // it('renders cover image from website provider configuration', async () => {
  //   businessStoreModel.getPath.mockImplementation(getPathMock);

  //   render(
  //     <BusinessContext.Provider value={businessStoreModel}>
  //       <ManageWebsite />
  //     </BusinessContext.Provider>,
  //   );

  //   screen.getByText('Cover Photo for your Website');

  //   const imgElement = screen.getByAltText('cover photo');
  //   expect(imgElement).toHaveAttribute('src', primaryImageOfPage);
  // });

  // it('renders Yellow Website Information section', () => {
  //   businessStoreModel.getPath.mockImplementation(getPathMock);

  //   render(
  //     <BusinessContext.Provider value={businessStoreModel}>
  //       <ManageWebsite />
  //     </BusinessContext.Provider>,
  //   );

  //   screen.getByText('Yellow Website Information');

  //   expect(screen.getByLabelText('Trading name')).toHaveValue(name);
  //   expect(screen.getByLabelText('About your business')).toHaveValue(slogan);

  //   expect(screen.getByLabelText('Area Code')).toHaveValue(telephone.areaCode);
  //   expect(screen.getByLabelText('Phone Number')).toHaveValue(telephone.number);

  //   expect(screen.getByLabelText('Headline')).toHaveValue(headline);
  //   expect(screen.getByLabelText('Sub-headline')).toHaveValue(alternativeHeadline);
  // });

  // it.skip('renders Social Media section', () => {
  //   render(
  //     <ManageWebsite />,
  //   );

  //   screen.getByText('Social Media');

  //   screen.getByLabelText('Twitter');
  //   screen.getByLabelText('Facebook');
  //   screen.getByLabelText('Instagram');
  //   screen.getByLabelText('LinkedIn');
  // });
});
