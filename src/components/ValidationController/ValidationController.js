import React from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  position: 'absolute',
  border: 0,
  width: 'auto',
  height: 1,
  padding: 0,
  marginTop: 1,
  background: 'transparent',
};

const ValidationController = ({
  isBlocked, message, requiredRef, ...props
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const validationCurrent = ref.current;
    const requiredCurrent = requiredRef?.current;

    if (!validationCurrent) {
      return () => {};
    }
    const focusSelect = () => requiredCurrent.focus();
    const onInvalid = (e) => {
      e.target.setCustomValidity('');
      if (!e.target.validity.valid) {
        e.target.setCustomValidity(message);
      }
    };
    const onInput = (e) => {
      e.target.setCustomValidity('');
    };

    validationCurrent.addEventListener('focus', focusSelect);

    if (message) {
      validationCurrent.addEventListener('invalid', onInvalid);
      validationCurrent.addEventListener('input', onInput);
    }

    return () => {
      validationCurrent.removeEventListener('focus', focusSelect);

      if (message) {
        validationCurrent.removeEventListener('invalid', onInvalid);
        validationCurrent.removeEventListener('input', onInput);
      }
    };
  });

  if (!isBlocked) {
    return null;
  }

  return (
    <input
      type="text"
      style={inputStyle}
      ref={ref}
      required
      tabIndex={-1}
      {...props}
    />
  );
};

ValidationController.defaultProps = {
  message: '',
};

ValidationController.propTypes = {
  isBlocked: PropTypes.bool.isRequired,
  message: PropTypes.string,
  requiredRef: PropTypes.oneOfType([
    PropTypes.func, // for legacy refs
    PropTypes.shape({ }),
  ]).isRequired,
};

export default ValidationController;
