import React from 'react';
import Loadable from 'react-loadable';
import * as R from 'ramda';

import styled from 'styled-components';
import { Router, Redirect } from '@reach/router';

import AuthContext from '../../components/Auth';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import { mediaBreakpointUp } from '../../util';

import MyYellowSidebar from './components/Sidebar/MyYellowSidebar';
import Container from './components/Container';

import { ProductProvider } from './services/ProductContext';
import FirstLoginModal from './scenes/FirstLoginModal';


const Onboarding = Loadable({
  loader: () => import('../Onboarding'),
  loading: Spinner,
});

const AccountSettings = Loadable({
  loader: () => import('./scenes/AccountSettings'),
  loading: Spinner,
});

const MyProducts = Loadable({
  loader: () => import('./scenes/MyProducts'),
  loading: Spinner,
});

const ManageProfile = Loadable({
  loader: () => import('./scenes/ManageProfile'),
  loading: Spinner,
});

const ManageSubscription = Loadable({
  loader: () => import('./scenes/ManageSubscription'),
  loading: Spinner,
});

const ManageReviews = Loadable({
  loader: () => import('./scenes/ManageReviews'),
  loading: Spinner,
});

// const Insights = Loadable({
//   loader: () => import('./scenes/Insights'),
//   loading: Spinner,
//   delay: 2300,
// });

const InsightsV2 = Loadable({
  loader: () => import('./scenes/Insights/index.v2'),
  loading: Spinner,
});

const ChooseCustomer = Loadable({
  loader: () => import('./scenes/ChooseCustomer'),
  loading: Spinner,
});

const WelcomeModal = Loadable({
  loader: () => import('./scenes/WelcomeModal'),
  loading: () => null,
});

const ContentRouter = styled(Router)`
  flex-grow: 1;
  max-width: 100%;
`;

const SidebarWrapper = styled.div`
  display: none;
  ${mediaBreakpointUp('md')} {
    /* Remove sidebar on mobile */
    display: block;
  }
`;

const MyYellow = () => {
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
    <ProductProvider>
      <Header />
      {authState.jwtToken && (
        <>
          <Container>
            <SidebarWrapper>
              <MyYellowSidebar />
            </SidebarWrapper>
            <ContentRouter basepath="my-yellow">
              <AccountSettings path="account-settings/*" />

              <ManageProfile path="my-products/manage-profile/:subscriptionId" />
              <ManageSubscription path="my-products/manage-plan/:subscriptionId" />
              <ManageReviews path="my-products/manage-reviews/:subscriptionId" />

              <MyProducts path="my-products/" />
              {/* <Insights path="insights/*" /> */}
              {/* <InsightsV2 path="7bc7d36a-eca5-11ea-adc1-0242ac120002/*" /> */}
              <InsightsV2 path="insights/*" />
              <Onboarding path="onboarding/*" />
              <ChooseCustomer path="choose-customer" />

              <Redirect from="*" to="/my-yellow/account-settings" path="/my-yellow/account-settings" />
            </ContentRouter>
          </Container>
          <WelcomeModal context="FirstLoginModal">
            <FirstLoginModal />
          </WelcomeModal>
        </>
      )}
    </ProductProvider>
  );
};

export default MyYellow;
