import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import slugify from 'slugify';

import VideoLeftTemplate from './VideoLeftTemplate';
import VideoRightTemplate from './VideoRightTemplate';
import VideoCenterTemplate from './VideoCenterTemplate';

const availableTemplates = {
  'Video [L]': VideoLeftTemplate,
  'Video [R]': VideoRightTemplate,
  'Video [C]': VideoCenterTemplate,
};

const ModuleVideo = (props) => {
  const { template, reference } = props;

  const TemplateModule = availableTemplates[template];

  if (TemplateModule === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't find a Video template for ${template}`);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateModule id={slugify(reference, { lower: true })} {...props} />;
};

ModuleVideo.defaultProps = {
  reference: '',
};

ModuleVideo.propTypes = {
  reference: PropTypes.string,
  template: PropTypes.string.isRequired,
};

export default withTheme(ModuleVideo);
