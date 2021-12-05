import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = (props) => {
  const {
    title, description, formData, onChange, className, placeholder, required,
  } = props;

  const handleChange = (e) => { onChange(e.target.value); };

  const id = title || description || Math.random();

  return (
    <div className={className}>
      {title && (
        <label className="control-label" htmlFor={id}>{title}</label>
      )}
      <input
        type="email"
        id={id}
        value={formData}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        title="Please enter a valid email address."
      />
    </div>
  );
};

EmailInput.defaultProps = {
  title: '',
  description: '',
  formData: '',
  onChange: () => {},
  className: '',
  placeholder: '',
  required: false,
};

EmailInput.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default EmailInput;
