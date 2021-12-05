import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import addBannerIcon from '../../../../../../../../../../assets/icons/light/add-gallery.svg';
import trashBinIcon from '../../../../../../../../../../assets/icons/light/trash-bin.svg';

import ProductContext from '../../../../../../../../services/ProductContext';
import Spinner from '../../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../../components/Button';
import getIsPremium from '../../../../../../../../services/getIsPremium';

import {
  ButtonContainer, EditWrapper,
} from '../../../../../modals/Styled';

import { PremiumModalPrompt } from '../../../../../PremiumOnly';
import ImageUpload from '../../../../../ImageUpload';

import {
  CancelButton, BannerContainer, BannerItemContainer, BannerItem, BannerImageItem, DeleteButton,
  UploadButtonsContainer, ButtonBox, ButtonIcon,
  MessageInstructions,
  DeleteIconImg,
} from '../../BannerImage.styled';

const path = ['productAttributes', 'primaryImageOfPage'];
const MAX_IMAGES = 1;

const BannerImageModal = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const isPremium = getIsPremium(productState) || false;
  const [pendingSave, setPendingSave] = React.useState(false);
  const [item, setItem] = React.useState(R.path(path)(productState.formData) || null);
  const imageUploadRef = React.useRef();

  const imageCount = item ? 1 : 0;

  const handleOnSave = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: item,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  const handleOnCancel = () => {
    onDismiss();
  };

  const handleOnRemoveItem = () => {
    setItem(null);
  };

  const handleUploadedImages = (uploadedImage) => {
    const mappedImage = {
      caption: 'hero banner',
      contentUrl: uploadedImage[0].contentUrl,
      type: 'ImageObject',
      encodingFormat: uploadedImage[0].mimeType,
    };

    setItem(mappedImage);
  };

  return (
    <EditWrapper>
      {isPremium && (
        <>
          <MessageInstructions>
            Upload your banner image here.
          </MessageInstructions>

          <UploadButtonsContainer alignItems="center" justifyContent="space-between" data-testid="UploadButtonsContainer">
            <ImageUpload
              ref={imageUploadRef}
              onUpload={handleUploadedImages}
            >
              <ButtonBox>
                {imageCount < MAX_IMAGES && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => { imageUploadRef.current.click(); }}
                  >
                    <ButtonIcon src={addBannerIcon} alt="Add image" />
                    ADD IMAGE
                  </Button>
                )}
              </ButtonBox>
            </ImageUpload>
          </UploadButtonsContainer>

          <BannerContainer>
            <div>
              {item && (
                <BannerItemContainer
                  key="bannerImage"
                  id="bannerImage"
                  data-id="bannerImage"
                >
                  <DeleteButton size="sm" onClick={() => handleOnRemoveItem()}>
                    <DeleteIconImg src={trashBinIcon} alt="Remove item" />
                  </DeleteButton>

                  <BannerItem>
                    <BannerImageItem contentUrl={item?.contentUrl} alt={item?.caption} />
                  </BannerItem>
                </BannerItemContainer>
              )}
            </div>

          </BannerContainer>
        </>
      )}
      {isPremium ? (
        <ButtonContainer>
          {pendingSave && (
            <Box alignSelf="center" mr={2}>
              <Spinner size={16} mr={2} />
            </Box>
          )}
          <CancelButton onClick={handleOnCancel} size="sm" variant="secondary">Cancel</CancelButton>
          <Button onClick={handleOnSave} size="sm">Save</Button>
        </ButtonContainer>
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
    </EditWrapper>
  );
};

BannerImageModal.defaultProps = {
  onDismiss: () => { },
};
BannerImageModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default BannerImageModal;
