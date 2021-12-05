/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

export const FormGroup = styled.fieldset.attrs({
  className: 'flex flex-col space-y-3 border-none p-0 w-full xl:w-2/3',
})``;

const generateInputCssClasses = (prefilled) => (prefilled ? ' bg-brand-200 border-brand-600' : '');

export const Input = ({
  id, type = 'text', label, prefix, suffix, prefilled, errorMessage, ...rest
}) => (
  <label htmlFor={id}>
    {label && <div className="mb-1">{label}</div>}
    <div
      className={`form-input p-0 flex items-stretch overflow-auto rounded-md ${
        errorMessage && 'border border-crimson-400'
      }`}
    >
      {prefix && (
        <div className="text-sm sm:text-base px-2 sm:px-3 bg-contrast-100 text-contrast-400 flex items-center justify-center">
          {prefix}
        </div>
      )}
      <input
        type={type}
        className={`form-input border-none rounded-none w-full ${generateInputCssClasses(prefilled)}`}
        id={id}
        aria-label={label || 'text input'}
        {...rest}
      />
      {suffix && (
        <div className="text-sm sm:text-base px-2 sm:px-3 bg-contrast-100 text-contrast-400 flex items-center justify-center">
          {suffix}
        </div>
      )}
    </div>
    {errorMessage && (
      <div className="mt-1 text-xs sm:text-base text-crimson-600 p-2 bg-crimson-100 rounded-md">{errorMessage}</div>
    )}
  </label>
);

/**
 * @type {(label: string, prefilled: boolean, rest?: any) => JSX.Element}
 */
export const TextArea = ({
  id, label, prefilled, errorMessage, ...rest
}) => (
  <label htmlFor={id}>
    {label && <div className="mb-1">{label}</div>}
    <textarea
      id={id}
      className={`form-textarea w-full min-h-10 ${generateInputCssClasses(prefilled)} ${
        errorMessage && 'border border-crimson-400'
      }`}
      aria-label={label || 'text input for longer text'}
      {...rest}
    />
    {errorMessage && <div className="mt-1 text-crimson-600 p-2 bg-crimson-100 rounded-md">{errorMessage}</div>}
  </label>
);

/**
 * @type {(label: string, rest?: any) => JSX.Element}
 */
export const Checkbox = ({ id, label, ...rest }) => (
  <label htmlFor={id} className="flex items-center">
    <input type="checkbox" id={id} className="form-checkbox" aria-label={label || 'checkbox input'} {...rest} />
    {label && <span className="ml-2">{label}</span>}
  </label>
);

/**
 * @type {(label: string, rest?: any) => JSX.Element}
 */
export const Radio = ({ id, label, ...rest }) => (
  <label htmlFor={id} className="flex items-center">
    <input type="radio" id={id} className="form-radio" aria-label={label || 'radio selection input'} {...rest} />
    {label && <span className="ml-2">{label}</span>}
  </label>
);

/**
 * @type {(label: string, children: any, rest?: any) => JSX.Element}
 */
export const FormSubGroup = ({ id, label, children }) => (
  <label htmlFor={id}>
    {label && <div className="mb-1">{label}</div>}
    <div id={id} className="flex items-center space-x-4">
      {children}
    </div>
  </label>
);

export const Dropdown = styled(Select).attrs({
  className: 'w-full sm:w-2/3',
})``;
