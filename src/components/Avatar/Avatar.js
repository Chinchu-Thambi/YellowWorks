import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'rebass/styled-components';

import defaultAvatar from '../../assets/icons/avatar-default.svg';
import theme from '../../util/theme';

const StyledAvatar = styled(Image)`
  border-radius: 100px;
  border: 1px solid ${theme.palette.contrast[4]};
`;

const Avatar = (props) => {
  const { src: propsSrc, onError, ...rest } = props;
  const [src, setSrc] = React.useState(propsSrc);

  const handleError = (...args) => {
    onError(...args);
    setSrc(defaultAvatar);
  };

  return (
    <StyledAvatar
      src={src}
      onError={handleError}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

Avatar.defaultProps = {
  src: '',
  onError: () => {},
};

Avatar.propTypes = {
  src: PropTypes.string,
  onError: PropTypes.func,
};

export default Avatar;
