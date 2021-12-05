import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import Gallery from './Gallery';

export const WithPhotos = () => {
  const imageURL = text(
    'Image URL',
    'https://images.unsplash.com/photo-1606599756786-69c3963412f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80',
  );

  const [deletedPhotoIndex, setDeletedPhotoIndex] = React.useState(null);

  return (
    <div style={{ maxWidth: '1000px' }}>
      <Gallery
        images={[
          { imageURL, caption: 'Sample caption 1' },
          { imageURL, caption: 'Sample caption 2' },
          { imageURL, caption: 'Sample caption 3' },
          { imageURL, caption: 'Sample caption 4' },
          { imageURL, caption: 'Sample caption 5' },
          { imageURL, caption: 'Sample caption 6' },
        ]}
        onDelete={(ix) => setDeletedPhotoIndex(ix)}
      />
      <div className="mt-3">
        Deleted photo index: <strong>{deletedPhotoIndex}</strong>
      </div>
    </div>
  );
};

export const EmptyGallery = () => (
  <div style={{ maxWidth: '1000px' }}>
    <Gallery />
  </div>
);
export default {
  title: 'Manage Journey/Organisms/Gallery',
};
