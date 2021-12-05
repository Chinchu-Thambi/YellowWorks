import React from 'react';
import { number, boolean } from '@storybook/addon-knobs/react';
import ImageUploadArea from './ImageUploadArea';

export const Component = () => {
  const [selectedFiles, setSelectedFiles] = React.useState();
  const isLarge = boolean('Regular sized', true);
  const isSingle = boolean('Single file', true);
  const maxSizeInMB = number('Max File Size in MB', 2);

  return (
    <>
      <ImageUploadArea
        onFilesSelected={(files) => setSelectedFiles(files)}
        small={!isLarge}
        multiple={!isSingle}
        maxSizeInMB={maxSizeInMB}
      />
      {selectedFiles && (
        <div className="bg-fern-200 text-fern-600 mt-4 p-3">
          <div>TESTING INFO</div>
          <div>Selected files</div>
          <ol>
            {selectedFiles.map((file) => (
              <li>{file.name}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default {
  title: 'Manage Journey/Organisms/Image Upload Area',
};
