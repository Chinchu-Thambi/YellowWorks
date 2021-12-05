import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../components/Button';

import ModalContent from '../../WelcomeModal/components/ModalContent';

import welcomeSrc from '../../../assets/welcome.png';
import { theme } from '../../../../../util';

const ReviewRelease = ({ dismiss }) => (
  <ModalContent style={{ padding: theme.space[3], margin: 'auto' }}>
    <img src={welcomeSrc} alt="" />
    <h1>We’re excited to share with you…</h1>
    <p>You can now view customer reviews and respond to them from your business portal!</p>
    <p>
      That means all new responses will go through a content moderation process, so you can actively keep your brand in
      the spotlight for all the right reasons.
    </p>
    <p>
      We’re here to help anytime. You can contact our team on <a href="tel:0800803803">0800 803 803</a> or jump on a
      live chat for help.
    </p>
    <Button style={{ marginTop: theme.space[3] }} onClick={dismiss}>
      Get started
    </Button>
  </ModalContent>
);

ReviewRelease.defaultProps = {
  dismiss: () => {},
};

ReviewRelease.propTypes = {
  dismiss: PropTypes.func,
};

export default ReviewRelease;
