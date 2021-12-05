import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer,
} from 'recharts';
import { Flex, Text } from 'rebass';
import theme from '../../../../../../../../util/theme';
import MaterialCard from '../../../../../../components/MaterialCard';
import LineChartTooltip from './LineChartTooltip';

const LineChart = ({
  title, data, xAxisLabel, yDataSeriesName, formatX, formatY,
}) => {
  const LABEL_COLOR = theme.palette.contrast[0];
  const sortedData = data
    .filter((d) => typeof d !== 'undefined' && d !== null) // temporary fix for missing data issue
    .sort((a, b) => a.x - b.x);

  return (
    <MaterialCard fullWidth fullHeight>
      <Flex role="figure" flexDirection="column" justifyContent="center" alignItems="center" width={1}>
        <Text as="h2" fontSize={[1, 2]} fontWeight={Number.parseInt(theme.fontWeight[1], 10)}>
          {title}
        </Text>
        {sortedData.length > 0 && (
          <ResponsiveContainer width="99%" aspect={2}>
            <ComposedChart
              data={sortedData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid vertical={false} stroke={theme.palette.contrast[4]} strokeDasharray="2 2" />
              <XAxis
                dataKey="x"
                type="number"
                height={xAxisLabel ? 50 : 20}
                tick={{
                  fontSize: 'x-small',
                  fill: LABEL_COLOR,
                }}
                ticks={data?.map((d) => d?.x)}
                tickFormatter={formatX}
                label={
                  xAxisLabel && {
                    value: xAxisLabel,
                    position: 'center',
                    fontSize: 'x-small',
                    dy: 20,
                    fill: LABEL_COLOR,
                    fontWeight: Number.parseInt(theme.fontWeight[1], 10),
                  }
                }
                domain={[sortedData[0].x, sortedData[sortedData.length - 1].x]}
              />
              <YAxis
                dataKey="y"
                type="number"
                width={25}
                tick={{
                  fontSize: 'x-small',
                  fill: LABEL_COLOR,
                }}
                tickFormatter={formatY}
              />
              <Tooltip
                content={LineChartTooltip}
                yDataSeriesName={yDataSeriesName}
                formatX={formatX}
                formatY={formatY}
              />
              <Line
                type="monotone"
                dataKey="y"
                fill={theme.palette.contrast[5]}
                stroke={theme.palette.contrast[1]}
                strokeWidth={3}
                animationDuration={2000}
                activeDot={{
                  fill: theme.palette.brand[0],
                  stroke: theme.palette.contrast[1],
                  strokeWidth: 3,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Flex>
    </MaterialCard>
  );
};

LineChart.propTypes = {
  title: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string,
  yDataSeriesName: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
  formatX: PropTypes.func,
  formatY: PropTypes.func,
};

LineChart.defaultProps = {
  xAxisLabel: undefined,
  yDataSeriesName: undefined,
  formatX: (val) => val,
  formatY: (val) => val,
};

export default LineChart;
