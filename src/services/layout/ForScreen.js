/**
 * Use wisely - only for the most complex layout difference between screen sizes
 */

import PropTypes from 'prop-types';
import { useBreakpoint } from '../../util/theme';

const breakpoints = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5,
};

const ForScreen = ({ from, to, children }) => {
  const currentBreakpoint = useBreakpoint();

  if (breakpoints[currentBreakpoint] < breakpoints[from] || breakpoints[currentBreakpoint] > breakpoints[to]) {
    return null;
  }
  return children;
};

ForScreen.propTypes = {
  children: PropTypes.node.isRequired,
  from: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  to: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
};

ForScreen.defaultProps = {
  from: 'xs',
  to: 'xxl',
};

export default ForScreen;
