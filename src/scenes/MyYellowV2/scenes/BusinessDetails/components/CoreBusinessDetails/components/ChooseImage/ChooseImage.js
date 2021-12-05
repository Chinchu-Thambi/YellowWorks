import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../../../../../components/Modal';
import { EditIconButton } from '../../../../../../components/IconButtons';
import AssetsManagement from '../../../../../../components/media/AssetsManagement';
import uploadImageIcon from '../../../../../../../../assets/icons/image-upload-icon.svg';

const ChooseImage = ({
  id, label, value, onSelect, circle = false, small = false,
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelect = (contentUrl) => {
    onSelect(contentUrl);
    setCurrentValue(contentUrl);
    toggleModal();
  };

  const getDimensions = () => {
    if (circle) {
      return 'h-10 w-10';
    }
    if (currentValue) {
      return 'max-h-10 max-w-10';
    }
    return 'h-7 w-10';
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>

      <div className="flex items-center space-x-3">
        <button id={id} className={`bg-transparent ${getDimensions()}`} type="button" onClick={toggleModal}>
          {currentValue && (
            <img
              className={`w-full h-full object-cover ${circle ? 'rounded-full' : 'rounded-md'} ${small && 'max-h-10'}`}
              src={currentValue}
              alt={label}
            />
          )}
          {!currentValue && (
            <div
              className={`bg-violet-100 text-violet-400 border border-dashed border-violet-300 flex items-center justify-center w-full h-full object-cover ${
                circle ? 'rounded-full' : 'rounded-md'
              }`}
            >
              <img src={uploadImageIcon} className="h-4" alt="add" />
            </div>
          )}
        </button>

        <EditIconButton onClick={toggleModal} label="Change" />
      </div>

      <Modal title={`Choose an image for ${label}`} isVisible={isModalVisible} onDismiss={toggleModal}>
        <AssetsManagement type="ImageObject" onSelect={handleSelect} />
      </Modal>
    </>
  );
};

ChooseImage.defaultProps = {
  id: 'choose-image',
  value: '',
  label: '',
  onSelect: () => {},
  circle: false,
  small: false,
};

ChooseImage.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  circle: PropTypes.bool,
  small: PropTypes.bool,
};

export default ChooseImage;
