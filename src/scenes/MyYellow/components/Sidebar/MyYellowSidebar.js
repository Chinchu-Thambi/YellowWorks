import React from 'react';
import { Router } from '@reach/router';

import Sidebar from './Sidebar';
import MyProfile from './MyProfile';

const MyYellowSidebar = React.forwardRef((props, ref) => (
  <Sidebar ref={ref}>
    <Router basepath="my-yellow">
      <MyProfile path="my-products/manage-profile/:subscriptionId" />
      <MyProfile path="my-products/manage-plan/:subscriptionId" />
      <MyProfile path="my-products/manage-reviews/:subscriptionId" />
    </Router>
  </Sidebar>
));

export default MyYellowSidebar;
