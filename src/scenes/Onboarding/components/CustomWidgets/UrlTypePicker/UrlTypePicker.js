import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

import CheckCircle from '../../../../../components/CheckCircle';
import ValidationController from '../../../../../components/ValidationController';

const alerts = {
  Facebook:
  <p>*Please note that your campaign will be ineligible for conversion tracking if we send the ads to a Facebook Profile. We still provide you with performance metrics like clicks and impressions.</p>,
  'Yellow Profile':
  <p>*Please note that your campaign will be ineligible for conversion tracking if we send the ads to your Yellow Online Profile. We still provide you with performance metrics like clicks and impressions.</p>,
};

const UrlTypePicker = (props) => {
  const {
    formData, onChange, description, title, required,
  } = props;
  const selectRef = React.useRef(null);

  const [selected, setSelected] = React.useState(formData?.type);
  const alert = alerts[selected];
  const isBlocked = required && !selected;

  const handleChange = (value) => {
    setSelected(value);
    onChange({ ...formData, type: value });
  };

  return (
    <div>
      {title && (
        <h2>{title}</h2>
      )}

      {description && (
      <Box marginBottom={4}>
        <p>{description}</p>
      </Box>
      )}
      <Box marginY={3}>
        <CheckCircle
          label="Website"
          key="website-checkCircle"
          checked={selected === 'Website'}
          onChange={handleChange}
          value="Website"
        />
      </Box>
      <Box marginY={3}>
        <CheckCircle
          label="Yellow Profile"
          key="yellow-profile-checkCircle"
          checked={selected === 'Yellow Profile'}
          onChange={handleChange}
          value="Yellow Profile"
        />
      </Box>
      <Box marginY={3}>
        <CheckCircle
          label="Facebook Page"
          key="facebook-checkCircle"
          checked={selected === 'Facebook'}
          onChange={handleChange}
          value="Facebook"
        />
      </Box>
      {alert && (
        <Box marginBottom={4} fontSize={1}>
          {alert}
        </Box>
      )}
      <ValidationController requiredRef={selectRef} isBlocked={isBlocked} />
    </div>
  );
};

UrlTypePicker.propTypes = {
  formData: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

UrlTypePicker.defaultProps = {
  formData: {
    type: '',
    url: '',
  },
  title: '',
  description: '',
  required: false,
};

export default UrlTypePicker;
