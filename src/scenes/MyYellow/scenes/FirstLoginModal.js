import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';

import welcomeSrc from '../assets/welcome.png';
import ModalContent from './WelcomeModal/components/ModalContent';

const FirstLoginModal = ({ dismiss }) => (
  <ModalContent>
    <img src={welcomeSrc} alt="" />
    <h1>Welcome to Yellow!</h1>
    <p>
      We’re excited to have you onboard. Now you have access to all you need
      to manage your profile and products with us. That means you can manage
      your business details, upgrade or downgrade your products, and view
      insights all in one place.
    </p>
    <Button onClick={dismiss}>Get started</Button>
  </ModalContent>
);

FirstLoginModal.defaultProps = {
  dismiss: () => {},
};

FirstLoginModal.propTypes = {
  dismiss: PropTypes.func,
};


export default FirstLoginModal;
