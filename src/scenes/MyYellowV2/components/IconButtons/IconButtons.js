/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faPlus, faStar, faTrash,
} from '@fortawesome/free-solid-svg-icons';

const commonIconButtonClasses = 'text-contrast-400 bg-white hover:bg-contrast-500 hover:text-contrast-100 active:bg-contrast-400 active:text-contrast-100';

/**
 * @type {(icon: any, label: string, className?: string, rest?: any) => JSX.Element}
 */
export const IconButton = ({
  icon, label, className, ...rest
}) => (
  <button
    type="button"
    className={`${
      label ? ' px-2.5 h-4' : 'h-5 w-5'
    } rounded-full shadow-md active:shadow-xs flex items-center justify-center cursor-pointer uppercase space-x-2 ${
      className || commonIconButtonClasses
    }`}
    aria-label={label || 'button with an icon in it'}
    {...rest}
  >
    <div>{icon}</div>
    {label && <div className="ml-2 uppercase text-xs tracking-wider">{label}</div>}
  </button>
);

export const DeleteIconButton = (props) => (
  <IconButton
    icon={<FontAwesomeIcon icon={faTrash} />}
    className="text-contrast-400 bg-white hover:bg-crimson-600 hover:text-crimson-100 active:bg-crimson-500 active:text-crimson-100"
    aria-label="Delete button"
    {...props}
  />
);

export const EditIconButton = (props) => (
  <IconButton icon={<FontAwesomeIcon icon={faPen} />} aria-label="Edit button" {...props} />
);

export const StarIconButton = (props) => (
  <IconButton icon={<FontAwesomeIcon icon={faStar} />} aria-label="Button with a star icon in it" {...props} />
);

export const AddIconButton = (props) => (
  <IconButton icon={<FontAwesomeIcon icon={faPlus} />} aria-label="Button with a add or plus icon in it" {...props} />
);
