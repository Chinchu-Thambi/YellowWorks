import React from 'react';
// import { navigate } from 'gatsby';

import { ActionButton } from '../../../../components/ListGroup';
import Spinner from '../../../../../../components/Spinner';
import Modal from '../../../../../../components/Modal';

import Card from '../../../../components/Card';
import ProductContext from '../../../../services/ProductContext';

// import checkFreeSubscription from '../../services/checkFreeSubscription';

import CloseBusinessModal from '../modals/CloseBusiness/CloseBusinessModal';

const CloseBusiness = () => {
  const { orderDetails } = React.useContext(ProductContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  // const isFreeSubscription = orderDetails && checkFreeSubscription(orderDetails);

  const status = orderDetails?.status;

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  if (!status) {
    return <Card><Spinner /></Card>;
  }
  return (
    <Card isSubCard>
      <h2>Remove your listing</h2>
      {/* {isFreeSubscription ? ( */}
      <p>You can request to remove this listing from your account and mark it as permanently closed</p>
      {/* ) : ( */}
      {/* <p>To mark this listing as permanently closed and remove it from your account please first
      downgrade to a free profile</p> */}
      {/* )}
      {isFreeSubscription
        ? ( */}
      <ActionButton
        variant="link"
        size="sm"
        onClick={() => renderModalContent({
          title: 'Remove your listing',
          component: () => (
            <CloseBusinessModal
              onDismiss={dismissModal}
            />
          ),
        })}
      >
        SUBMIT REQUEST
      </ActionButton>
      {/* ) : (
          <ActionButton
            variant="link"
            size="sm"
            onClick={() => navigate(`/my-yellow/my-products/manage-plan/${subscriptionId}`)}
          >
            MANAGE YOUR PLAN
          </ActionButton>
        )} */}
      <Modal
        title={modalTitle}
        isVisible={isVisible}
        onDismiss={setIsVisible}
      >
        {modalContent}
      </Modal>
    </Card>
  );
};

export default CloseBusiness;
