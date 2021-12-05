import * as R from 'ramda';

import getSpecialHoursString from './getSpecialHoursString';

const hasSpecialHours = ({ formData, dayOfWeek }) => R.compose(
  R.any(getSpecialHoursString),
  R.filter(
    R.compose(
      R.includes(dayOfWeek),
      R.prop('dayOfWeek'),
    ),
  ),
)(formData);

export default hasSpecialHours;
