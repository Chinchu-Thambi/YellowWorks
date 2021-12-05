import React from 'react';
import { Flex } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import ThumbnailLink from './ThumbnailLink';

const ThumbnailGrid = ({ images, thumbnailSize, onClick }) => (
  <Flex
    height={['auto', images.length === 2 ? 'auto' : thumbnailSize * 2.1]}
    sx={{ flexWrap: 'wrap', gridGap: 2 }}
    width={[thumbnailSize * 2.2]}
    alignItems="start"
    justifyContent={['center', 'right']}
  >
    {images?.map((img, i) => (
      <ThumbnailLink
        key={i}
        imageURL={img}
        size={images?.length === 1 ? thumbnailSize * 2.2 : thumbnailSize}
        onClick={onClick}
      />
    ))}
  </Flex>
);

ThumbnailGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  thumbnailSize: PropTypes.number,
};

ThumbnailGrid.defaultProps = {
  thumbnailSize: 75,
};

export default ThumbnailGrid;
