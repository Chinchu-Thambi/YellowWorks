import React from 'react';
import Loadable from 'react-loadable';
import * as R from 'ramda';

import styled from 'styled-components';
import { Router, Redirect } from '@reach/router';

import AuthContext from '../../components/Auth';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import { mediaBreakpointUp } from '../../util';

import MyYellowV2Sidebar from './components/MyYellowV2Sidebar/MyYellowV2Sidebar';

import { BusinessProvider } from '../MyYellow/services/BusinessContext';
import { ProductProvider } from '../MyYellow/services/ProductContext';
import FirstLoginModal from '../MyYellow/scenes/FirstLoginModal';
import BusinessDetails from './scenes/BusinessDetails';
import { DashboardContainer } from './components/Containers';
import BillingDetails from './scenes/BillingDetails/BillingDetails';

const Onboarding = Loadable({
  loader: () => import('../Onboarding'),
  loading: Spinner,
});

const AccountSettings = Loadable({
  loader: () => import('./scenes/AccountSettings/AccountSettings'),
  loading: Spinner,
});

const ManageWebsite = Loadable({
  loader: () => import('./scenes/products/ManageWebsite'),
  loading: Spinner,
});

const ManageGmb = Loadable({
  loader: () => import('./scenes/products/ManageGMB/ManageGMB'),
  loading: Spinner,
});

const ManageYol = Loadable({
  loader: () => import('./scenes/products/ManageYol/ManageYol'),
  loading: Spinner,
});

const ManagePrint = Loadable({
  loader: () => import('./scenes/products/ManagePrint/ManagePrint'),
  loading: Spinner,
});

const ManageSa = Loadable({
  loader: () => import('./scenes/products/ManageSA/ManageSA'),
  loading: Spinner,
});

const ManageProfile = Loadable({
  loader: () => import('../MyYellow/scenes/ManageProfile'),
  loading: Spinner,
});

const ManageSubscription = Loadable({
  loader: () => import('../MyYellow/scenes/ManageSubscription'),
  loading: Spinner,
});

const ManageReviews = Loadable({
  loader: () => import('./scenes/Reviews/Reviews'),
  loading: Spinner,
});

const Dashboard = Loadable({
  loader: () => import('./scenes/Dashboard/Dashboard'),
  loading: Spinner,
});

const Locations = Loadable({
  loader: () => import('./scenes/LocationManagement/LocationManagement'),
  loading: Spinner,
});

const Insights = Loadable({
  loader: () => import('./scenes/Insights/index'),
  loading: Spinner,
});

const PhotosAndVideos = Loadable({
  loader: () => import('./scenes/PhotosAndVideos'),
  loading: Spinner,
});

const ProductsAndServices = Loadable({
  loader: () => import('./scenes/ProductsAndServices'),
  loading: Spinner,
});


// const BillingDetails = Loadable({
//   loader: () => import('./scenes/BillingDetails/BillingDetails'),
//   loading: <h2>Loading...</h2>,
// });

// TODO - Figure out why this isn't working
// const BusinessDetails = Loadable({
//   loader: () => import('./scenes/BusinessDetails'),
//   loading: () => <h1>Loading...</h1>,
// });

const ChooseCustomer = Loadable({
  loader: () => import('../MyYellow/scenes/ChooseCustomer'),
  loading: Spinner,
});

const WelcomeModal = Loadable({
  loader: () => import('../MyYellow/scenes/WelcomeModal'),
  loading: () => null,
});

const ContentRouter = styled(Router)`
  flex-grow: 1;
  max-width: 100%;
  ${mediaBreakpointUp('md')} {
    max-width: 82%;
  }
`;

const SidebarWrapper = styled.div`
  display: none;
  ${mediaBreakpointUp('md')} {
    /* Remove sidebar on mobile */
    display: block;
  }
`;

const MyYellowV2 = () => {
  const authState = React.useContext(AuthContext) || {};
  const showModal = R.path(['state', 'modal', 'showAuthModal'])(authState);
  const [askLogin, setAskLogin] = React.useState(true);

  React.useEffect(() => {
    if (askLogin) {
      if (!authState.jwtToken && !showModal && authState.displayLoginModal) {
        authState.displayLoginModal({
          dismissTarget: '/',
        });
      }

      setAskLogin(false);
    }
  }, [askLogin, authState, showModal]);

  return (
    <BusinessProvider>
      <ProductProvider>
        <Header />
        {authState.jwtToken && (
        <div className="bg-base-200" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <DashboardContainer className="md:space-x-5">
            <SidebarWrapper>
              <MyYellowV2Sidebar />
            </SidebarWrapper>
            <ContentRouter basepath="myyellowv2">
              {/* Business Details */}
              <Dashboard path="home" />
              <BusinessDetails path="business-details" />
              <Locations path="locations" />
              <PhotosAndVideos path="content/*" />
              <ProductsAndServices path="products-and-services/*" />
              <ManageReviews path="manage-reviews" />
              <Insights path="digital-performance/*" />
              {/* // TODO should probably delete the insights/* path below */}
              <Insights path="insights/*" />

              {/* Products */}
              <ManageWebsite path="my-products/website" />
              <ManageSa path="my-products/google-search-ads" />
              <ManageYol path="my-products/yellow-profile" />
              <ManageGmb path="my-products/google-my-business" />

              <ManagePrint path="my-products/yellow-pages" />
              <ManageProfile path="my-products/yellow-profile/manage-profile/:subscriptionId" />
              <ManageSubscription path="my-products/yellow-profile/manage-plan/:subscriptionId" />

              {/* Admin */}
              <AccountSettings path="account-settings" />
              <BillingDetails path="billing" />

              {/* Staff */}
              <ChooseCustomer path="choose-customer" />

              {/* Onboarding */}
              <Onboarding path="onboarding/*" />

              {/* Redirects */}
              <Redirect
                from="*"
                to="/myyellowv2/home"
                path="/myyellowv2/home"
              />
              <Redirect
                from="digital-performance"
                to="/myyellowv2/digital-performance/yellow-profile"
                path="/myyellowv2/digital-performance/yellow-profile"
              />

              {/* TODO: Cool functionality to add later */}
              {/* <ManageSearchAds path="my-products/" /> */}
              {/* <ManagePrint path="my-products/" /> */}
              {/* <ManageFacebook path="my-products/" /> */}
            </ContentRouter>
          </DashboardContainer>
          <WelcomeModal context="FirstLoginModal">
            <FirstLoginModal />
          </WelcomeModal>
        </div>
        )}
      </ProductProvider>
    </BusinessProvider>
  );
};

export default MyYellowV2;
