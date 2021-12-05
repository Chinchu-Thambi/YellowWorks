import React from 'react';
import Loadable from 'react-loadable';
import * as R from 'ramda';

import starIcon from '../../../../../../../../assets/icons/star-icon.svg';

import Modal from '../../../../../../../../components/Modal';
import ProductContext from '../../../../../../services/ProductContext';

import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';

import { PremiumIcon } from '../../../PremiumOnly';

const path = ['businessProfile', 'slogan'];

const WhatMakesUsDifferentModal = Loadable({
  loader: () => import('./components/WhatMakesUsDifferentModal'),
  loading: () => null,
});

const WhatMakesUsDifferent = () => {
  const productState = React.useContext(ProductContext) || {};
  const statement = R.pathOr('', path)(productState.formData);
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={starIcon}>
            What makes us different
            <PremiumIcon />
          </LabelItem>
          <div>
            <ActionButton
              variant="link"
              size="sm"
              onClick={() => setIsVisible(true)}
            >
              Edit
            </ActionButton>
          </div>
        </OptionItem>
        <OptionDetails>
          {statement}
        </OptionDetails>
      </ListItem>
      <Modal
        title="What makes us different"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
      >
        <WhatMakesUsDifferentModal onDismiss={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default WhatMakesUsDifferent;
