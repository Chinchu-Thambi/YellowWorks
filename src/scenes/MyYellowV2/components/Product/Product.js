/* eslint-disable react/prop-types */
import React from 'react';

/**
 * @type {(name: string, role: string, description?: string, imageURL?: string, phone?: string, email?: string) => JSX.Element}
 */
const Product = ({ name, description, imageURL }) => (
  <div className="bg-contrast-100 max-w-xl rounded-md shadow-sm text-contrast-500 flex flex-col sm:flex-row overflow-hidden">
    {imageURL && (
      <picture className="w-full h-48 sm:min-w-24 sm:max-w-48">
        <img src={imageURL} alt={`Product named ${name}`} className="object-cover h-full w-full" />
      </picture>
    )}
    <div className="flex flex-col space-y-2 p-3 sm:p-4 justify-center">
      <div className="font-bold text-lg">{name}</div>
      <div>{description}</div>
    </div>
  </div>
);

export default Product;
