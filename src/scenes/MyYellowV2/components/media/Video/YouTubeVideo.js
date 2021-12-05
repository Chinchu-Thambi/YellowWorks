/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from '../../Containers';
import { DeleteIconButton, EditIconButton } from '../../IconButtons';

/**
 * @type {(videoID: string, onDelete: Function, onEdit: Function) => JSX.Element}
 */
const YouTubeVideo = ({ videoID, onDelete, onEdit }) => (
  <Card iconButtons={[<DeleteIconButton onClick={onDelete} />, <EditIconButton onClick={onEdit} />]}>
    <div className="overflow-hidden rounded-md h-full w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoID}`}
        frameBorder="0"
        title="YouTube Video"
      />
    </div>
  </Card>
);

export default YouTubeVideo;
