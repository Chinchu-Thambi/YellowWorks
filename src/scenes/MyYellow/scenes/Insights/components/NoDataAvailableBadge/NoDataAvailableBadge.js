/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @type {(title: string) => JSX.Element}
 */
const NoDataNotice = () => (
  <div className="flex items-center space-x-2 bg-contrast-100 text-contrast-600 rounded-full py-2 px-3 text-xs xl:text-base">
    <FontAwesomeIcon icon={faInfoCircle} />
    <span>No data available</span>
  </div>
);

export default NoDataNotice;
