/* eslint-disable react/prop-types */
import React from 'react';
import { EditIconButton } from '../../IconButtons';
import Caption from '../Caption';

/**
 * @type {(imageURL: string, caption: string) => JSX.Element}
 */
const CoverPhoto = ({ imageURL, caption, onEdit }) => (
  <div className="w-full h-14 overflow-hidden relative rounded-lg bg-contrast-200">
    <img src={imageURL} alt={caption || 'no caption provided'} className="object-cover h-full w-full" />
    <Caption text={caption} />
    {onEdit && (
      <div className="absolute top-0 right-0 m-2">
        <EditIconButton onClick={onEdit} label="Change" />
      </div>
    )}
  </div>
);

export default CoverPhoto;
