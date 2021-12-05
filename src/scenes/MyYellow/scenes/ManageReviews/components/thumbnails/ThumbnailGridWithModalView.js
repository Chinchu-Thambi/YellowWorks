import React from 'react';
import { Image } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../../../../../util';
import Modal from '../../../../../../components/Modal';
import { ImageType } from '../ReviewRatings.proptypes';
import ThumbnailGrid from './ThumbnailGrid';

const ThumbnailGridWithModalView = ({ images, thumbnailSize }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = (img) => {
    setSelectedImage(img);
    setOpenModal(true);
  };
  const close = () => {
    setSelectedImage(null);
    setOpenModal(false);
  };

  return (
    <>
      <ThumbnailGrid images={images} thumbnailSize={thumbnailSize} onClick={(img) => open(img)} />
      {selectedImage && (
        <Modal
          isVisible={openModal}
          onDismiss={close}
          style={{
            borderRadius: theme.radii[3],
          }}
        >
          <Image src={selectedImage} p={3} maxHeight="80vh" />
        </Modal>
      )}
    </>
  );
};

ThumbnailGridWithModalView.propTypes = {
  images: PropTypes.arrayOf(ImageType).isRequired,
  thumbnailSize: PropTypes.number,
};

ThumbnailGridWithModalView.defaultProps = {
  thumbnailSize: 75,
};

export default ThumbnailGridWithModalView;
