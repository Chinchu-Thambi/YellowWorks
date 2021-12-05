import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const YellowInput = styled.input`
  color: ${({ theme }) => theme.palette.contrast[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.space[1]};
`;

const Label = styled.label`
  display: flex;
  text-align: left;
  flex-grow: 1;
`;

const Input = ({
  label,
  value,
  ...props
}) => {
  // Remove all trailing space on the label so this becomes a valid key
  const id = label.replace(/\s/g, '').toLowerCase();

  return (
    <Label>
      <YellowInput
        id={id}
        value={(
          value !== undefined
          && typeof value === 'string'
        ) ? value : undefined}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Label>
  );
};

Input.defaultProps = {
  value: '',
  label: '',
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};


export default Input;
