import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const SpinnerContainer = styled.div`
  text-align: ${({ align }) => align};
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.svg`
  transition-property: transform;
  animation: ${rotate} ${({ speed }) => speed}ms linear infinite;
`;

const Spinner = ({
  color,
  thickness,
  gap,
  speed,
  size,
  align,
}) => (
  <SpinnerContainer align={align}>
    <StyledSpinner
      height={size}
      width={size}
      role="img"
      aria-labelledby="title"
      aria-live="polite"
      viewBox="0 0 32 32"
      speed={speed}
    >
      <title id="title">Loading content</title>
      <desc id="desc">Image of a partial circle indicating loading.</desc>
      <circle
        role="presentation"
        cx={16}
        cy={16}
        r={14 - (thickness / 2)}
        stroke={color}
        fill="none"
        strokeWidth={thickness}
        strokeDasharray={Math.PI * 2 * (11 - gap)}
        strokeLinecap="round"
      />
    </StyledSpinner>
  </SpinnerContainer>
);

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  gap: PropTypes.oneOf([1, 2, 3, 4, 5]),
  size: PropTypes.number,
  speed: PropTypes.number,
  align: PropTypes.oneOf([
    'left', 'center', 'right',
  ]),
};
Spinner.defaultProps = {
  color: 'rgba(0,0,0,0.4)',
  gap: 4,
  thickness: 3,
  size: 32,
  speed: 560,
  align: 'center',
};

export default Spinner;
