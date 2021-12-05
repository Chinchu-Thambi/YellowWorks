/* eslint-disable react/prop-types */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinnerOverlay = () => (
  <div className="absolute bg-base-100 h-full top-0 bottom-0 left-0 right-0 flex flex-col space-y-2 items-center justify-center z-10 opacity-95 text-contrast-400">
    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl" />
  </div>
);

export default LoadingSpinnerOverlay;
