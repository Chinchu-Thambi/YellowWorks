/* eslint jsx-a11y/label-has-associated-control: ["error", { depth: 3 } ] */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from 'rebass';

import getPhoneConfig from '../../services/getPhoneConfig';
import {
  SelectWrapper, FormControlSelect, FormControl,
} from '../../scenes/MyYellow/scenes/ManageProfile/components/modals/Styled';
import ValidationController from '../ValidationController';

const PhoneInput = React.forwardRef(({
  formData, onChange, hideLabel, required, disabled, isStaff, title,
}, ref) => {
  const phoneRef = React.useRef(null);
  const phoneConfig = getPhoneConfig(formData?.areaCode);
  const errorMessage = (phoneConfig?.minLength === phoneConfig?.maxLength)
    ? `Phone number must contain ${phoneConfig?.maxLength} digits.`
    : `Phone number should only contain between ${phoneConfig?.minLength} and ${phoneConfig?.maxLength} digits.`;
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (formData.number === '' && id === 'areaCode' && value === '') {
      onChange(null);
      return;
    }
    onChange({
      ...formData,
      [id]: value,
      countryCode: '64',
    });
  };
  return (
    <Box as="label" htmlFor="companyName" className="control-label" width={1}>
      {!hideLabel ? <label className="control-label" htmlFor="number">{title}{required && ' *'}</label> : null}
      <Flex justifyContent="space-between" width={1}>
        <SelectWrapper>
          <FormControlSelect
            id="areaCode"
            aria-label="Area Code"
            value={formData?.areaCode}
            onChange={handleChange}
            ref={ref}
            required={required}
            disabled={disabled}
          >
            <option value="">Area code</option>
            {isStaff && <option value="NONE">None</option>}
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="9">09</option>
            <option value="20">020</option>
            <option value="21">021</option>
            <option value="22">022</option>
            <option value="23">023</option>
            <option value="24">024</option>
            <option value="26">026</option>
            <option value="27">027</option>
            <option value="28">028</option>
            <option value="29">029</option>
            <option value="508">0508</option>
            <option value="800">0800</option>
            <option value="900">0900</option>
          </FormControlSelect>
        </SelectWrapper>
        <Box ml={2} flexGrow={1}>
          <FormControl
            type="text"
            aria-label="Phone Number"
            pattern={`^\\d{${phoneConfig?.minLength},${phoneConfig?.maxLength}}$`}
            title={!phoneConfig ? 'Please fill out this field.' : errorMessage}
            name="number"
            id="number"
            placeholder="Number"
            value={formData?.number}
            onChange={handleChange}
            minLength={phoneConfig?.minLength}
            maxLength={phoneConfig?.maxLength || 8}
            required={required}
            disabled={disabled}
          />
        </Box>
      </Flex>
      <ValidationController
        isBlocked={(required && !formData) || (formData?.number && !formData?.areaCode) || (formData?.areaCode && !formData?.number)}
        requiredRef={phoneRef}
      />
    </Box>
  );
});

PhoneInput.defaultProps = {
  formData: {
    areaCode: '',
    number: '',
  },
  onChange: () => { },
  hideLabel: false,
  isStaff: false,
  required: true,
  disabled: false,
  title: 'Phone number',
};

PhoneInput.propTypes = {
  formData: PropTypes.shape({
    areaCode: PropTypes.string,
    number: PropTypes.string,
  }),
  onChange: PropTypes.func,
  title: PropTypes.string,
  hideLabel: PropTypes.bool,
  isStaff: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default PhoneInput;
