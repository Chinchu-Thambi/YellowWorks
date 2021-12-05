import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import NotificationManager from 'react-notifications/lib/NotificationManager';

import BusinessContext from '../../../MyYellow/services/BusinessContext';
import Location from '../../components/Location';
import { DeleteConfirmationDialog } from '../../components/Dialogs/Dialogs';
import Modal from '../../../../components/Modal';
import LocationsModal from './components/LocationsModal';
import { OneColumnContainer } from '../../components/Containers';
import { AddIconButton } from '../../components/IconButtons/IconButtons';

const path = ['locations'];

const LocationManagement = (props) => {
  const {
    title, description, formData, onChange, className, placeholder, required, type, name, ref,
  } = props;
  const {
    currentBusiness, saveBusinessChange, createLocation, deleteLocation,
  } = React.useContext(BusinessContext) || {};
  const [localData, setLocalData] = React.useState(R.path(path, currentBusiness));
  const [isVisible, setIsVisible] = React.useState(false);
  const [dialogShouldBeVisible, setDialogShouldBeVisible] = React.useState(false);
  const [activeLocation, setActiveLocation] = React.useState(null);
  const [decision, setDecision] = React.useState(false);

  const onSave = async (newData = localData) => {
    const { success } = await saveBusinessChange({
      path,
      data: newData,
    });
    if (success) {
      NotificationManager.success('Changes saved', '', 5000);
    }
  };

  const onAdd = async (newData = localData) => {
    const newLocation = newData[activeLocation];
    const { success } = await createLocation(newLocation);
    if (success) {
      NotificationManager.success('New location saved', '', 5000);
    }
  };

  const onDelete = async (e, i = activeLocation) => {
    if (!dialogShouldBeVisible) {
      setActiveLocation(i);
      setDialogShouldBeVisible(true);
      return;
    }
    if (decision) {
      const newLocations = localData?.length === 1 ? [] : localData?.splice(i, 1);
      const locationId = localData[i]?.id;
      const { success } = await deleteLocation({
        locationId,
      });
      if (success) {
        setLocalData(newLocations);
        setActiveLocation(null);
        setDecision(null);
        setDialogShouldBeVisible(false);
      }
    }
  };

  const onEdit = (i) => {
    setActiveLocation(i);
    setIsVisible(true);
  };
  const addLocation = () => {
    setActiveLocation(localData.length);
    setIsVisible(true);
  };

  const onToggleAsMain = (i) => {
    const currentMainStatus = !!localData?.[i]?.default;
    const indexOldMain = R.findIndex(R.propEq('default', true))(localData);
    const newLocations = R.assocPath(
      [indexOldMain, 'default'],
      false,
    )(R.assocPath(
      [i, 'default'],
      !currentMainStatus,
    )(localData));
    if (indexOldMain === i) {
      NotificationManager.warning('You must select a new main location option', 'No can do!');
    } else {
      setLocalData(newLocations);
      onSave(newLocations);
    }
  };

  return (
    <OneColumnContainer
      title="Locations"
      subtitle="Add/Manage your business locations here. For business-wide information go to the business management page."
      actionButton={<AddIconButton onClick={addLocation} />}
    >
      {localData?.map((location, i) => {
        const {
          name, address, email, telephone, openingHours, specialOpeningHours, default: isMain,
        } = location;
        return (
          <div className="mb-2 lg:mx-2 flex-grow">
            <Location
              name={name}
              address={address}
              email={email}
              phone={telephone}
              openingHours={openingHours}
              specialOpeningHours={specialOpeningHours}
              onDelete={(e) => onDelete(e, i)}
              onEdit={() => onEdit(i)}
              onToggleAsMain={() => onToggleAsMain(i)}
              isMain={isMain}
            />
          </div>
        );
      })}
      {dialogShouldBeVisible && (
        <DeleteConfirmationDialog
          title="Delete Location"
          message="Are you sure you want to delete this location?"
          onDecision={(didChooseAffirmatively) => {
            setDecision(didChooseAffirmatively);
            onDelete();
            setDialogShouldBeVisible(false);
          }}
          onDismiss={() => setDialogShouldBeVisible(false)}
        />
      )}
      <Modal
        title={activeLocation === localData?.length ? 'Add New Location' : 'Manage Location'}
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        scrollable
        dismissable={false}
      >
        <LocationsModal
          formData={localData?.[activeLocation]}
          onDismiss={() => setIsVisible(false)}
          onSave={activeLocation === localData?.length ? onSave : onAdd}
        />
      </Modal>
    </OneColumnContainer>
  );
};


LocationManagement.defaultProps = {
  title: '',
  name: '',
  description: '',
  formData: '',
  onChange: () => { },
  className: '',
  placeholder: '',
  required: false,
  type: 'text',
};

LocationManagement.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  formData: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default LocationManagement;
