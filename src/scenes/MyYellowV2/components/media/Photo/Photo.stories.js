/** globals window alert */

import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import Photo from './Photo';

export const WithoutActions = () => {
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2827&q=80',
  );
  const caption = text('Caption', 'This a sample caption for the photo.');
  return (
    <div className="w-18 h-18">
      <Photo imageURL={imageURL} caption={caption} />
    </div>
  );
};

export const WithActions = () => {
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2827&q=80',
  );
  const [didDelete, setDidDelete] = React.useState(false);
  const caption = text('Caption', 'This a sample caption for the photo.');

  return (
    <div>
      <div className="w-18 h-18">
        <Photo imageURL={imageURL} caption={caption} onDelete={() => setDidDelete(true)} />
      </div>
      <div className="mt-5">
        Opted to delete? <strong>{didDelete ? ' YES ' : ' NO / NOT YET '}</strong>
      </div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Molecules/Photo',
};
