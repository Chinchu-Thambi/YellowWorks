import React from 'react';
import ReactSortable from 'react-sortablejs';
import PropTypes from 'prop-types';
import { Box, Flex } from 'rebass';
import * as R from 'ramda';
import getYouTubeID from 'get-youtube-id';

// Icons
import addGalleryIcon from '../../../../../../../assets/icons/light/add-gallery.svg';
import addVideoIcon from '../../../../../../../assets/icons/light/add-video.svg';
import trashBinIcon from '../../../../../../../assets/icons/light/trash-bin.svg';
import youTubeIcon from '../../../../../../../assets/icons/youtube.svg';
import imageFilledIcon from '../../../../../../../assets/icons/image-filled.svg';
import playButtonIcon from '../../../../../../../assets/icons/play-button.svg';

import ProductContext from '../../../../../services/ProductContext';
import getIsPremium from '../../../../../services/getIsPremium';
import Button from '../../../../../../../components/Button';
import Spinner from '../../../../../../../components/Spinner';

import ImageUpload from '../../ImageUpload';
import { PremiumModalPrompt } from '../../PremiumOnly';
import { ButtonContainer, EditWrapper } from '../Styled';

import {
  CancelButton, GalleryContainer, GalleryItemContainer, GalleryItem, GalleryImageItem, GalleryVideoItem, DeleteButton,
  NoteParagraph,
  UploadButtonsContainer, ButtonBox, ButtonIcon, UploadsCount,
  MessageInstructions,
  DeleteIconImg,
  CaptionInputContainer, CaptionIcon, CaptionInput, ErrorContainer,
} from './ImageGallery.styled';

const path = ['productAttributes', 'gallery'];

const MAX_IMAGES = 20;
const MAX_VIDEOS = 5;

const ImageGallery = ({ onDismiss, onCancel }) => {
  const productState = React.useContext(ProductContext) || {};
  const [items, setItems] = React.useState(R.path(path)(productState.formData) || []);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const imageUploadRef = React.useRef();
  const isPremium = getIsPremium(productState) || false;

  const imageCount = items.filter((item) => item.type === 'ImageObject').length;
  const videoCount = items.filter((item) => item.type === 'VideoObject').length;

  const checkErrors = () => {
    const errorList = [];

    if (R.uniqBy(R.prop('contentUrl'))(items).length !== items.length) {
      errorList.push('Gallery items must be unique.');
    }

    if (errorList.length > 0) {
      return errorList;
    }

    return null;
  };

  const handleSortChange = (order) => {
    const newObj = order.map((index) => items[index]);
    setItems(newObj);
  };

  const handleOnSave = async () => {
    const localErrors = checkErrors();

    if (localErrors) {
      setErrors(localErrors);
      return;
    }

    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: items,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  const handleOnCancel = () => {
    onCancel();
  };

  const handleOnRemoveItem = (removeIndex) => {
    setErrors(null);
    const updatedItems = R.remove(removeIndex, 1, items);
    setItems(updatedItems);
  };

  const onCaptionChange = (item, value) => {
    setErrors(null);

    const newState = [...items];
    const objIndex = newState.findIndex(((obj) => obj.contentUrl === item));

    newState[objIndex] = {
      ...newState[objIndex],
      caption: value,
    };
    setItems(newState);
  };

  const onContentUrlChange = (item, value) => {
    setErrors(null);

    const newState = [...items];
    const objIndex = newState.findIndex(((obj) => obj.contentUrl === item));

    newState[objIndex] = {
      ...newState[objIndex],
      contentUrl: value,
    };
    setItems(newState);
  };

  const handleUploadedImages = (uploadedImages) => {
    setErrors(null);

    const mappedImages = uploadedImages.map((imageObject) => ({
      caption: '',
      contentUrl: imageObject.contentUrl,
      type: 'ImageObject',
      encodingFormat: imageObject.mimeType,
    }));

    setItems([
      ...mappedImages,
      ...items,
    ]);
  };

  const handleAddAVideo = () => {
    setErrors(null);

    setItems([
      {
        contentUrl: '',
        type: 'VideoObject',
      },
      ...items,
    ]);
  };

  return (
    <EditWrapper>
      {isPremium ? (
        <>
          <MessageInstructions>
            Upload your images here to be displayed on your profile.
            <br />
            {items.length > 1 && <span>Drag & Drop to reorder.</span>}
          </MessageInstructions>

          <UploadButtonsContainer alignItems="center" justifyContent="space-between" data-testid="UploadButtonsContainer">
            <ImageUpload
              ref={imageUploadRef}
              onUpload={handleUploadedImages}
            >
              <ButtonBox>
                {imageCount < MAX_IMAGES ? (
                  <>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => { imageUploadRef.current.click(); }}
                    >
                      <Flex flexDirection={['column', 'row']} alignItems="center">
                        <ButtonIcon src={addGalleryIcon} alt="Add images" />
                        ADD IMAGES
                      </Flex>
                    </Button>
                    <UploadsCount>{imageCount} of 20</UploadsCount>
                  </>
                ) : (
                  <Flex flexDirection={['column', 'row']} px={3} py={2} alignItems="center">
                    <ButtonIcon src={addGalleryIcon} alt="" />
                    {MAX_IMAGES} of {MAX_IMAGES}<br />
                    images added
                  </Flex>
                )}
              </ButtonBox>
            </ImageUpload>

            <ButtonBox ml={2}>
              {videoCount < MAX_VIDEOS ? (
                <>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleAddAVideo}
                  >
                    <Flex flexDirection={['column', 'row']} alignItems="center">
                      <ButtonIcon src={addVideoIcon} alt="Add videos" />
                      ADD VIDEOS
                    </Flex>
                  </Button>
                  <UploadsCount>{videoCount} of 5</UploadsCount>
                </>
              ) : (
                <Flex flexDirection={['column', 'row']} px={3} py={2} alignItems="center">
                  <ButtonIcon src={addVideoIcon} alt="" />
                  {MAX_VIDEOS} of {MAX_VIDEOS}<br />
                  videos added
                </Flex>
              )}
            </ButtonBox>
          </UploadButtonsContainer>

          <GalleryContainer>
            <ReactSortable
              tag="div"
              onChange={handleSortChange}
            >
              {items.length > 0 && items.map((item, index) => (
                <GalleryItemContainer
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  id={index}
                  data-id={index}
                >
                  <DeleteButton size="sm" onClick={() => handleOnRemoveItem(index)}>
                    <DeleteIconImg src={trashBinIcon} alt="Remove item" />
                  </DeleteButton>

                  <GalleryItem>
                    {item?.type === 'ImageObject'
                      ? <GalleryImageItem contentUrl={item?.contentUrl} alt={item?.caption} />
                      : (
                        <GalleryVideoItem youTubeID={getYouTubeID(item?.contentUrl)}>
                          <img src={playButtonIcon} alt="video icon" aria-hidden="true" />
                        </GalleryVideoItem>
                      )}
                  </GalleryItem>

                  <CaptionInputContainer>
                    <CaptionIcon>
                      {item?.type === 'ImageObject'
                        ? <img src={imageFilledIcon} alt="image icon" aria-hidden="true" />
                        : <img src={youTubeIcon} alt="video icon" aria-hidden="true" />}
                    </CaptionIcon>


                    {item?.type === 'ImageObject'
                      ? (
                        <CaptionInput
                          type="text"
                          initialValue={item?.caption || ''}
                          value={item?.caption || ''}
                          placeholder="Description"
                          onChange={(e) => onCaptionChange(item.contentUrl, e.target.value)}
                        />
                      ) : (
                        <CaptionInput
                          type="text"
                          initialValue={item?.contentUrl}
                          value={item?.contentUrl}
                          placeholder="Video URL"
                          onChange={(e) => onContentUrlChange(item.contentUrl, e.target.value)}
                        />
                      )}

                  </CaptionInputContainer>
                </GalleryItemContainer>
              ))}
            </ReactSortable>

            {items.length > 0 && (
              <NoteParagraph>
                Adding a good <strong>description</strong> to each of your images
                increases the visibility of your business on Search Engine results pages
              </NoteParagraph>
            )}

            {errors && (
              <ErrorContainer>
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </ErrorContainer>
            )}
          </GalleryContainer>

          <ButtonContainer>
            {pendingSave && (
              <Box alignSelf="center" mr={2}>
                <Spinner size={16} mr={2} />
              </Box>
            )}
            <CancelButton onClick={handleOnCancel} size="sm" variant="secondary">Cancel</CancelButton>
            <Button onClick={handleOnSave} size="sm">Save</Button>
          </ButtonContainer>
        </>
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
    </EditWrapper>
  );
};

ImageGallery.defaultProps = {
  onCancel: () => { },
  onDismiss: () => { },
};

ImageGallery.propTypes = {
  onCancel: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default ImageGallery;
