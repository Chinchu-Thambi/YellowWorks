import React from 'react';
import Loadable from 'react-loadable';
import * as R from 'ramda';

import Modal from '../../../../../../../../components/Modal';
import ProductContext from '../../../../../../services/ProductContext';

import {
  ListItem, OptionItem, LabelItem, ActionButton,
} from '../../../../../../components/ListGroup';

import { PremiumIcon } from '../../../PremiumOnly';

const path = ['businessProfile', 'legalName'];

const LegalBusinessNameModal = Loadable({
  loader: () => import('./components/LegalBusinessNameModal'),
  loading: () => null,
});

const LegalBusinessName = () => {
  const productState = React.useContext(ProductContext) || {};
  const statement = R.pathOr('', path)(productState.formData);
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem>
            Legal business name
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
        <div>
          {statement}
        </div>
      </ListItem>
      <Modal
        title="Legal business name"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
      >
        <LegalBusinessNameModal onDismiss={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default LegalBusinessName;
