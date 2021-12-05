import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ValidationController from '../../../ValidationController';
import Tag from '../../../Tag';

const RegionSelection = ({
  selected,
  regionList,
  addToSelection,
  removeFromSelection,
}) => {
  const selectRef = React.useRef(null);
  return (
    <div>
      <h3>What regions of New Zealand does your business serve?</h3>
      <p>Select the regions your business serves.</p>
      <Select
        required
        value={null}
        onChange={(value) => addToSelection({
          selectedType: 'regions',
          value,
        })}
        options={regionList}
        ref={selectRef}
      />
      <ValidationController requiredRef={selectRef} isBlocked={selected.regions.length === 0} />
      <p>
        {selected.regions.map((region) => (
          <Tag
            key={region.id}
            onRemove={() => removeFromSelection({
              selectedType: 'regions',
              id: region.id,
            })}
          >
            {region.label}
          </Tag>
        ))}
      </p>
    </div>
  );
};

RegionSelection.propTypes = {
  selected: PropTypes.shape({
    regions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
  }).isRequired,
  regionList: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      selectedType: PropTypes.string,
    }),
  ).isRequired,
  addToSelection: PropTypes.func.isRequired,
  removeFromSelection: PropTypes.func.isRequired,
};

export default RegionSelection;
