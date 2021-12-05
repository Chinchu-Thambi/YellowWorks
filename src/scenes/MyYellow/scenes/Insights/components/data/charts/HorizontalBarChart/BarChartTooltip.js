import React from 'react';
import { Flex, Text } from 'rebass';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import theme from '../../../../../../../../util/theme';

const BarChartTooltip = ({ payload, xAxisLabel }) => {
  if (!payload || !payload[0]) {
    return null;
  }

  return (
    <Tooltip>
      <Flex flexDirection="column" alignItems="start" justifyContent="center">
        <Text fontWeight={theme.fontWeight[1]} fontSize={0}>
          {xAxisLabel}
        </Text>
        <Text fontSize={0}>
          {payload[0].payload.label}: {payload[0].payload.value.toFixed(0)}
        </Text>
      </Flex>
    </Tooltip>
  );
};

BarChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    }),
  ).isRequired,
  xAxisLabel: PropTypes.string,
};

BarChartTooltip.defaultProps = {
  xAxisLabel: undefined,
};

export default BarChartTooltip;
