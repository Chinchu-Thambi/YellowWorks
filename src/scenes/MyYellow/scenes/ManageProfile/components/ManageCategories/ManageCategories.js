import React from 'react';
import { Flex } from 'rebass/styled-components';

import Modal from '../../../../../../components/Modal';
import Tag from '../../../../../../components/Tag';

import Card from '../../../../components/Card';
import { ActionButton } from '../../../../components/ListGroup';
import ProductContext from '../../../../services/ProductContext';

import CategoriesModal from '../modals/Categories';

import CategoryBoostView from './components/CategoryBoostView';

import { Line } from './ManageCategories.styled';

const ManageCategories = () => {
  const { formData, orderDetails } = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();

  const hasBoost = orderDetails?.productOptions.length > 0;
  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Card>
        <h2>Manage your categories</h2>
        <Flex alignItems="center" justifyContent="space-between">
          {formData?.categories?.length > 0 && (
            <div>
              {formData?.categories.map((category) => (
                <Tag key={category.id} readonly>{category.name}</Tag>
              ))}
            </div>
          )}
          <div>
            <ActionButton
              onClick={() => renderModalContent({
                title: 'Categories',
                component: () => (
                  <CategoriesModal
                    onDismiss={dismissModal}
                  />
                ),
              })}
              variant="link"
              size="sm"
            >
              {formData?.categories?.length ? 'Edit' : 'Add categories'}
            </ActionButton>
          </div>
        </Flex>
        {hasBoost && (
          <>
            <Line />
            <CategoryBoostView
              formData={formData}
              renderModalContent={renderModalContent}
              dismissModal={dismissModal}
            />
          </>
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

export default ManageCategories;
