import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  ReachModal, ReachContainer, ReachContent, ReachTitle, ReachCloseButton,
} from './ModalStyled';

const Modal = ({
  children, title, isVisible, onDismiss, dismissable, ...rest
}) => {
  const toggleVisibility = () => {
    if (typeof onDismiss === 'function') {
      onDismiss(!isVisible);
    }
  };
  return (
    <ReachModal
      isOpen={isVisible}
      onDismiss={dismissable ? toggleVisibility : () => {}}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <ReachContainer>
        {title && <ReachTitle>{title}</ReachTitle>}
        <ReachContent>
          {children}
        </ReachContent>
      </ReachContainer>

      {onDismiss !== null && (
        <ReachCloseButton
          type="button"
          onClick={toggleVisibility}
          alt="close"
        >
          <div className="text-contrast-200 hover:text-contrast-400 w-3 h-3 rounded-full flex justify-center items-center">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
        </ReachCloseButton>
      )}

    </ReachModal>
  );
};

Modal.defaultProps = {
  title: undefined,
  children: [],
  dismissable: true,
  onDismiss: () => {},
  isVisible: false,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  dismissable: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export default Modal;
