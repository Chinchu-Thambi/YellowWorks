import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';
import getYouTubeID from 'get-youtube-id';

// Icons
import addGalleryIcon from '../../../../../../assets/icons/light/add-gallery.svg';
import addVideoIcon from '../../../../../../assets/icons/light/add-video.svg';
import playButtonIcon from '../../../../../../assets/icons/play-button.svg';

import { ActionButton } from '../../../../components/ListGroup';
import Spinner from '../../../../../../components/Spinner';
import Button from '../../../../../../components/Button';
import Modal from '../../../../../../components/Modal';

import Card from '../../../../components/Card';
import ProductContext from '../../../../services/ProductContext';

import { PremiumIcon } from '../PremiumOnly';
import {
  GalleryContainer, GalleryItem, GalleryImageItem, GalleryVideoItem, ButtonsContainer, ButtonBox, ButtonIcon,
} from './EditGallery.styled';


// Modals
const ImageGallery = Loadable({
  loader: () => import('../modals/ImageGallery'),
  loading: Spinner,
});

const GalleryListItem = ({ item }) => (
  item.type === 'ImageObject'
    ? (
      <GalleryItem>
        <GalleryImageItem contentUrl={item?.contentUrl} alt={item?.caption} />
      </GalleryItem>
    ) : (
      <GalleryItem>
        <GalleryVideoItem youTubeID={getYouTubeID(item?.contentUrl)}>
          <img src={playButtonIcon} alt="video icon" aria-hidden="true" />
        </GalleryVideoItem>
      </GalleryItem>
    ));

GalleryListItem.propTypes = {
  item: PropTypes.shape({
    contentUrl: PropTypes.string,
    caption: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

const path = ['productAttributes', 'gallery'];

const EditGallery = () => {
  const productState = React.useContext(ProductContext) || {};
  const items = R.path(path)(productState.formData) || [];

  const [modalContent, setModalContent] = React.useState();
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('Image gallery');

  const renderModalContent = ({ title, component }) => {
    if (title) {
      setModalTitle(title);
    }

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
        <h2>Edit your gallery</h2>
        <PremiumIcon />
        {items?.length > 0 && (
          <Flex alignItems="center" justifyContent="space-between">
            <GalleryContainer>
              {
                items.map((item, index) => (
                  // Render only the first 2 images.
                  index < 2 && (
                    <GalleryListItem key={item.contentUrl} item={item} />
                  ))).reverse()
              }
            </GalleryContainer>

            <ActionButton
              variant="link"
              size="sm"
              onClick={() => renderModalContent({
                component: () => (
                  <ImageGallery
                    onDismiss={dismissModal}
                    onCancel={() => setIsVisible(false)}
                  />
                ),
              })}
            >
              Edit
            </ActionButton>
          </Flex>
        )}

        {items.length === 0 && (
          <ButtonsContainer>
            <ButtonBox>
              <div><ButtonIcon src={addGalleryIcon} alt="Add images" /></div>
              <Button
                variant="link"
                size="sm"
                onClick={() => renderModalContent({
                  component: () => (
                    <ImageGallery
                      onDismiss={dismissModal}
                      onCancel={() => setIsVisible(false)}
                    />
                  ),
                })}
              >
                ADD IMAGES
              </Button>
            </ButtonBox>

            <ButtonBox>
              <div><ButtonIcon src={addVideoIcon} alt="Add a video" /></div>
              <Button
                variant="link"
                size="sm"
                onClick={() => renderModalContent({
                  component: () => (
                    <ImageGallery
                      onDismiss={dismissModal}
                      onCancel={() => setIsVisible(false)}
                    />
                  ),
                })}
              >
                ADD VIDEOS
              </Button>
            </ButtonBox>
          </ButtonsContainer>
        )}

      </Card>
      <Modal
        title={modalTitle}
        isVisible={isVisible}
        onDismiss={dismissModal}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default EditGallery;
