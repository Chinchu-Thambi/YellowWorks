/* eslint-disable react/prop-types */
import React from 'react';
import { DeleteIconButton } from '../../IconButtons';
import Caption from '../Caption';

/**
 * @type {(imageURL: string, caption: string, onDelete?: Function) => JSX.Element}
 */
const Photo = ({ imageURL, caption, onDelete }) => (
  <div className="w-full h-full overflow-hidden relative rounded-lg shadow-xs bg-contrast-200 hover:opacity-95">
    <img src={imageURL} alt={caption || 'no caption provided'} className="object-cover h-full w-full" />
    <Caption text={caption} />
    {onDelete && (
      <div className="absolute top-0 right-0 m-2">
        <DeleteIconButton onClick={onDelete} />
      </div>
    )}
  </div>
);

export default Photo;
