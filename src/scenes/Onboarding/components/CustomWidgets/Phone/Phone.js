import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import PhoneInput from '../../../../../components/PhoneInput';

const Phone = (props) => {
  const {
    onChange,
    formData,
    required,
    title,
  } = props;

  const [localData, setLocalData] = React.useState(formData);
  const ref = React.useRef();

  React.useEffect(() => {
    if (R.equals(localData, formData)) { return; }
    onChange(localData);
  }, [localData, formData, onChange]);

  return (
    <PhoneInput
      onChange={setLocalData}
      formData={localData}
      title={title}
      ref={ref}
      required={required}
    />
  );
};

Phone.defaultProps = {
  formData: {},
  title: 'Phone number',
  required: false,
};

Phone.propTypes = {
  formData: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
};

export default Phone;
