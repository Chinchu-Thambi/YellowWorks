import React from 'react';
import { Flex, Box } from 'rebass';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';

const VerticallyCenteredSeparator = ({ color }) => (
  <Flex flexDirection="column" flex={1} justifyContent="center">
    <Box sx={{ borderBottom: `1px solid ${color}` }} />
    <Box />
  </Flex>
);

VerticallyCenteredSeparator.propTypes = {
  color: PropTypes.string.isRequired,
};

export default VerticallyCenteredSeparator;
