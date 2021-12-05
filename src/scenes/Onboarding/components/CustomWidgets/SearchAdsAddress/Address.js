/* eslint jsx-a11y/label-has-associated-control: ["error", { depth: 3 } ] */

import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import AddressForm from '../../../../../components/AddressForm';
import Button from '../../../../../components/Button';
import ValidationController from '../../../../../components/ValidationController';
import formatAddress from '../../../../../services/formatAddress';

import {
  DisabledAddressInput,
  EditableAddress,
} from './Styled';

const Address = (props) => {
  const {
    formData,
    onChange,
    title,
  } = props;

  const [localData, setLocalData] = React.useState(formData);
  const [edit, setEdit] = React.useState(!!formData);
  const addressRef = React.useRef(null);

  const address = localData?.address;

  // communicates changes to parent component
  const handleChange = (newLocation) => {
    setLocalData({
      address: newLocation.address,
      geo: newLocation.geo,
    });
  };

  // communicates change to parent
  React.useEffect(() => {
    if (R.equals(formData, localData)) return;

    onChange(localData);
  }, [formData, localData, onChange]);

  return (
    <>
      {title && <h2>{title}</h2>}
      <div className="form-group field field-object">
        {(!edit) ? (
          <label htmlFor="address" className="control-label">
            <Flex alignItems="center">
              <DisabledAddressInput
                type="text"
                id="address"
                value={formatAddress(address)}
                disabled
              />
              <Button
                variant="link"
                size="sm"
                type="button"
                ref={addressRef}
                onClick={() => setEdit(!edit)}
              >
                Edit
              </Button>
            </Flex>
            <ValidationController
              isBlocked={!address}
              requiredRef={addressRef}
            />
          </label>
        ) : (
          <EditableAddress>
            <AddressForm
              defaultMode={address ? 'form' : 'search'}
              formData={localData?.location}
              onChange={handleChange}
            />
          </EditableAddress>
        )}
      </div>
    </>
  );
};

Address.defaultProps = {
  formData: {},
  title: '',
};

Address.propTypes = {
  formData: PropTypes.shape({
    subpremise: PropTypes.string,
    streetNumber: PropTypes.string,
    streetAddress: PropTypes.string,
    locality: PropTypes.string,
    sublocality: PropTypes.string,
    postalCode: PropTypes.string,
    administrativeArea: PropTypes.string,
  }),
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Address;
