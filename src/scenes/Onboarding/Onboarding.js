import React from 'react';
import { Router, Redirect } from '@reach/router';

import PrePurchaseOnboarding from './scenes/PrePurchaseOnboarding';
import BudgetSummary from './scenes/PrePurchaseOnboarding/scenes/JourneyConfirmation/BudgetSummary';
import OrderConfirmation from './scenes/PrePurchaseOnboarding/scenes/OrderConfirmation';

import PostPurchaseOnboarding from './scenes/PostPurchaseOnboarding';
import Confirm from './scenes/PostPurchaseOnboarding/scenes/Confirm';
import Done from './scenes/PostPurchaseOnboarding/scenes/Done';

const Onboarding = () => (
  <>
    <Router basepath="my-yellow/onboarding">
      <Confirm path="/:subscriptionId/confirm" />
      <Done path="/:subscriptionId/done" />
      <PostPurchaseOnboarding path="/:subscriptionId/:step" />
      <Redirect from="/:subscriptionId/" to="/my-yellow/onboarding/:subscriptionId/1" path="/my-yellow/onboarding/:subscriptionId/1" noThrow />
    </Router>
    <Router basepath="our-products/product-brief">
      <OrderConfirmation path="/:sku/done" />
      <BudgetSummary path="/:sku/confirm" />
      <PrePurchaseOnboarding path="/:sku" />
      <Redirect from="/:sku" to="/our-products/product-brief/:sku/1" path="/our-products/product-brief/:sku/1" noThrow />
    </Router>
  </>
);

export default Onboarding;
