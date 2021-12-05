import React from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../../../../components/Auth/AuthContext';
import BusinessContext from '../../../../MyYellow/services/BusinessContext';

import ImageUploadArea from '../ImageUploadArea';

import getPresignedPost from './services/getPresignedPost';
import uploadFiles from './services/uploadFiles';
import Spinner from '../../../../../components/Spinner';

const ImageUpload = ({ onUpload, multiple }) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const { addAssets } = React.useContext(BusinessContext) || {};
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileDrop = async (files) => {
    setIsLoading(true);
    const presignedPost = await getPresignedPost(jwtToken, customerId)(files);
    const uploadedFiles = await uploadFiles(files, presignedPost);
    await addAssets(uploadedFiles);

    onUpload(uploadedFiles);
    setIsLoading(false);
  };

  return (
    isLoading ? <Spinner /> : <ImageUploadArea multiple={multiple} onFilesSelected={handleFileDrop} />
  );
};

ImageUpload.defaultProps = {
  multiple: true,
  onUpload: () => {},
};

ImageUpload.propTypes = {
  multiple: PropTypes.bool,
  onUpload: PropTypes.func,
};

export default ImageUpload;
