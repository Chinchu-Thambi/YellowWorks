import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const StyledTextArea = styled.textarea`
  min-height: 9em;
  line-height: 1.5;
  display: block;
`;

const MaxLen = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: ${({ theme }) => theme.palette.contrast[2]};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  line-height: 1;
`;

const TextArea = ({
  className,
  id,
  options,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  required,
  formData,
  title,
  description,
  maxLength,
  ...props
}) => {
  const [labelId] = React.useState(id || title || description || `id-${Math.random()}`);
  const changeHandler = ({ target }) => onChange(target.value === '' ? options.emptyValue : target.value);
  return (
    <Container>
      {title && (
        <label className="control-label" htmlFor={labelId}>{title}</label>
      )}
      <StyledTextArea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        id={labelId}
        autoFocus={autofocus}
        className={`form-control ${className}`}
        value={typeof formData === 'undefined' ? '' : formData}
        onBlur={onBlur && ((event) => onBlur(labelId, event.target.value))}
        onFocus={onFocus && ((event) => onFocus(labelId, event.target.value))}
        onChange={changeHandler}
        maxLength={maxLength}
        required={required}
      />
      { maxLength && (
        <MaxLen>
          { !formData
            ? `up to ${maxLength} characters`
            : `${formData.length} / ${maxLength}`}
        </MaxLen>
      )}
    </Container>
  );
};

TextArea.defaultProps = {
  autofocus: undefined,
  className: '',
  formData: '',
  options: {},
  value: '',
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined,
  required: false,
  title: '',
  description: '',
  maxLength: undefined,
};

TextArea.propTypes = {
  autofocus: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  schema: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  formData: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.shape({
    emptyValue: PropTypes.bool,
    rows: PropTypes.number,
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextArea;
