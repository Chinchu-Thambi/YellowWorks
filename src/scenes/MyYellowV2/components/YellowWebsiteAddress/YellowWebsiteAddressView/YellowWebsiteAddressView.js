/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../../FormElements/FormElements';

const VALID_SLUG_REGEX = /^[a-z0-9]+(-?[a-z0-9]+)*$/i;

const YellowWebsiteAddressView = ({ onChange, status }) => {
  const [errorMessage, setErrorMessage] = React.useState();
  const prefix = 'https://';
  const suffix = '.yellow.nz';

  return (
    <div className="flex items-end space-x-2">
      <div className="w-full">
        <Input
          label="Your Yellow Website Address"
          id="yel-web-addr"
          prefix={prefix}
          suffix={suffix}
          errorMessage={errorMessage}
          onChange={(e) => {
            if (!VALID_SLUG_REGEX.test(e.target.value)) {
              setErrorMessage(
                `${e.target.value} is not valid. Pick a name that begins and ends with a letters, and letters, number and dashes in the middle. For example, 'foo-bar'`,
              );
            } else {
              setErrorMessage(null);
              onChange(`${prefix}${e.target.value}${suffix}`);
            }
          }}
        />
      </div>
      <div className="w-6 flex">
        {status === 'available' && (
          <div className="form-input uppercase tracking-wider border-none  text-fern-600 text-xl bg-fern-200 rounded-full">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        )}
        {status === 'unavailable' && (
          <div className="form-input uppercase tracking-wider border-none  text-crimson-600 text-2xl rounded-full">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
        {status === 'checking' && (
          <div className="form-input uppercase tracking-wider border-none  text-contrast-300 text-2xl">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default YellowWebsiteAddressView;
