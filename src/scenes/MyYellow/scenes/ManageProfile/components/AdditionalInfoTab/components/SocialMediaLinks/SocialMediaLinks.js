import React from 'react';
import * as R from 'ramda';
import Loadable from 'react-loadable';

import ProductContext from '../../../../../../services/ProductContext';
import socialIcon from '../../../../../../../../assets/icons/light/social.svg';
import Modal from '../../../../../../../../components/Modal';

import {
  ListItem, OptionItem, OptionDetails, ActionButton, LabelItem, SocialLinks,
} from '../../../../../../components/ListGroup';

import { PremiumIcon } from '../../../PremiumOnly';
import { SocialButton } from '../../AdditionalInfoTab.styled';

const SocialMediaLinksModal = Loadable({
  loader: () => import('./components/SocialMediaLinksModal'),
  loading: () => null,
});

const SocialMediaLinks = () => {
  const productState = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);

  const socialLinks = R.path(['formData', 'businessProfile', 'sameAs'])(productState);

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={socialIcon}>
            Social media links
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
        <SocialLinks>
          <OptionDetails>
            {socialLinks && socialLinks.map((link) => (
              <SocialButton
                name={link.name}
                url={link.url}
                key={link.name}
              />
            ))}
          </OptionDetails>
        </SocialLinks>
      </ListItem>
      <Modal
        title="Social Media Links"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
      >
        <SocialMediaLinksModal onDismiss={() => setIsVisible(false)} />
      </Modal>
    </>
  );
};

export default SocialMediaLinks;
