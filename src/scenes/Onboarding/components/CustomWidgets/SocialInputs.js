import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter, faFacebookF, faInstagram, faLinkedinIn, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Input } from '../../../../components/FormElements';

const regexp = '^(?:http://|https://|s3://).+$';

const SocialInputs = ({ onChange, formData }) => {
  const handleChange = (name, url) => {
    const newData = R.compose(
      R.append({ name, url }),
      R.reject(R.propEq('name', name)),
      R.defaultTo([]),
    )(formData);
    onChange(newData);
  };
  return (
    <div className="grid space-y-2">
      <Input
        id="Twitter"
        label="Twitter"
        name="Twitter"
        placeholder="https://twitter.com"
        prefix={<FontAwesomeIcon icon={faTwitter} />}
        value={R.find(R.propEq('name', 'Twitter'))(formData || [])?.url || ''}
        onChange={(e) => handleChange('Twitter', e.target.value)}
        pattern={regexp}
      />
      <Input
        id="Facebook"
        label="Facebook"
        name="Facebook"
        placeholder="https://facebook.com"
        prefix={<FontAwesomeIcon icon={faFacebookF} />}
        value={R.find(R.propEq('name', 'Facebook'))(formData || [])?.url || ''}
        onChange={(e) => handleChange('Facebook', e.target.value)}
        pattern={regexp}
      />
      <Input
        id="Instagram"
        label="Instagram"
        name="Instagram"
        placeholder="https://instagram.com"
        prefix={<FontAwesomeIcon icon={faInstagram} />}
        value={R.find(R.propEq('name', 'Instagram'))(formData || [])?.url || ''}
        onChange={(e) => handleChange('Instagram', e.target.value)}
        pattern={regexp}
      />
      <Input
        id="Linkedin"
        label="Linkedin"
        name="Linkedin"
        placeholder="https://linkedin.com"
        prefix={<FontAwesomeIcon icon={faLinkedinIn} />}
        value={R.find(R.propEq('name', 'Linkedin'))(formData || [])?.url || ''}
        onChange={(e) => handleChange('Linkedin', e.target.value)}
        pattern={regexp}
      />
      <Input
        id="YouTube"
        label="YouTube"
        name="YouTube"
        placeholder="https://YouTube.com"
        prefix={<FontAwesomeIcon icon={faYoutube} />}
        value={R.find(R.propEq('name', 'YouTube'))(formData || [])?.url || ''}
        onChange={(e) => handleChange('YouTube', e.target.value)}
        pattern={regexp}
      />
    </div>
  );
};

SocialInputs.defaultProps = {
  formData: [],
};

SocialInputs.propTypes = {
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

export default SocialInputs;
