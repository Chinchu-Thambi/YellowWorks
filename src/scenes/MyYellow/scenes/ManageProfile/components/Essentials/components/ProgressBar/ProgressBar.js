import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBarContainer } from './ProgressBar.styled';
import theme from '../../../../../../../../util/theme';

const ProgressBar = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <ProgressBarContainer>
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          fill="transparent"
          stroke={theme.palette.accent[1][0]}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text x="50%" y="60%" textAnchor="middle">{progress}%</text>
      </svg>
    </ProgressBarContainer>
  );
};

ProgressBar.defaultProps = {
  radius: 56,
  stroke: 2,
  progress: 0,
};

ProgressBar.propTypes = {
  radius: PropTypes.number,
  stroke: PropTypes.number,
  progress: PropTypes.number,
};

export default ProgressBar;
