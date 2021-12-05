/* eslint jsx-a11y/label-has-associated-control: ["error", { depth: 3 } ] */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from 'rebass';
import * as R from 'ramda';
import {
  SelectWrapper, FormControlSelect, FormControl,
} from '../../scenes/MyYellow/scenes/ManageProfile/components/modals/Styled';
import { theme } from '../../util';
import ValidationController from '../ValidationController';

const WebsiteInput = React.forwardRef(({
  formData, onChange, hideLabel, required, disabled, title,
}, ref) => {
  const websiteRef = React.useRef(null);
  const [localData, setLocalData] = React.useState(formData);
  const protocol = localData ? `${R.split('//', localData)[0]}//` : 'https://';
  const siteAddress = localData ? R.split('//', localData)?.[1] : '';

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'security') {
      setLocalData(`${value + siteAddress}`);
      if (siteAddress) {
        onChange(`${value + siteAddress}`);
      }
    } else {
      setLocalData(value ? `${protocol + value}` : null);
      onChange(value ? `${protocol + value}` : null);
    }
  };
  return (
    <Box as="label" className="control-label" width={1}>
      {!hideLabel ? <label className="control-label" htmlFor="website">{title}{required && ' *'}</label> : null}
      <Flex justifyContent="space-between" width={1}>
        <SelectWrapper mr={1}>
          <FormControlSelect
            id="security"
            aria-label="Security Protocol"
            value={protocol}
            onChange={handleChange}
            ref={ref}
            required={required}
            disabled={disabled}
            padding-right={theme.space[4]}
          >
            <option value="http://">http://</option>
            <option value="https://">https://</option>
          </FormControlSelect>
        </SelectWrapper>
        <Box ml={2} flexGrow={1} textAlign="justify">
          <FormControl
            type="text"
            aria-label="Website"
            name="website"
            id="website"
            placeholder="example.com"
            pattern="[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
            title="e.g. example.com, example.co.nz"
            value={siteAddress}
            minLength={5}
            onChange={handleChange}
            required={required}
            disabled={disabled}
          />
        </Box>
        <ValidationController
          isBlocked={(required && !localData) || (required && localData.length < 10)}
          requiredRef={websiteRef}
        />
      </Flex>
    </Box>
  );
});

WebsiteInput.defaultProps = {
  formData: '',
  onChange: () => { },
  hideLabel: false,
  required: false,
  disabled: false,
  title: 'Website',
};

WebsiteInput.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  hideLabel: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default WebsiteInput;
