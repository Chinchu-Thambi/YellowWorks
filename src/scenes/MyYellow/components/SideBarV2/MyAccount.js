import React from 'react';

import { SidebarSection, IconNavLink } from './styled';
import BusinessContext from '../../services/BusinessContext';

const MyAccount = () => {
  const {
    currentBusiness,
  } = React.useContext(BusinessContext) || {};

  return (
    <SidebarSection>
      <header>
        <h4>{currentBusiness?.details?.name}</h4>
      </header>
      <ul>
        <li><IconNavLink activeClassName="active" to="/myyellowv2/home">Dashboard</IconNavLink></li>
        <li><IconNavLink activeClassName="active" to="/myyellowv2/business-details">Business Details</IconNavLink></li>
        <li><IconNavLink activeClassName="active" to="/myyellowv2/locations">Locations</IconNavLink></li>
        <li><IconNavLink activeClassName="active" to="/myyellowv2/my-products/website">Website</IconNavLink></li>
        {/* <li><IconNavLink activeClassName="active" to="/myyellowv2/media">Photos</IconNavLink></li>
      <li><IconNavLink activeClassName="active" to="/myyellowv2/products-and-services">Products & Services</IconNavLink></li>
      <li><IconNavLink activeClassName="active" to="/myyellowv2/reviews">Reviews</IconNavLink></li>
      <li><IconNavLink activeClassName="active" to="/myyellowv2/insights">Insights</IconNavLink></li> */}
      </ul>
    </SidebarSection>
  );
};

export default MyAccount;
