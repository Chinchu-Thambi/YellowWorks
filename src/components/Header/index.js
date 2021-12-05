import React from 'react';
import Loadable from 'react-loadable';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import SmHeader from './SmHeader';
import LgHeader from './LgHeader';
import AuthModal from '../Auth/Modal/AuthModal';
import AuthContext from '../Auth/AuthContext';

const CustomerStatusBarSwitch = Loadable({
  loader: () => import('../CustomerStatusBarSwitch'),
  loading: () => null,
});

const Header = () => {
  const { isStaff } = React.useContext(AuthContext) || {};

  return (
    <>
      <SmHeader />
      <LgHeader />
      <AuthModal />
      <NotificationContainer />

      {isStaff && (
        <CustomerStatusBarSwitch />
      )}
    </>
  );
};

export default Header;
