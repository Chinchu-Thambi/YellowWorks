import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ProductContext from '../../../../../../services/ProductContext';

import {
  DayOfWeekContainer, DayOfWeek, HoursItem,
} from './OpeningHoursView.styled';
import getSpecialHoursString from '../../../modals/OpeningHours/services/getSpecialHoursString';

const dayOfWeeksRange = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

// Check if in openingHours there is an object without 'dayOfWeek'
// This could mean that from Mon to Sun the business opens and closes at the same time rage.
// and the object does not have dayOfWeek key.
const hasDayOfWeek = (objs = []) => {
  const result = objs.filter((item) => !Object.prototype.hasOwnProperty.call(item, 'dayOfWeek'));
  if (result && result.length > 0) {
    // found an object without 'dayOfWeek'
    return false;
  }
  return true;
};

const getOpeningHoursByDayOfWeek = (dayOfWeek, openingHours = []) => openingHours.filter(
  (item) => hasDayOfWeek(openingHours) && item.dayOfWeek.includes(dayOfWeek),
);

const sortByOpenHours = (objs) => {
  objs.sort((a, b) => {
    if (a.opens > b.opens) {
      return 1;
    }
    return -1;
  });
  return objs;
};

const openingHoursList = (dayOfWeek, openingHours) => {
  const openingHoursByDayOfWeek = getOpeningHoursByDayOfWeek(dayOfWeek, openingHours);
  const sortedByOpenHours = sortByOpenHours(openingHoursByDayOfWeek);
  return sortedByOpenHours;
};

const HourItem = ({ hourItem }) => {
  const specialHoursString = getSpecialHoursString(hourItem);

  /*
  even though "by appointment" is in specialHoursString,
  we need this because the display casing should be different
  from what's in the database.
  */
  if (hourItem?.conditionsOfAccess) {
    return <HoursItem>By Appointment</HoursItem>;
  }

  // is special hours
  if (specialHoursString) {
    return <HoursItem>{specialHoursString}</HoursItem>;
  }

  return (
    <div>
      {hourItem.opens && <HoursItem>{hourItem.opens}</HoursItem>}
      {hourItem.closes && <> - <HoursItem>{hourItem.closes}</HoursItem></>}
    </div>
  );
};

HourItem.defaultProps = {
  hourItem: {},
};

HourItem.propTypes = {
  hourItem: PropTypes.shape({
    opens: PropTypes.string,
    closes: PropTypes.string,
    conditionsOfAccess: PropTypes.string,
  }),
};

const OpeningHoursView = ({ providedHours }) => {
  const productState = React.useContext(ProductContext) || {};
  const openingHoursPath = ['location', 'openingHoursSpecification'];
  const openingHours = providedHours || R.path(openingHoursPath)(productState?.formData) || [];

  const openFullWeekSpecialCase = !hasDayOfWeek(openingHours);

  return dayOfWeeksRange.map((dayOfWeek) => (
    <DayOfWeekContainer key={dayOfWeek}>
      <DayOfWeek>{dayOfWeek}</DayOfWeek>
      <div>
        {/* If in openingHours there is not 'dayOfWeek' then create a full week with the same opening hours */
        openFullWeekSpecialCase && (
          <div>
            {openFullWeekSpecialCase[0].opens && <span>{openFullWeekSpecialCase[0].opens}</span>}
            {openFullWeekSpecialCase[0].closes
              ? <> - <HoursItem>{openFullWeekSpecialCase[0].closes}</HoursItem></>
              : <> - <HoursItem>Open late</HoursItem></>}
          </div>
        )
        }
        { /* If it has dayOfWeek in the opening hours */
        !openFullWeekSpecialCase && openingHoursList(dayOfWeek, openingHours).map((singleOpeningHoursEntry) => (
          <div
            key={`${singleOpeningHoursEntry.opens}-${singleOpeningHoursEntry.closes}-${dayOfWeek}`}
          >
            <HourItem hourItem={singleOpeningHoursEntry} />
          </div>
        ))
        }

        {/* If there is no records we display 'Closed' as default */
        !openFullWeekSpecialCase && getOpeningHoursByDayOfWeek(dayOfWeek, openingHours).length === 0 && (
          <div>Closed</div>
        )
        }
      </div>
    </DayOfWeekContainer>
  ));
};

export default OpeningHoursView;
