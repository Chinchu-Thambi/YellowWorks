import React from 'react';

import ModalContent from '../../../WelcomeModal/components/ModalContent';

import welcomeSrc from './images/welcome.png';

const FirstManage = () => (
  <ModalContent>
    <img src={welcomeSrc} alt="" />
    <h1>New Update</h1>
    <p>You&apos;re now able to manage your Yellow Profile subscriptions from the customer portal.</p>
    <p>Upgrades will be processed immediately, while downgrades apply at the end of the current subscription period.</p>
    <p>If you need help, jump on a live chat or call us at <a href="tel:0800803803">0800 803 803</a>.</p>
  </ModalContent>
);

export default FirstManage;
