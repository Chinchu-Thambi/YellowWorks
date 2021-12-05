import React from 'react';
import { Flex, Box } from 'rebass';
import { navigate } from '@reach/router';

import Modal from '../../../../../../components/Modal';

import Card from '../../../../components/Card';
import ProductContext from '../../../../services/ProductContext';

import {
  ActionButton,
} from '../../../../components/ListGroup';
import Button from '../../../../../../components/Button';

// Modals
import PhysicalLocation from '../modals/PhysicalLocation';
import ImageGallery from '../modals/ImageGallery';
import Logo from '../modals/Logo';
import PhoneNumber from '../modals/PhoneNumber';
import YearEstablished from '../modals/YearEstablished';
import ServicingAreas from '../modals/ServicingAreas';
import OpeningHours from '../modals/OpeningHours';
import ManageCategories from '../modals/Categories';
import WhatMakesUsDifferent from '../MainInfoTab/components/WhatMakesUsDifferent/components/WhatMakesUsDifferentModal';
import PaymentMethods from '../MainInfoTab/components/PaymentOptions/components/PaymentOptionsModal';
import TeamMembers from '../AdditionalInfoTab/components/TeamMembers/components/TeamMembersModal';

import getProfileProgress from './components/ProgressBar/services/getProfileProgress';
import ProgressBar from './components/ProgressBar';

import { FieldList } from './Essentials.styled';
import getIsPremium from '../../../../services/getIsPremium';

const Essentials = () => {
  const productState = React.useContext(ProductContext) || {};
  const { formData, subscriptionId } = productState || {};
  const isPremium = getIsPremium(productState);
  const { progress, missingFields } = getProfileProgress(formData, isPremium);
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  const mustUpgrade = progress >= 80 && !isPremium;

  const dismissModal = () => {
    setIsVisible(false);
  };

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const navigateToManagePlan = () => {
    navigate(`/my-yellow/my-products/manage-plan/${subscriptionId}`);
  };

  const missingFieldsComponentMap = {
    Images: <ImageGallery onDismiss={dismissModal} />,
    'Phone number': <PhoneNumber onDismiss={dismissModal} />,
    Categories: <ManageCategories onDismiss={dismissModal} />,
    'Physical location': <PhysicalLocation onDismiss={dismissModal} />,
    'Business logo': <Logo onDismiss={dismissModal} />,
    'What makes you different': <WhatMakesUsDifferent onDismiss={dismissModal} />,
    'Opening Hours': <OpeningHours onDismiss={dismissModal} />,
    'Year Established': <YearEstablished onDismiss={dismissModal} />,
    'Accepted Payment Methods': <PaymentMethods onDismiss={dismissModal} />,
    'Area Served': <ServicingAreas onDismiss={dismissModal} />,
    'Team Members': <TeamMembers onDismiss={dismissModal} isPremium={isPremium} />,
  };

  if (progress >= 100) return null;
  return (
    <>
      <Card status="promote" isSubCard>
        <Flex>
          <div>
            <h2>Complete your profile</h2>
            <p>Complete profiles help you convert visitors into customers &amp; give you a boost on Google.</p>
            {mustUpgrade && <p>Upgrade to Premium to access more fields.</p>}
          </div>
          <div>
            <ProgressBar stroke={5} radius={55} progress={progress} />
          </div>
        </Flex>
        {mustUpgrade ? (
          <Box alignSelf="left" marginY={2}>
            <Button onClick={navigateToManagePlan} size="sm" variant="secondary" outline>Go Premium</Button>
          </Box>
        ) : (
          <FieldList>
            {missingFields.slice(0, 2).map((missingField) => (
              <li>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: missingField.name,
                    component: () => (
                      missingFieldsComponentMap[missingField.name]
                    ),
                  })}
                >
                  Add {missingField.name}
                </ActionButton>
              </li>
            ))}
          </FieldList>
        )}
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

export default Essentials;
