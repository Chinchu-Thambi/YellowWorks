import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box, Flex } from 'rebass';

import Button from '../../../../../../../components/Button';
import Spinner from '../../../../../../../components/Spinner';

import ProductContext from '../../../../../services/ProductContext';

import { ButtonContainer, EditWrapper } from '../Styled';

import SelectorRow from './components/SelectorRow';
import isSpecialHours from './services/isSpecialHours';
import hasSpecialHours from './services/hasSpecialHours';

import { WeekDay, ErrorParagraph } from './OpeningHours.styled';
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

const OpeningHours = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const openingHoursPath = ['location', 'openingHoursSpecification'];
  const formData = R.path(openingHoursPath)(productState?.formData) || [];
  const [localData, setLocalData] = React.useState(formData);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleSave = async () => {
    const fields = validateRequiredFields(localData);

    if (fields.valid) {
      // Proceed to save
      setErrorMessage(null);

      setPendingSave(true);
      const { success } = await productState.saveData({
        path: openingHoursPath,
        data: localData,
      });
      setPendingSave(false);
      if (success) {
        onDismiss();
      }
    } else {
      // Display errors message and do not save changes
      setErrorMessage(fields.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <EditWrapper>
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
                    dayOfWeek={dayOfWeek}
                  />
                )}
              </div>
            </Flex>
          ))}
        </div>

        {errorMessage && (
          <ErrorParagraph>{errorMessage}</ErrorParagraph>
        )}

        <ButtonContainer>
          {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
          )}
          <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
        </ButtonContainer>
      </EditWrapper>
    </form>
  );
};

OpeningHours.defaultProps = {
  onDismiss: () => {},
};
OpeningHours.propTypes = {
  onDismiss: PropTypes.func,
};

export default OpeningHours;
