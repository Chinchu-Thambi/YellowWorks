import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../components/Modal';
import AuthContext from '../../../../components/Auth';
import { useLocalStorage } from '../../../../util';

const WelcomeModal = ({ context, children }) => {
  const authState = React.useContext(AuthContext) || {};
  const [checkedModals, setCheckedModals] = useLocalStorage('WelcomeModals', []);
  const [isVisible, setIsVisible] = React.useState(true);

  const dismiss = () => {
    setCheckedModals([
      ...checkedModals,
      context,
    ]);
    setIsVisible(false);
  };

  if (
    !authState.jwtToken
    || checkedModals.includes(context)
    || !children
  ) return null;

  return (
    <Modal isVisible={isVisible} onDismiss={dismiss}>
      {/* Passing down dismiss function to children */}
      {React.cloneElement(children, { dismiss })}
    </Modal>
  );
};

WelcomeModal.defaultProps = {
  context: '',
};

WelcomeModal.propTypes = {
  context: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default WelcomeModal;
