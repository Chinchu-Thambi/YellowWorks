import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import useRegions from '../../services/useRegions';

import RegionSelection from './components/RegionSelection';
import CitiesSelection from './components/CitiesSelection';
import SuburbSelection from './components/SuburbSelection';
import TopLevelSelection from './components/TopLevelSelection';

const ServicingAreasForm = ({ onChange }) => {
  const [selectBy, setSelectionBy] = React.useState('');
  const emptySelection = {
    regions: [], cities: [], suburbs: [],
  };
  const [selected, setSelected] = React.useState(emptySelection);
  const { getRegions } = useRegions();

  const setSelection = ({ selectedType, value }) => {
    if (selectedType === 'regions') {
      setSelected({
        regions: value,
        cities: [],
        suburbs: [],
      });
    } else if (selectedType === 'cities') {
      setSelected({
        ...selected,
        [selectedType]: [value],
        suburbs: [],
      });
    } else if (selectedType === 'none') {
      setSelected(emptySelection);
    } else {
      setSelected({
        ...selected,
        [selectedType]: [value],
      });
    }
  };

  const addToSelection = ({ selectedType, value }) => {
    const updatedSelection = R.compose(
      R.uniqBy(R.prop('id')),
      R.append(value),
    )(selected[selectedType]);
    setSelected({
      ...selected,
      [selectedType]: updatedSelection,
    });
  };

  const removeFromSelection = ({ selectedType, id }) => {
    const updatedSelection = R.filter(
      R.complement(R.propEq('id', id)),
    )(selected[selectedType]);

    setSelected({
      ...selected,
      [selectedType]: updatedSelection,
    });
  };

  // update parent data when selection changes.
  React.useEffect(() => {
    const selectBySlug = Object.keys(selectBy)[0];

    if (selectBySlug === 'byRegion') {
      const responseObject = {
        region: selected.regions.map(({ label, id }) => ({
          name: label,
          id,
        })),
      };

      onChange(responseObject);

      return;
    }

    if (
      selectBySlug === 'byCity'
      && selected.regions.length > 0
    ) {
      const responseObject = {
        region: {
          name: selected?.regions[0].label,
          id: selected?.regions[0].id,
        },
        city: selected.cities.map(({ label, id }) => ({
          name: label,
          id,
        })),
      };

      onChange(responseObject);

      return;
    }

    if (
      selectBySlug === 'bySuburb'
      && selected.regions.length > 0
      && selected.cities.length > 0
    ) {
      const responseObject = {
        region: {
          name: selected?.regions[0].label,
          id: selected?.regions[0].id,
        },
        city: {
          name: selected?.cities[0].label,
          id: selected?.cities[0].id,
        },
        suburb: selected.suburbs.map(({ label, id }) => ({
          name: label,
          id,
        })),
      };

      onChange(responseObject);

      return;
    }

    if (selectBySlug === 'byMacroArea') {
      onChange({
        region: selected.regions.map(({ label, id }) => ({
          name: label,
          id,
        })),
      });

      return;
    }

    if (selectBySlug === 'none') {
      onChange(null);

      return;
    }

    onChange(selectBy);
  }, [onChange, selectBy, selected, selected.cities, selected.regions, selected.suburbs]);


  if (selectBy.byRegion !== undefined) {
    const regionList = getRegions({ byType: 3, output: 'options' });

    return (
      <RegionSelection
        selected={selected}
        regionList={regionList}
        addToSelection={addToSelection}
        removeFromSelection={removeFromSelection}
      />
    );
  }

  if (selectBy.byCity !== undefined) {
    const regionList = getRegions({ byType: 3, output: 'options' });

    let cityList = [];
    if (selected.regions.length > 0) {
      cityList = getRegions({
        byParent: selected.regions[0].id,
        byType: 4,
        output: 'options',
      });
    }

    return (
      <CitiesSelection
        selected={selected}
        regionList={regionList}
        cityList={cityList}
        setSelection={setSelection}
        addToSelection={addToSelection}
        removeFromSelection={removeFromSelection}
      />
    );
  }

  if (selectBy.bySuburb !== undefined) {
    const regionList = getRegions({ byType: 3, output: 'options' });

    let cityList = [];
    if (selected.regions.length > 0) {
      cityList = getRegions({
        byParent: selected.regions[0].id,
        byType: 4,
        output: 'options',
      });
    }

    let suburbList = [];
    if (selected.cities.length > 0) {
      suburbList = getRegions({
        byParent: selected.cities[0].id,
        byType: 5,
        output: 'options',
      });
    }

    return (
      <SuburbSelection
        regionList={regionList}
        cityList={cityList}
        suburbList={suburbList}
        selected={selected}
        setSelection={setSelection}
        addToSelection={addToSelection}
        removeFromSelection={removeFromSelection}
      />
    );
  }

  return (
    <TopLevelSelection setSelectionBy={setSelectionBy} setSelection={setSelection} />
  );
};

ServicingAreasForm.defaultProps = {
  onChange: () => {},
};

ServicingAreasForm.propTypes = {
  onChange: PropTypes.func,
};

export default ServicingAreasForm;
