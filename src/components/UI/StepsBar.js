import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

const Step = styled.div`
  min-width: ${({ theme }) => theme.space[3]};
  height: ${({ theme }) => theme.space[2]};
  flex-grow: 1;
  margin: 0 ${({ theme }) => theme.space[1]};

  background: ${({ complete, theme }) => (
    complete
      ? theme.palette.brand[0]
      : theme.palette.accent[3][0]
  )};
`;
const HalfStep = styled.div`
  height: 100%;
  width: ${({ width }) => Math.floor(width * 100)}%;
  background: ${({ theme }) => theme.palette.brand[0]};
`;

const StepsBar = ({ complete, total }) => {
  const flooredComplete = Math.floor(complete);
  const remainder = complete - flooredComplete;

  return (
    <Flex alignContent="stretch">
      {R.map((i) => <Step key={i} complete />, R.range(0, Math.floor(complete)))}
      { remainder > 0 && <Step><HalfStep width={remainder} /></Step> }
      {R.map((i) => <Step key={i} />, R.range(Math.ceil(complete), total))}
    </Flex>
  );
};

StepsBar.propTypes = {
  complete: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default StepsBar;
