import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ValidationController from '../../../ValidationController';
import Tag from '../../../Tag';

const SuburbSelection = ({
  selected,
  regionList,
  cityList,
  suburbList,
  setSelection,
  addToSelection,
  removeFromSelection,
}) => {
  const selectRef = React.useRef(null);
  return (
    <div>
      <h3>What suburbs does your business serve?</h3>
      <p>Select the region, then town or city and suburbs your business serves.</p>
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
        value={selected.cities}
        onChange={(value) => setSelection({
          selectedType: 'cities',
          value,
        })}
        options={cityList}
      />
      <h4>Suburbs</h4>
      <Select
        required
        value={null}
        onChange={(value) => addToSelection({
          selectedType: 'suburbs',
          value,
        })}
        options={suburbList}
        ref={selectRef}
      />
      <ValidationController requiredRef={selectRef} isBlocked={selected.suburbs.length === 0} />
      <p>
        {selected.suburbs.map((suburb) => (
          <Tag
            key={suburb.id}
            onRemove={() => removeFromSelection({
              selectedType: 'suburbs',
              id: suburb.id,
            })}
          >
            {suburb.label}
          </Tag>
        ))}
      </p>
    </div>
  );
};

SuburbSelection.propTypes = {
  selected: PropTypes.shape({
    regions: PropTypes.arrayOf(
      PropTypes.shape({ }),
    ),
    cities: PropTypes.arrayOf(
      PropTypes.shape({ }),
    ),
    suburbs: PropTypes.arrayOf(
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
  suburbList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  setSelection: PropTypes.func.isRequired,
  addToSelection: PropTypes.func.isRequired,
  removeFromSelection: PropTypes.func.isRequired,
};

export default SuburbSelection;
