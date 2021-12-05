import React from 'react';
import * as R from 'ramda';

let cachedRegionData = null;

const regionFilter = (regionData) => (props) => {
  const {
    // byType: 3 means region level, on the data structure.
    // in comparison, 4 is town/city level and 5 means suburb.
    byType,
    bySlug,
    byParent,
    output,
  } = props;

  let returnValue = regionData ?? [];

  if (byParent) {
    returnValue = returnValue.filter(R.propEq('parent_id', byParent));
  }
  if (byType) {
    returnValue = returnValue.filter(R.propEq('type', byType));
  }
  if (bySlug) {
    returnValue = returnValue.filter((region) => bySlug.includes(region.slug));
  }

  if (output === 'options') {
    returnValue = returnValue.map((region) => ({
      label: region.name,
      value: region.slug,
      id: region.id,
    }));
  }

  return returnValue;
};

// Google-Yellow region mapping from Justin had more entries but they could all be matched
// using .startsWith in yellow regions. The list below contains only the exceptions.
const regionMapping = [
  { g: 'Manawatu-Wanganui', yellow: 'Manawatu Region' },
  { g: 'Tasman', yellow: 'Nelson Region' },
  { g: "Hawke's Bay", yellow: 'Hawkes Bay' },
];

const useRegions = () => {
  const [regionData, setRegionData] = React.useState(cachedRegionData);
  const [loading, setLoading] = React.useState(null);

  const getRegions = regionFilter(regionData);

  // Returns a Region Object in YOL Region Object format
  const getRegionFromString = (regionName = '') => {
    if (!regionName) {
      return null;
    }

    const searchingRegion = regionMapping.find(
      ({ g }) => g.includes(regionName),
    )?.yellow ?? regionName;

    const yellowRegions = getRegions({ byType: 3 });

    return yellowRegions.find((region) => region.name.startsWith(searchingRegion));
  };

  // load region data
  React.useEffect(() => {
    if (regionData) {
      return;
    }
    const loadRegionData = async () => {
      setLoading(true);
      const { default: loadedData } = await import('../../static/product-brief-endpoint/regions.json');

      cachedRegionData = loadedData;
      setRegionData(loadedData);
      setLoading(false);
    };

    loadRegionData();
  }, [regionData]);

  return {
    regionData,
    loading,
    getRegions,
    getRegionFromString,
  };
};

export default useRegions;
