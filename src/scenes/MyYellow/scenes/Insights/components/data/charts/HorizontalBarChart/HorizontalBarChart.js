import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer,
} from 'recharts';
import { Flex, Text } from 'rebass';
import theme from '../../../../../../../../util/theme';
import MaterialCard from '../../../../../../components/MaterialCard';
import BarChartTooltip from './BarChartTooltip';

const HorizontalBarChart = ({ title, xAxisLabel, data }) => {
  const chartData = data?.sort((a, b) => b.value - a.value);
  const LABEL_COLOR = theme.palette.contrast[0];

  return (
    <MaterialCard fullWidth>
      <Flex role="figure" flexDirection="column" alignItems="center" width={1}>
        {/* // TODO change fontweight to new version once theme updated , will become ['body', 'bold'] */}
        <Text as="h2" fontSize={[0, 1]} fontWeight={Number.parseInt(theme.fontWeight[1], 10)}>
          {title}
        </Text>
        {/* aspect ratio = golden ratio */}
        {chartData?.length > 0 && (
          <ResponsiveContainer width="99%" aspect={1.618}>
            <ComposedChart layout="vertical" data={chartData} margin={{ top: 20 }}>
              <CartesianGrid stroke={theme.palette.contrast[4]} strokeDasharray="2 2" horizontal={false} />
              <XAxis
                dataKey="value"
                type="number"
                height={50}
                tick={{
                  fontSize: 'x-small',
                  fill: LABEL_COLOR,
                }}
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
              />
              <YAxis
                dataKey="label"
                type="category"
                width={100}
                dx={-3}
                tick={{
                  fontSize: 'x-small',
                  fill: LABEL_COLOR,
                }}
                tickFormatter={(lbl) => lbl?.substring(0, 10) + (lbl?.length > 9 ? '...' : '')}
              />
              <Tooltip cursor={false} content={BarChartTooltip} xAxisLabel={xAxisLabel} />
              <Bar dataKey="value" fill={theme.palette.contrast[1]} radius={[0, 3, 3, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Flex>
    </MaterialCard>
  );
};

HorizontalBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

HorizontalBarChart.defaultProps = {
  xAxisLabel: undefined,
};

export default HorizontalBarChart;
