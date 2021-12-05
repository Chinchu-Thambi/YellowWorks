import React, { useContext } from 'react';
import { navigate } from 'gatsby';

import AuthContext from '../AuthContext';
import Modal from '../../Modal';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ConfirmModal from './ConfirmModal';
import {
  ForgotPasswordModalGetEmail,
  ForgotPasswordModalResetPassword,
  SystemForgotPasswordModal,
} from './ForgotPasswordModal';
import SuccessModal from './SuccessModal';
import ChangePasswordModal from './ChangePasswordModal';
import RegistrationsDisabled from './RegistrationsDisabled';
import ExistingProfile from './ExistingProfile';

const AuthModal = () => {
  const {
    state: {
      modal: {
        showAuthModal, modalType, params, dismissTarget, dismissable,
      } = {},
    } = {},
    showHideModal,
  } = useContext(AuthContext) || {};

  const handleClose = async () => {
    if (dismissTarget) navigate(dismissTarget);

    showHideModal({ show: false });
  };

  let titleText;
  let modalContent;

  switch (modalType) {
    case 'login':
      modalContent = <LoginModal />;
      break;
    case 'register':
      modalContent = <RegisterModal />;
      break;
    case 'confirm':
      modalContent = <ConfirmModal />;
      break;
    case 'fpemail':
      modalContent = <ForgotPasswordModalGetEmail />;
      break;
    case 'fpreset':
      modalContent = <ForgotPasswordModalResetPassword />;
      break;
    case 'success':
      modalContent = <SuccessModal message={params?.message} />;
      break;
    case 'changePassword':
      titleText = 'Change Password';
      modalContent = <ChangePasswordModal />;
      break;
    case 'changeConfirmation':
      titleText = 'Thank you';
      modalContent = <SuccessModal message={params?.message} />;
      break;
    case 'systemForgotPassword':
      modalContent = <SystemForgotPasswordModal />;
      break;
    case 'registrationsDisabled':
      modalContent = <RegistrationsDisabled />;
      break;
    case 'existingProfile':
      titleText = 'You have existing Yellow Profiles on this account';
      modalContent = <ExistingProfile profiles={params?.profiles} />;
      break;
    default:
      titleText = null;
      modalContent = null;
      break;
  }

  return (
    <Modal
      isVisible={Boolean(showAuthModal)}
      onDismiss={handleClose}
      dismissable={dismissable}
      title={titleText}
    >
      {modalContent}
    </Modal>
  );
};

export default AuthModal;
