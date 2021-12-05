import React from 'react';
import { Flex, Text } from 'rebass';
import PropTypes from 'prop-types';
import theme from '../../../../../../../../util/theme';
import Tooltip from '../Tooltip';

const LineChartTooltip = ({
  payload, yDataSeriesName, formatX, formatY,
}) => {
  if (!payload || !payload[0]) {
    return null;
  }

  return (
    <Tooltip>
      <Flex flexDirection="column" alignItems="start" justifyContent="center">
        <Text fontWeight={theme.fontWeight[1]} fontSize={0}>
          {yDataSeriesName}
        </Text>
        <Text fontSize={0}>{`${formatX(payload[0].payload.x)}: ${formatY(payload[0].payload.y)}`}</Text>
      </Flex>
    </Tooltip>
  );
};

LineChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
    }),
  ).isRequired,
  yDataSeriesName: PropTypes.string,
  formatX: PropTypes.func,
  formatY: PropTypes.func,
};

LineChartTooltip.defaultProps = {
  yDataSeriesName: undefined,
  formatX: (val) => val,
  formatY: (val) => val,
};

export default LineChartTooltip;
