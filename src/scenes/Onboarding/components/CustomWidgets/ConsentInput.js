/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxWrapper } from '../Styled';

const ConsentInput = (props) => {
  const {
    schema, formData, onChange, required,
  } = props;

  const handleChange = (e) => { onChange(e.target.value); };

  const id = schema?.title || schema?.description || Math.random();
  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        id={id}
        value={formData}
        onChange={handleChange}
        required={required}
      />
      <label htmlFor={id}>I agree to receive emails regarding my advertising request and have read & understood <a href="https://yellow.co.nz/terms/privacy-policy/" target="_blank" rel="noopener noreferrer">Yellow&apos;s Privacy Policy</a></label>
    </CheckboxWrapper>
  );
};

ConsentInput.defaultProps = {
  schema: {},
  formData: '',
  onChange: () => { },
  required: false,
};

ConsentInput.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  formData: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default ConsentInput;
