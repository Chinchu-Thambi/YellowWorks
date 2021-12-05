import React from 'react';
import {
  Flex, Image, Text, Box,
} from 'rebass';
import PropTypes from 'prop-types';
import Button from '../Button';

const ActionableNotice = ({
  art, title, text, action,
}) => (
  <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
    {art && <Image src={art.image} width={`${art.scalePercent}%`} mb={3} />}
    {title && (
      <Text as="h2" my={3} textAlign="center">
        {title}
      </Text>
    )}
    {text && (
      <Text mt={3} textAlign="center" fontSize={[1, 2]}>
        {text}
      </Text>
    )}
    {action && (
      <Box mt={4}>
        <Button variant="primary" size="sm" to={action.to} href={action.href}>
          {action.text}
        </Button>
      </Box>
    )}
  </Flex>
);

ActionableNotice.propTypes = {
  art: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    image: PropTypes.any,
    scalePercent: PropTypes.number,
  }),
  title: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  }),
};

ActionableNotice.defaultProps = {
  art: undefined,
  action: undefined,
  title: '',
  text: '',
};

export default ActionableNotice;
