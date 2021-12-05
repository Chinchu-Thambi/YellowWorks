/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import Spinner from '../../../../../components/Spinner';
import Button from '../../../../../components/Button';
import { Input } from '../../../../../components/FormElements';
import PhoneInput from '../../../../../components/PhoneInput';
import AddressForm from '../../../../../components/AddressForm';
import { OpeningHours } from '../../../../Onboarding/components/CustomWidgets';
import ServicingAreasForm from '../../../../../components/ServicingAreasForm';
import Switch from '../../../../../components/Switch';
import PaymentTypes from './PaymentTypes';

const LocationsModal = ({ onDismiss, formData, onSave }) => {
  const [localData, setLocalData] = React.useState(formData || {});
  const [pendingSave, setPendingSave] = React.useState(false);
  const showLocation = localData?.hasMap;

  const handleChange = (event, path) => {
    const { value } = event?.target;
    const newData = R.assocPath(
      path,
      value,
    )(localData);
    setLocalData(newData);
  };

  const handleOpeningHoursChange = (value, path) => {
    const newData = R.assocPath(
      path,
      value,
    )(localData);
    setLocalData(newData);
  };


  const handlePhoneChange = (value, path) => {
    const newData = R.assocPath(
      path,
      value,
    )(localData);
    setLocalData(newData);
  };

  const handleAddressChange = (value) => {
    const newData = R.compose(R.assocPath(
      ['address'],
      value?.address,
    ),
    R.assocPath(
      ['geo'],
      value?.geo,
    ))(localData);
    setLocalData(newData);
  };

  const handleSave = async () => {
    setPendingSave(true);
    const { success } = await onSave(localData);
    if (success) {
      setPendingSave(false);
      onDismiss();
    }
  };

  const handleServicingAreasChange = (changedFormData) => {
    if (!R.equals(localData?.areaServed, changedFormData)) {
      setLocalData({ ...localData, areaServed: changedFormData });
    }
  };

  // To be added!
  // postalAddress: Address
  // contactPoint: [ContactPoint]
  // specialOpeningHours: [OpeningHoursSpecification]
  // amenityFeature: [AmenityFeature]

  return (
    <Box>
      <fieldset className="grid grid-cols-3 border-none space-x-5">
        <div className="flex flex-col col-span-2 space-y-2">
          <Input
            id="location-name"
            label="Location Business Name"
            value={localData?.name}
            onChange={(v) => handleChange(v, ['name'])}
          />
          <label htmlFor="address">
            <div className="mb-1">Physical Address</div>
            <AddressForm
              defaultMode={localData?.address ? 'form' : 'search'}
              formData={localData}
              id="address"
              onChange={handleAddressChange}
            />
          </label>
          <label htmlFor="hasMap">
            <div className="mb-1">Show your physical location?</div>
            <Switch
              name="hasMap"
              id="hasMap"
              label="hasMap"
              defaultValue="hasMap"
              checked={showLocation}
              options={['yes', 'no']}
              onToggle={(v) => handleChange(v, ['hasMap'])}
            />
          </label>
          <label htmlFor="servicingAreas">
            <div className="mb-1">Servicing Areas</div>
            <ServicingAreasForm id="servicingAreas" formData={localData?.areaServed || []} onChange={handleServicingAreasChange} />
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            id="location-email"
            label="Email"
            value={localData?.email}
            onChange={(v) => handleChange(v, ['email'])}
          />
          <PhoneInput
            formData={localData?.telephone || {}}
            onChange={(v) => handlePhoneChange(v, ['telephone'])}
            title="Phone Number"
          />
          <PhoneInput
            formData={localData?.mobileNumber || {}}
            onChange={(v) => handlePhoneChange(v, ['mobileNumber'])}
            title="Mobile Number"
          />
          <PhoneInput
            formData={localData?.tollFreeNumber || {}}
            onChange={(v) => handlePhoneChange(v, ['tollFreeNumber'])}
            title="Toll Free Number"
          />
          <PhoneInput
            formData={localData?.faxNumber || {}}
            onChange={(v) => handlePhoneChange(v, ['faxNumber'])}
            title="Fax Number"
          />
          <label htmlFor="openingHours">
            <div className="mb-1">Opening Hours</div>
            <OpeningHours id="openingHours" formData={localData?.openingHours || []} onChange={(v) => handleOpeningHoursChange(v, ['openingHours'])} />
          </label>
          <label htmlFor="paymentTypes">
            <div className="mb-1">Accepted Payment Types</div>
            <PaymentTypes id="paymentTypes" formData={localData?.paymentAccepted || []} onChange={(v) => handleChange(v, ['paymentAccepted'])} />
          </label>
        </div>
      </fieldset>
      <div className="flex flex-row justify-center space-x-3">
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="md" type="submit">save</Button>
        <Button onClick={onDismiss} disabled={pendingSave || undefined} size="md" type="submit">cancel</Button>
      </div>
    </Box>
  );
};

LocationsModal.defaultProps = {
  onDismiss: () => { },
  onSave: () => { },
  formData: {},
};
LocationsModal.propTypes = {
  onDismiss: PropTypes.func,
  onSave: PropTypes.func,
  formData: PropTypes.shape({}),
};

export default LocationsModal;
