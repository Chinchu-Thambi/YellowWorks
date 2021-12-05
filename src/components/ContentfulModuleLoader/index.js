import React from 'react';
import PropTypes from 'prop-types';

import ContentfulModuleFreeform from './ModuleFreeform';
import ContentfulModuleHero from './ModuleHero';
import ContentfulModuleCards from './ModuleCards';
import ContentfulModuleProductDisplay from './ModuleProductDisplay';
import ContentfulModulePlainText from './ModulePlainText';
import ContentfulModuleLiquid from './ModuleLiquid';
import ContentfulModuleVideo from './ModuleVideo';

const modules = {
  ContentfulModuleHero,
  ContentfulModuleProductDisplay,
  ContentfulModuleCards,
  ContentfulModuleFreeform,
  ContentfulModulePlainText,
  ContentfulModuleLiquid,
  ContentfulModuleVideo,
};

const ContentfulModuleLoader = (props) => {
  const {
    typeName,
    data,
  } = props;
  const Component = modules[typeName];

  if (Component) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} />;
  }
  // eslint-disable-next-line no-console
  console.error(`Couldn't find a module for ${typeName}, created by ${data.url}.`);
  return null;
};

ContentfulModuleLoader.propTypes = {
  typeName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default ContentfulModuleLoader;
