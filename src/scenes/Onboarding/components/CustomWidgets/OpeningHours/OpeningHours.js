import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box, Flex, Text } from 'rebass';

import SelectorRow from './components/SelectorRow';
import isSpecialHours from './services/isSpecialHours';
import hasSpecialHours from './services/hasSpecialHours';

import { WeekDay } from './OpeningHours.styled';
import getSpecialHoursObject from './services/getSpecialHoursObject';

const dayOfWeeksRange = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

const validateRequiredFields = (fields) => {
  let valid = true;
  const days = [];
  let message = '';

  if (!fields) {
    // At this point there is no errors
    return {
      valid: true,
      message: null,
    };
  }

  fields.forEach((field) => {
    if (!field.closes && !isSpecialHours(field.opens || field.conditionsOfAccess)) {
      valid = false;
      days.push(...field.dayOfWeek);
    }
  });

  if (days && days.length && days.length === 1) {
    // Only one day with errors
    message = `Please provide closing hours for: ${days.join()}`;
  } else if (days && days.length && days.length > 1) {
    // Several days with errors
    message = `Please provide closing hours for the following days: ${days.join(', ')}`;
  }

  return {
    valid,
    message,
  };
};

// Reduce values method
const mergeSelectedHours = (selectedHours) => selectedHours.reduce((acc, selectedItem) => {
  const appendItem = { ...selectedItem };

  if (selectedItem.conditionsOfAccess === 'By appointment') {
    appendItem.conditionsOfAccess = 'By appointment';
    delete appendItem.opens;
  }

  if (selectedItem.opens === '24 Hours') {
    appendItem.opens = '00:00';
    appendItem.closes = '23:59';
  }

  if (selectedItem.opens === 'Closed') {
    return acc;
  }

  const matchingIndex = acc.findIndex(
    (accItem) => accItem.opens === appendItem.opens
      && accItem.closes === appendItem.closes
      && accItem.conditionsOfAccess === appendItem.conditionsOfAccess,
  );

  // if there is a matching selection
  if (matchingIndex !== -1) {
    // adds dayOfWeek to it.
    acc[matchingIndex] = {
      ...acc[matchingIndex],
      dayOfWeek: [
        ...acc[matchingIndex].dayOfWeek,
        ...appendItem.dayOfWeek,
      ],
    };
  } else {
    acc.push(appendItem);
  }

  return acc;
}, []);

const OpeningHours = (props) => {
  const {
    formData,
    onChange,
    title,
    description,
  } = props;

  const [localData, setLocalData] = React.useState(formData);

  React.useEffect(() => {
    if (R.equals(localData, formData)) { return; }
    onChange(localData);
  }, [localData, formData, onChange]);

  const addSpecialHours = ({ dayOfWeek, newOption }) => {
    // remove dayOfWeek from every other entry
    const updatedValues = localData.map((item) => ({
      ...item,
      dayOfWeek: item.dayOfWeek.filter((day) => day !== dayOfWeek),
    }));

    updatedValues.push({
      ...newOption,
      dayOfWeek: [dayOfWeek],
    });

    const reducedValues = mergeSelectedHours(updatedValues)
      .filter((item) => item.dayOfWeek.length > 0);

    setLocalData(reducedValues);
  };

  const handleChangeExistingRow = ({
    selectedOption,
    singleOpeningHoursEntry,
    dayOfWeek,
  }) => {
    const newOption = getSpecialHoursObject(selectedOption?.opens) || selectedOption;
    const targetOption = singleOpeningHoursEntry;

    if (newOption !== selectedOption) { // isSpecialHours?
      addSpecialHours({ dayOfWeek, newOption });
    } else {
      const updatedValues = localData.map(
        (item) => {
          if (
            item.opens === targetOption.opens
            && item.closes === targetOption.closes
            && item.dayOfWeek.includes(dayOfWeek)
          ) {
            return {
              ...item,
              dayOfWeek: targetOption.dayOfWeek.filter((day) => day !== dayOfWeek),
            };
          }

          return item;
        },
      );

      delete targetOption.conditionsOfAccess;

      updatedValues.push({
        ...targetOption,
        ...newOption,
        dayOfWeek: [dayOfWeek],
      });

      const reducedValues = mergeSelectedHours(updatedValues)
        .filter((item) => item.dayOfWeek.length > 0);

      setLocalData(reducedValues);
    }
  };

  const handleChangeNewRow = ({ selectedOption, dayOfWeek }) => {
    const newOption = getSpecialHoursObject(selectedOption?.opens) || selectedOption;

    if (newOption !== selectedOption) { // isSpecialHours?
      addSpecialHours({ dayOfWeek, newOption });
    } else {
      const newHours = [
        ...localData,
        {
          opens: selectedOption.opens,
          dayOfWeek: [
            dayOfWeek,
          ],
        },
      ];

      const reducedValues = mergeSelectedHours(newHours)
        .filter((item) => item.dayOfWeek.length > 0);

      setLocalData(reducedValues);
    }
  };

  const handleDelete = ({ selectedOption, dayOfWeek }) => {
    const newData = localData;

    if (selectedOption.dayOfWeek.length > 1) {
      const index = newData.findIndex((option) => R.equals(option, selectedOption));
      newData[index].dayOfWeek = selectedOption.dayOfWeek.filter((day) => !R.equals(day, dayOfWeek));
      if (newData[index]?.dayOfWeek.length > 0) {
        setLocalData(newData);
      }
    } else {
      const filteredData = newData.filter((option) => !R.equals(option, selectedOption));
      setLocalData(filteredData);
    }
  };

  const fields = validateRequiredFields(localData);
  if (fields.valid) {
    // make thing not valid?
    console.log('Invalid opening hours');
  }

  return (
    <>
      {title && <Text as="h2">{title}</Text>}
      {description && <Text as="p">{description}</Text>}
      <Box my={4}>
        <div>
          { dayOfWeeksRange.map((dayOfWeek) => (
            <Flex key={dayOfWeek} mb={3} flexDirection={['column', 'row']}>
              <WeekDay>{dayOfWeek}</WeekDay>
              <div>
                {localData
                  .filter(R.propSatisfies(R.includes(dayOfWeek), 'dayOfWeek'))
                  .map((singleOpeningHoursEntry) => (
                    <Box
                      key={`${singleOpeningHoursEntry.opens}-${singleOpeningHoursEntry.closes}-${dayOfWeek}`}
                      mb={2}
                    >
                      <SelectorRow
                        openingHoursEntry={singleOpeningHoursEntry}
                        onChange={(selectedOption) => handleChangeExistingRow({
                          selectedOption,
                          singleOpeningHoursEntry,
                          dayOfWeek,
                        })}
                        onDelete={(selectedOption) => handleDelete({
                          selectedOption,
                          dayOfWeek,
                        })}
                        dayOfWeek={dayOfWeek}
                      />
                    </Box>
                  ))}

                {!hasSpecialHours({ formData: localData, dayOfWeek }) && (
                  <SelectorRow
                    onChange={(selectedOption) => handleChangeNewRow({
                      selectedOption,
                      dayOfWeek,
                    })}
                    onDelete={(selectedOption) => handleDelete({
                      selectedOption,
                      dayOfWeek,
                    })}
                    dayOfWeek={dayOfWeek}
                  />
                )}
              </div>
            </Flex>
          ))}
        </div>
      </Box>
    </>
  );
};

OpeningHours.defaultProps = {
  formData: [],
  title: '',
  description: '',
};

OpeningHours.propTypes = {
  formData: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  title: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default OpeningHours;
