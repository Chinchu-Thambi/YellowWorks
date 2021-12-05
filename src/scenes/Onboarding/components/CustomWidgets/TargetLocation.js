import React, { useCallback } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import axios from 'axios';

import Tag from '../../../../components/Tag';
import ToggleButton from './ToggleButton';
import GoogleMapRadius from './GoogleMapRadius';

import ValidationController from '../../../../components/ValidationController';
import { useLocalStorage } from '../../../../util';

const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;
let loadedRegions = [];

const transformToOption = ({ name, multiple }) => ({
  value: { name, multiple },
  label: `${name}`,
});

const TargetLocation = (props) => {
  const {
    formData, onChange,
  } = props;
  const selectRef = React.useRef(null);
  const [selected, setSelected] = React.useState(formData?.regions || []);
  const [regionList, setRegionList] = React.useState(loadedRegions);
  const fullData = useLocalStorage('productBrief')?.[0];
  const location = R.path(['location', 'geo'])(fullData);
  const [pickBy, setPickBy] = React.useState(fullData?.targetLocation?.targetLocationType || 'regions');
  const [currentInput, setCurrentInput] = React.useState('');

  const loadRegions = useCallback(async (inputValue) => {
    let returnValue = regionList;
    if (returnValue.length === 0 || currentInput !== inputValue) {
      const query = `
      query GetRegions {
        getAdwordsLocations(location: "${inputValue || ''}") {
          name
          multiple
        }
      }`;
      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query },
        { headers: { 'x-api-key': apiKey } },
      );
      const data = response.data.data.getAdwordsLocations;
      loadedRegions = data.length > 0 ? data : [];
      returnValue = data.length > 0 ? data : [];
      setCurrentInput(inputValue);
      setRegionList(returnValue);
    }

    return returnValue
      .slice(0, 20)
      .map(transformToOption);
  }, [regionList, currentInput]);

  // Gets initial category state
  React.useEffect(() => {
    loadRegions();
  }, [regionList, loadRegions]);

  const addToSelection = ({ value }) => {
    const updatedSelection = R.compose(
      R.uniqBy(R.prop('name')),
      R.append(value),
    )(selected);
    setSelected(updatedSelection);
    onChange({ ...formData, regions: updatedSelection, targetLocationType: pickBy });
  };

  const removeFromSelection = (name) => {
    const updatedSelection = R.filter(
      R.complement(R.propEq('name', name)),
    )(selected);
    setSelected(updatedSelection);
    onChange({ ...formData, regions: updatedSelection });
  };

  const toggleSelection = (value) => {
    setPickBy(value);
    onChange({ ...formData, targetLocationType: value, radius: formData.radius || 20 });
  };

  const handleRadiusSelect = (value) => {
    onChange({ ...formData, radius: value });
  };

  return (
    <div>
      <h2>I want to reach customers</h2>
      <ToggleButton
        name="tagretLocationOption"
        options={[
          { label: 'Near my business', value: 'proximity' },
          { label: 'In these regions', value: 'regions' },
        ]}
        active={pickBy}
        onClick={toggleSelection}
      />
      {pickBy === 'regions' ? (
        <>
          <Select
            defaultOptions
            required
            placeholder="Select your target regions..."
            value={null}
            onChange={addToSelection}
            loadOptions={loadRegions}
            ref={selectRef}
            isDisabled={formData?.regions?.length === 4}
          />
          <ValidationController requiredRef={selectRef} isBlocked={formData?.length === 0} />
          <p>
            {selected.map((region) => (
              <Tag
                key={region.name}
                onRemove={() => removeFromSelection(region.name)}
              >
                {region.name}
              </Tag>
            ))}
          </p>
        </>
      )
        : (
          <GoogleMapRadius onChange={handleRadiusSelect} formData={formData} location={location} />
        )}
    </div>
  );
};

TargetLocation.propTypes = {
  formData: PropTypes.shape({
    regions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
    radius: PropTypes.number,
    // I'm adding length as a proptype to fix linting for optional chaining.
    // It's probably wrong since formData should not have been an array previously.
    length: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};

TargetLocation.defaultProps = {
  formData: {
    regions: [],
    radius: null,
  },
};

export default TargetLocation;
