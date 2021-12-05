/* eslint-disable react/prop-types */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import uploadImageIcon from '../../../../../assets/icons/image-upload-icon.svg';

/**
 * @type {(onFilesSelected: Function, maxSizeInMB?: number, multiple?: boolean, small?: boolean) => JSX.Element}
 *
 * @param maxSizeInMB - in megabytes. Defaults to 2MB.
 */
const ImageUploadArea = ({
  onFilesSelected, maxSizeInMB = 2, multiple = false, small = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize: maxSizeInMB * 1024 * 1024, // in bytes
    maxFiles: multiple ? 0 : 1, // 0 means no limit on how many files
    onDropAccepted: (selectedFiles) => onFilesSelected(selectedFiles),
  });

  return (
    <div
      {...getRootProps({
        className: `w-full h-11 bg-violet-100 text-violet-500 hover:text-violet-600 rounded-md flex flex-col items-center justify-center space-y-2 border-dashed border-2 border-violet-300 cursor-pointer ${
          small ? 'text-xs sm:text-sm max-w-14' : 'text-xs sm:text-base'
        }`,
      })}
    >
      <input {...getInputProps()} />
      <img src={uploadImageIcon} alt="Upload" />
      <div className="mt-3 mb-1 text-center">
        <strong>Upload {multiple ? 'photos' : 'a photo'}</strong> or drag and drop
      </div>
      <div className="text-violet-400 text-center">PNG, JPG up to {maxSizeInMB}MB</div>
    </div>
  );
};

export default ImageUploadArea;
