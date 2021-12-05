import React from 'react';
import { Flex, Text } from 'rebass';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';

import theme from '../../../../util/theme';
import VerticallyCenteredSeparator from './VerticallyCenteredSeparator';

const SectionHeader = ({ title }) => {
  const headerColor = theme.palette.contrast[4];
  return (
    <Flex mb={3} mx={3}>
      <Text as="h5" color={headerColor} pr={3}>
        {title}
      </Text>
      <VerticallyCenteredSeparator color={headerColor} />
    </Flex>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
