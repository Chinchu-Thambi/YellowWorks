import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import LogoInput from '../../../../../components/LogoInput';

import ValidationController from '../../../../../components/ValidationController';

const Logo = (props) => {
  const {
    onChange,
    formData,
  } = props;

  const [localData, setLocalData] = React.useState(formData);
  const [skipValue, setSkipValue] = React.useState(false);
  const ref = React.useRef();

  const isBlocked = (!formData?.contentUrl) && !skipValue;

  const handleLogoChange = (value) => {
    setLocalData(value);
    setSkipValue(false);
  };

  React.useEffect(() => {
    if ((!R.equals(localData, formData) && !skipValue) || (R.equals(localData, formData) && skipValue)) {
      onChange(skipValue ? null : localData);
    }
  }, [localData, formData, onChange, skipValue]);

  return (
    <>
      <h2>Add your business logo</h2>
      <p>Please upload your business logo</p>
      <LogoInput
        onChange={handleLogoChange}
        formData={localData}
        ref={ref}
      />
      <ValidationController requiredRef={ref} isBlocked={isBlocked} />
      <div className="field-radio-group">
        <div className="radio">
          <label htmlFor="skip">
            <span className="horizontal">
              <input id="skip" type="checkbox" checked={skipValue} onChange={() => setSkipValue(!skipValue)} />
              <span>Skip this step for now</span>
            </span>
          </label>
        </div>
      </div>
      <p />
    </>
  );
};

Logo.defaultProps = {
  formData: undefined,
};

Logo.propTypes = {
  formData: PropTypes.shape({
    contentUrl: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default Logo;
