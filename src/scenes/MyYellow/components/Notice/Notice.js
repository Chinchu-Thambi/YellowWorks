import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/Button';

import Card from '../Card';

const Notice = ({
  heading, message, buttonLabel, targetURL,
}) => (
  <Card>
    {heading && <h2>{heading}</h2>}
    <p>{message}</p>
    {buttonLabel && targetURL && (
      <Button to={targetURL} variant="tertiary" outline="true" size="sm">
        {buttonLabel}
      </Button>
    )}
  </Card>
);

Notice.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  targetURL: PropTypes.string,
};

Notice.defaultProps = {
  heading: undefined,
  buttonLabel: undefined,
  targetURL: undefined,
};

export default Notice;
