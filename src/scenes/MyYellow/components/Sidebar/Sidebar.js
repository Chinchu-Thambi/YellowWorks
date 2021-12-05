import React from 'react';
import PropTypes from 'prop-types';

import { SidebarContainer } from './styled';

import MyAccount from './MyAccount';

const Sidebar = React.forwardRef(({ children }, ref) => (
  <SidebarContainer ref={ref}>
    { children }
    <MyAccount />
  </SidebarContainer>
));

Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: undefined,
};

export default Sidebar;
