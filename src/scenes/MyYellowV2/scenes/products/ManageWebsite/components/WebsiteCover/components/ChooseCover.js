import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../../../../../components/Modal';

import CoverPhoto from '../../../../../../components/media/CoverPhoto';
import AssetsManagement from '../../../../../../components/media/AssetsManagement';
import ValidationController from '../../../../../../../../components/ValidationController';

const useToggle = (init = false) => {
  const [state, setState] = React.useState(init);

  const toggle = (toggledState) => {
    if (typeof toggledState === 'boolean') {
      setState(toggledState);
    } else {
      setState(!state);
    }
  };

  return [state, toggle];
};

const ChooseCover = React.forwardRef(({
  value, onChange, required, title,
}, ref) => {
  const [isVisible, toggleIsVisible] = useToggle(false);

  const handleSelect = (selectedCoverUrl) => {
    onChange(selectedCoverUrl);
    toggleIsVisible();
  };

  return (
    <>
      <div>
        <div className="mb-1 text-contrast-400">{title}</div>
        <CoverPhoto
          imageURL={value}
          onClick={toggleIsVisible}
        />
      </div>
      <Modal title="Choose a cover for your website" isVisible={isVisible} onDismiss={toggleIsVisible}>
        <AssetsManagement onSelect={handleSelect} />
      </Modal>
      <ValidationController requiredRef={ref} isBlocked={required && !value} message="Image is required." />
    </>
  );
});

ChooseCover.defaultProps = {
  value: '',
  title: '',
  onChange: () => { },
  required: false,
};

ChooseCover.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default ChooseCover;
