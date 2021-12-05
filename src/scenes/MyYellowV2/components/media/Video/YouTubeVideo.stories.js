/** globals window alert */

import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import YouTubeVideo from './YouTubeVideo';

export const Component = () => {
  const videoID = text('YouTube video ID', 'YCp2GZNkBSU');
  const [clicked, setClicked] = React.useState();

  return (
    <div className="w-18 h-14">
      <YouTubeVideo videoID={videoID} onDelete={() => setClicked('delete')} onEdit={() => setClicked('edit')} />
      <div className="bg-base-200 p-3 my-4">
        Action clicked was: <strong>{clicked}</strong>
      </div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Organisms/YouTubeVideo',
};
