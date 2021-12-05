/* eslint-disable react/prop-types */
import React from 'react';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../util/theme';

/**
 * @type {(displayURL: string, url: string) => JSX.Element}
 */
const BrowserFrame = ({ displayURL, url }) => (
  <div className="bg-contrast-100 rounded-md overflow-hidden border border-solid border-contrast-200 shadow-lg h-full">
    <div
      className="bg-contrast-100 flex items-center justify-between px-3 py-2 shadow-md"
      style={{ borderBottom: `1px solid ${theme.palette.contrast[4]}` }}
    >
      <div className="hidden md:flex space-x-1 lg:space-x-2 items-center mr-3">
        <div className="rounded-full bg-crimson-400 w-2 h-2" />
        <div className="rounded-full bg-uplift-400 w-2 h-2" />
        <div className="rounded-full bg-fern-400 w-2 h-2" />
      </div>
      <div className="bg-contrast-400 rounded-md py-1 px-3 sm:px-0 w-full sm:w-auto flex justify-center space-x-2 sm:space-x-3 items-center sm:flex-1">
        <FontAwesomeIcon icon={faLock} className="text-contrast-200" />
        <span className="tracking-wide text-white">{displayURL}</span>
      </div>
      <div className="hidden md:flex items-center space-x-2 ml-3">
        <div className="rounded-full bg-fern-600 w-2 h-2 animate-pulse" />
        <div className="tracking-widest text-sm">LIVE</div>
      </div>
    </div>
    <iframe title="Yellow Website Preview" src={url} className="w-full h-full min-h-19 border-none" />
  </div>
);

export default BrowserFrame;
