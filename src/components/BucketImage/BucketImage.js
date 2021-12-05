import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import useStorage, { getS3Attributes } from '../../services/useStorage';

const BucketImage = React.memo(({ contentUrl, ...props }) => {
  const { getObject } = useStorage();
  const [imgSrc, setImgSrc] = React.useState(false);
  const [loadedContentUrl, setLoadedContentUrl] = React.useState(null);

  React.useEffect(() => {
    if (contentUrl && contentUrl !== loadedContentUrl) {
      const { key } = getS3Attributes(contentUrl);

      const loads3Image = async () => {
        const src = await getObject({ key });

        setImgSrc(src);
        setLoadedContentUrl(contentUrl);
      };

      loads3Image();
    }
  });
  if (!imgSrc) return <Spinner />;

  return <img src={imgSrc} alt="" {...props} />;
});

BucketImage.propTypes = {
  contentUrl: PropTypes.string.isRequired,
};

export default BucketImage;
