import React from 'react';
import { Image } from 'rebass/styled-components';
import PropTypes from 'prop-types';

const Thumbnail = ({
  imageURL, size, onClick, className,
}) => (
  <Image
    src={imageURL}
    size={size}
    sx={{
      borderRadius: 2,
      objectFit: 'cover',
    }}
    onClick={() => onClick(imageURL)}
    className={className}
  />
);

Thumbnail.propTypes = {
  imageURL: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Thumbnail.defaultProps = {
  onClick: undefined,
  className: undefined,
};

export default Thumbnail;
