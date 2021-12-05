/* eslint-disable react/prop-types */
import React from 'react';

/**
 * @type {(text: string) => JSX.Element}
 */
const Caption = ({ text }) => (
  <div className="bg-black absolute bottom-0 left-0 right-0 opacity-75 text-white text-sm font-bold p-2 sm:p-2.5">{text}</div>
);

export default Caption;
