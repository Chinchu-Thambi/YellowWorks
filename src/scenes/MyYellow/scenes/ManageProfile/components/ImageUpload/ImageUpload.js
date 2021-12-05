/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Spinner from '../../../../../../components/Spinner';
import useStorage from '../../../../../../services/useStorage';

import getFileContent from './services/getFileContent';

const ImageUpload = React.forwardRef((props, ref) => {
  const { putToBucket } = useStorage();
  const [isPending, setIsPending] = React.useState(false);

  // setup dropzone
  const onDrop = React.useCallback(async (acceptedFiles) => {
    setIsPending(true);
    const scaledImages = await Promise.all(acceptedFiles.map(getFileContent));
    const mimeType = 'image/jpeg';

    const uploadedContent = await Promise.all(
      scaledImages.map((imageFile) => putToBucket({
        ownerType: 'customers',
        fileName: imageFile.name,
        content: imageFile,
        mimeType,
      })),
    );

    setIsPending(false);
    props.onUpload(uploadedContent);
  }, [props, putToBucket]);

  const {
    getRootProps, getInputProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
  });

  return (
    <>
      <div {...getRootProps()}>
        <input
          {...getInputProps()}
          ref={ref}
          data-testid="file-input"
        />
      </div>
      {isPending && (
      <Spinner size={16} />
      )}
      {props.children}
    </>
  );
});

ImageUpload.defaultProps = {
  children: null,
};

ImageUpload.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
