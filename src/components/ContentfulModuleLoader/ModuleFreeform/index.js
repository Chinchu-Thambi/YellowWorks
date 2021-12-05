/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import HubspotForm from './HubspotForm';
import FreeformExample from './FreeformExample';
import GooglePartner from './GooglePartner';
import PerksModule from './PerksModule';
import ContactDetailsFooter from './ContactDetailsFooter';
import Alert from './Alert';

const jsonModules = {
  FreeformExample,
  HubspotForm,
  GooglePartner,
  PerksModule,
  ContactDetailsFooter,
  Alert,
};

const ModuleFreeform = (props) => {
  const {
    data,
    source,
    pageContext: {
      url,
    } = {},
  } = props;

  const content = (data && data.internal && data.internal.content) || '{}';

  if (!source) {
    console.error('No source module was set.');
    return null;
  }

  const jsonProps = JSON.parse(content);
  const Component = jsonModules[source];

  if (Component) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...jsonProps} />
    );
  }

  console.error(`Couldn't find a module for ${source}, created by ${url}.`);
  return null;
};

ModuleFreeform.defaultProps = {
  pageContext: {},
};

ModuleFreeform.propTypes = {
  data: PropTypes.shape({
    internal: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
  source: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default ModuleFreeform;
