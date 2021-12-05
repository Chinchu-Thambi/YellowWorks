import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../../../../../../util/theme';
import MaterialCard from '../../../../../components/MaterialCard';

const valueIsANumber = (val) => val !== null && (val >= 0 || val < 0);
const formatValue = (value, isDecimal) => {
  if (valueIsANumber(value)) {
    if (isDecimal && value >= 0 && value < 10) {
      return value.toFixed(2);
    }
    return Number(value).toLocaleString();
  }
  return '--';
};

const HeroMetric = ({
  label, sublabel, value, change, valueIsDecimal,
}) => (
  <MaterialCard fullWidth height="auto">
    <Flex height="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <Text as="h4" textAlign="center">
        {label}
      </Text>
      {sublabel && (
        <Text fontSize={0} textAlign="center">
          {sublabel}
        </Text>
      )}
      <Text fontWeight="bold" fontSize={7}>
        {formatValue(value, valueIsDecimal)}
      </Text>
      {(change > 0 || change < 0) && (
        <Flex alignItems="center" color={change < 0 ? theme.palette.accent[0][0] : 'inherit'}>
          <FontAwesomeIcon icon={change < 0 ? faArrowDown : faArrowUp} />
          <Text fontWeight="bold" ml={1}>{Math.abs(change)}</Text>
        </Flex>
      )}
    </Flex>
  </MaterialCard>
);

HeroMetric.propTypes = {
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
  value: PropTypes.number.isRequired,
  change: PropTypes.number,
  valueIsDecimal: PropTypes.bool,
};

HeroMetric.defaultProps = {
  change: undefined,
  sublabel: '',
  valueIsDecimal: false,
};

export default HeroMetric;
