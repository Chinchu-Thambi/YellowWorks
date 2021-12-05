import React from 'react';
import * as R from 'ramda';

import openingHoursIcon from '../../../../../../assets/icons/light/opening-hours.svg';
import infoIcon from '../../../../../../assets/icons/light/info.svg';

import Modal from '../../../../../../components/Modal';
import Card from '../../../../components/Card';
import {
  ListGroup, ListItem, OptionItem, ActionButton, LabelItem, OptionDetails,
} from '../../../../components/ListGroup';

import ProductContext from '../../../../services/ProductContext';

import BusinessDescription from '../modals/BusinessDescription';
import OpeningHours from '../modals/OpeningHours';
import PaymentOptions from './components/PaymentOptions';
import ManageKeywords from './components/ManageKeywords';
import WhatMakesUsDifferent from './components/WhatMakesUsDifferent';
import OpeningHoursView from './components/OpeningHoursView';
import BannerImage from './components/BannerImage';

import { BusinessDescriptionParagraph } from './MainInfoTab.styled';

const MainInfoTab = () => {
  const productState = React.useContext(ProductContext) || {};
  const { formData } = productState;
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Card>
        <h2>Edit your main info</h2>
        <ListGroup>

          <ListItem>
            <OptionItem>
              <LabelItem icon={openingHoursIcon}>Business hours</LabelItem>
              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Business hours',
                    component: () => (
                      <OpeningHours
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>
            <OptionDetails>
              <OpeningHoursView formData={formData?.location?.openingHoursSpecification} />
            </OptionDetails>
          </ListItem>

          <ManageKeywords />

          <ListItem>
            <OptionItem>
              <LabelItem icon={infoIcon}>Business description</LabelItem>
              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Business description',
                    component: () => (
                      <BusinessDescription
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>
            <BusinessDescriptionParagraph>
              {R.path(['formData', 'businessProfile', 'description'])(productState)}
            </BusinessDescriptionParagraph>
          </ListItem>

          <PaymentOptions />
          <BannerImage />
          <WhatMakesUsDifferent />

        </ListGroup>
      </Card>

      <Modal
        title={modalTitle}
        isVisible={isVisible}
        onDismiss={setIsVisible}
      >
        {modalContent}
      </Modal>
    </>
  );
};


export default MainInfoTab;
