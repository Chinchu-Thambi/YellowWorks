import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass/styled-components';
import theme from '../../../../util/theme';


// Badge variants
const variants = {
  primary: {
    background: theme.palette.contrast[0],
    text: theme.palette.base[0],
  },
  alert: {
    background: theme.palette.accent[4][0],
    text: theme.palette.base[0],
  },
};

const Badge = ({ text, variant }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    px={2}
    py={1}
    backgroundColor={variants[variant].background}
    sx={{ borderRadius: theme.radii[2] }}
  >
    <Text
      fontSize={1}
      color={variants[variant].text}
      sx={{
        textTransform: 'uppercase',
      }}
    >{text}
    </Text>
  </Flex>
);

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'alert',
  ]),
};

Badge.defaultProps = {
  variant: 'primary',
};

export default Badge;
