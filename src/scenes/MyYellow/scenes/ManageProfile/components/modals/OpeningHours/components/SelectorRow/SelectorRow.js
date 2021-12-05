import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

import { SelectBoxContainer, SelectBox } from '../../OpeningHours.styled';

import specialHoursOptions from '../../services/specialHoursOptions';
import getSpecialHoursString from '../../services/getSpecialHoursString';

const normalHoursOptions = [
  { value: '06:00', label: '6:00 am' },
  { value: '06:30', label: '6:30 am' },

  { value: '07:00', label: '7:00 am' },
  { value: '07:30', label: '7:30 am' },

  { value: '08:00', label: '8:00 am' },
  { value: '08:30', label: '8:30 am' },

  { value: '09:00', label: '9:00 am' },
  { value: '09:30', label: '9:30 am' },

  { value: '10:00', label: '10:00 am' },
  { value: '10:30', label: '10:30 am' },

  { value: '11:00', label: '11:00 am' },
  { value: '11:30', label: '11:30 am' },

  { value: '12:00', label: '12:00 pm' },
  { value: '12:30', label: '12:30 pm' },

  { value: '13:00', label: '1:00 pm' },
  { value: '13:30', label: '1:30 pm' },

  { value: '14:00', label: '2:00 pm' },
  { value: '14:30', label: '2:30 pm' },

  { value: '15:00', label: '3:00 pm' },
  { value: '15:30', label: '3:30 pm' },

  { value: '16:00', label: '4:00 pm' },
  { value: '16:30', label: '4:30 pm' },

  { value: '17:00', label: '5:00 pm' },
  { value: '17:30', label: '5:30 pm' },

  { value: '18:00', label: '6:00 pm' },
  { value: '18:30', label: '6:30 pm' },

  { value: '19:00', label: '7:00 pm' },
  { value: '19:30', label: '7:30 pm' },

  { value: '20:00', label: '8:00 pm' },
  { value: '20:30', label: '8:30 pm' },

  { value: '21:00', label: '9:00 pm' },
  { value: '21:30', label: '9:30 pm' },

  { value: '22:00', label: '10:00 pm' },
  { value: '22:30', label: '10:30 pm' },

  { value: '23:00', label: '11:00 pm' },
  { value: '23:30', label: '11:30 pm' },

  { value: '00:00', label: '12:00 am' },
  { value: '00:30', label: '12:30 am' },

  { value: '01:00', label: '1:00 am' },
  { value: '01:30', label: '1:30 am' },

  { value: '02:00', label: '2:00 am' },
  { value: '02:30', label: '2:30 am' },

  { value: '03:00', label: '3:00 am' },
  { value: '03:30', label: '3:30 am' },

  { value: '04:00', label: '4:00 am' },
  { value: '04:30', label: '4:30 am' },

  { value: '05:00', label: '5:00 am' },
  { value: '05:30', label: '5:30 am' },

];

const fullOptions = [
  ...specialHoursOptions,
  ...normalHoursOptions,
];

const SelectorRow = (props) => {
  const { openingHoursEntry } = props;

  const specialHourType = getSpecialHoursString(openingHoursEntry);

  const handleOpensChange = (selected) => {
    props.onChange({
      opens: selected.value,
    });
  };

  const handleClosesChange = (selected) => {
    props.onChange({
      closes: selected.value,
    });
  };

  return (
    <Flex>
      {Object.keys(openingHoursEntry).length > 0 ? (
        <SelectBoxContainer>
          {specialHourType ? (
            <SelectBox
              value={fullOptions.find((option) => option.value === specialHourType)}
              options={fullOptions}
              onChange={handleOpensChange}
            />
          ) : (
            <SelectBox
              value={fullOptions.find((option) => option.value === openingHoursEntry.opens)}
              options={fullOptions}
              onChange={handleOpensChange}
            />
          )}

          {openingHoursEntry.opens && !specialHourType && (
            <>
              <span>-</span>
              <SelectBox
                value={normalHoursOptions.find((option) => option.value === openingHoursEntry?.closes)}
                options={normalHoursOptions}
                onChange={handleClosesChange}
                placeholder="Closes at..."
                autoFocus
              />
            </>
          )}
        </SelectBoxContainer>
      ) : (
        <SelectBox
          value=""
          options={fullOptions}
          onChange={handleOpensChange}
        />
      )}
    </Flex>
  );
};

SelectorRow.defaultProps = {
  openingHoursEntry: {},
};

SelectorRow.propTypes = {
  openingHoursEntry: PropTypes.shape({
    opens: PropTypes.string,
    closes: PropTypes.string,
    conditionsOfAccess: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default SelectorRow;
