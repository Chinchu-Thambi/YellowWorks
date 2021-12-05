import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ValidationController from '../../../ValidationController';
import Tag from '../../../Tag';

const CitiesSelection = ({
  selected,
  regionList,
  cityList,
  setSelection,
  addToSelection,
  removeFromSelection,
}) => {
  const selectRef = React.useRef(null);
  return (
    <div>
      <h3>What towns and cities does your business serve?</h3>
      <p>Select the region then towns and cities your business serves.</p>
      <h4>Region</h4>
      <Select
        required
        onChange={(value) => setSelection({
          selectedType: 'regions',
          value: [value],
        })}
        options={regionList}
      />
      <h4>Towns and Cities</h4>
      <Select
        required
        value={null}
        onChange={(value) => addToSelection({
          selectedType: 'cities',
          value,
        })}
        options={cityList}
        ref={selectRef}
      />
      <ValidationController requiredRef={selectRef} isBlocked={selected.cities.length === 0} />
      <p>
        {selected.cities.map((city) => (
          <Tag
            key={city.id}
            onRemove={() => removeFromSelection({
              selectedType: 'cities',
              id: city.id,
            })}
          >
            {city.label}
          </Tag>
        ))}
      </p>
    </div>
  );
};

CitiesSelection.propTypes = {
  selected: PropTypes.shape({
    regions: PropTypes.arrayOf(
      PropTypes.shape({ }),
    ),
    cities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
  }).isRequired,
  regionList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  cityList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  setSelection: PropTypes.func.isRequired,
  addToSelection: PropTypes.func.isRequired,
  removeFromSelection: PropTypes.func.isRequired,
};

export default CitiesSelection;
