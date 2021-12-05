/* eslint-disable react/prop-types */
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Photo from '../Photo/Photo';

/**
 * @type {(images: {imageURL: string, caption: string}[], onDelete?: Function) => JSX.Element}
 */
const Gallery = ({ images, onDelete }) => (
  <div
    className="flex flex-wrap max-h-18 p-2 overflow-auto rounded-lg"
    style={{ boxShadow: 'inset 0 0px 8px -2px rgba(0, 0, 0, .4)' }}
  >
    {images
      && images.map((img, i) => (
        <div key={i} className="p-1" style={{ maxWidth: '50%' }}>
          <Photo imageURL={img.imageURL} caption={img.caption} onDelete={() => onDelete(i)} />
        </div>
      ))}
    {!images && (
      <div className="flex justify-center items-center text-contrast-300 w-full h-10 space-x-2">
        <FontAwesomeIcon icon={faCameraRetro} />
        <span>No photos to show</span>
      </div>
    )}
  </div>
);

export default Gallery;
