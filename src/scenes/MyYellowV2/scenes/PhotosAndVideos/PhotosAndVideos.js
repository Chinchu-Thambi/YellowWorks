import React from 'react';

import { OneColumnContainer } from '../../components/Containers';
import AssetsManagement from '../../components/media/AssetsManagement';

const PhotosAndVideos = () => (
  <OneColumnContainer
    title="Photos"
    subtitle="Add/Manage your business photos here."
  >
    <AssetsManagement presentOnly />
  </OneColumnContainer>
);

export default PhotosAndVideos;
