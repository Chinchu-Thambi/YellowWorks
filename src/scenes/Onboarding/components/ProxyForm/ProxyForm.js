/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { StyledForm } from '../Styled';

const ProxyForm = React.forwardRef(({
  currentStep,
  formData,
  onChange,
  schema,
}, ref) => (
  <StyledForm ref={ref} onSubmit={(e) => e.preventDefault()}>
    {currentStep && currentStep.fields && currentStep.fields.map((field) => {
      const { Handler } = field;
      return (
        <Handler
          key={field.name || field.path}
          name={field.name || field.path}
          formData={field.path ? R.path([...field.path], formData) : formData}
          onChange={onChange(field.path)}
          placeholder={field.placeholder}
          required={field.required}
          schema={schema}
          {...field}
        />
      );
    })}
  </StyledForm>
));

ProxyForm.defaultProps = {
  currentStep: [],
  uiSchema: {},
  formData: {},
  schema: {},
};

ProxyForm.propTypes = {
  currentStep: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        handler: PropTypes.func,
        required: PropTypes.bool,
        maxLength: PropTypes.number,
      }),
    ),
  }),
  uiSchema: PropTypes.shape({}),
  schema: PropTypes.shape({}),
  formData: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export default ProxyForm;
