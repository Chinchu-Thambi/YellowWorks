import React from 'react';
import Loadable from 'react-loadable';

// Icons
import picturesIcon from '../../../../../../../../assets/icons/picturesIcon.svg';

import ProductContext from '../../../../../../services/ProductContext';
import Modal from '../../../../../../../../components/Modal';

import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';

import { PremiumIcon } from '../../../PremiumOnly';

import {
  BannerImageItem,
} from './BannerImage.styled';

const BannerImageModal = Loadable({
  loader: () => import('./components/BannerImageModal'),
  loading: () => null,
});
const BannerImage = () => {
  const productState = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);
  const bannerImage = productState?.formData?.productAttributes?.primaryImageOfPage;

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={picturesIcon}>
            Banner Image
            <PremiumIcon />
          </LabelItem>
          <div>
            <ActionButton
              onClick={() => { setIsVisible(true); }}
              variant="link"
              size="sm"
            >Edit
            </ActionButton>
          </div>
        </OptionItem>
        {bannerImage && (
          <OptionDetails>
            <BannerImageItem contentUrl={bannerImage?.contentUrl} alt="Banner Image" />
          </OptionDetails>
        )}
      </ListItem>
      <Modal
        title="Banner Image"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
      >
        <BannerImageModal onDismiss={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default BannerImage;
