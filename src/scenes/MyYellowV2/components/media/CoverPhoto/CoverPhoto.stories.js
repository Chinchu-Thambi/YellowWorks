import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import CoverPhoto from './CoverPhoto';

export const WithoutAction = () => {
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1606599756786-69c3963412f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80',
  );
  const caption = text('Caption', 'This a sample caption for the photo.');
  return <CoverPhoto imageURL={imageURL} caption={caption} />;
};

export const WithAction = () => {
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1551258235-ad5cda01926d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2467&q=80',
  );
  const caption = text('Caption', 'This a sample caption for the photo.');
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div>
      <CoverPhoto imageURL={imageURL} caption={caption} onEdit={() => setClickCount(clickCount + 1)} />
      <div className="my-4 bg-red-100 text-red-900 p-3">
        Edit click count: <strong>{clickCount}</strong>
      </div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Molecules/Cover Photo',
};
