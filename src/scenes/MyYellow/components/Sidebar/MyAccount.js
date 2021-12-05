import React from 'react';

import { SidebarSection, IconNavLink } from './styled';

const MyAccount = () => (
  <SidebarSection>
    <header>
      <h4>My account</h4>
    </header>
    <ul>
      <li><IconNavLink activeClassName="active" to="/my-yellow/account-settings">Account settings</IconNavLink></li>
      <li>
        <IconNavLink activeClassName="active" to="/my-yellow/my-products">
          My products
        </IconNavLink>
      </li>
      <li><IconNavLink activeClassName="active" to="/my-yellow/insights">Insights</IconNavLink></li>
      {/* <li><IconNavLink activeClassName="active" to="/my-yellow/7bc7d36a-eca5-11ea-adc1-0242ac120002">New Insights</IconNavLink></li> */}
    </ul>
  </SidebarSection>
);

export default MyAccount;
