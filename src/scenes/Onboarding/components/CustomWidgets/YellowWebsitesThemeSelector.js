import React from 'react';
import PropTypes from 'prop-types';

import YellowWebsitesThemePicker from '../../../../components/YellowWebsitesThemePicker';

const YellowWebsitesThemeSelector = ({ onChange, formData, title }) => (
  <>
    {title && <div className="mb-1">{title}</div>}
    <div className="flex flex-row">
      <YellowWebsitesThemePicker value={formData} onChange={onChange} />
    </div>
  </>
);

YellowWebsitesThemeSelector.defaultProps = {
  formData: '',
  title: '',
};

YellowWebsitesThemeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.string,
  title: PropTypes.string,
};

export default YellowWebsitesThemeSelector;
