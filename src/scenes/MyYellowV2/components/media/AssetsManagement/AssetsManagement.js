import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import BusinessContext from '../../../../MyYellow/services/BusinessContext';

import ImageUpload from '../ImageUpload';
import Gallery from '../Gallery/Gallery';

const AssetsManagement = ({ type, onSelect, presentOnly }) => {
  const businessStore = React.useContext(BusinessContext) ?? {};

  const { assets = [] } = businessStore?.currentBusiness ?? {};

  const images = R.compose(
    R.filter(R.propEq('type', type)),
    R.reverse,
    R.filter(Boolean),
  )(assets);

  const handleUpload = (uploadedAssets) => {
    onSelect(uploadedAssets[0].url);
  };

  return (
    <div className="space-y-2">
      <Gallery
        images={images}
        onSelect={!presentOnly && ((contentUrl) => { onSelect(contentUrl); })}
      />
      <ImageUpload multiple={false} onUpload={handleUpload} />
    </div>
  );
};

AssetsManagement.defaultProps = {
  type: 'ImageObject',
  onSelect: () => { },
  presentOnly: false,
};

AssetsManagement.propTypes = {
  type: PropTypes.string,
  onSelect: PropTypes.func,
  presentOnly: PropTypes.bool,
};

export default AssetsManagement;
