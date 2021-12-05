import React from 'react';
import Loadable from 'react-loadable';

import paymentOptionsIcon from '../../../../../../../../assets/icons/payment-options-icon.svg';

import ProductContext from '../../../../../../services/ProductContext';
import Modal from '../../../../../../../../components/Modal';
import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';

import { PremiumIcon } from '../../../PremiumOnly';

const PaymentOptionsModal = Loadable({
  loader: () => import('./components/PaymentOptionsModal'),
  loading: () => null,
});

const PaymentOptions = () => {
  const productState = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);

  const paymentAccepted = productState?.formData?.location?.paymentAccepted || [];

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={paymentOptionsIcon}>
            Payment Options
            <PremiumIcon />
          </LabelItem>
          <div>
            <ActionButton
              onClick={() => setIsVisible(true)}
              variant="link"
              size="sm"
            >Edit
            </ActionButton>
          </div>
        </OptionItem>
        {paymentAccepted
          && paymentAccepted.map((paymentType) => <OptionDetails>{paymentType.name}</OptionDetails>)}
      </ListItem>
      <Modal
        title="Payment Options"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
      >
        <PaymentOptionsModal onDismiss={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default PaymentOptions;
