import React from 'react';
import PropTypes from 'prop-types';

const InputText = (props) => {
  const {
    title, description, formData, onChange, className, placeholder, required, type,
  } = props;
  const handleChange = (e) => { onChange(e.target.value); };
  const id = title || description || Math.random();
  return (
    <div className={className}>
      {title && (
        <label className="control-label" htmlFor={id}>{title}</label>
      )}
      <input
        type={type}
        id={id}
        value={formData}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

InputText.defaultProps = {
  title: '',
  description: '',
  formData: '',
  onChange: () => {},
  className: '',
  placeholder: '',
  required: false,
  type: 'text',
};

InputText.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default InputText;
