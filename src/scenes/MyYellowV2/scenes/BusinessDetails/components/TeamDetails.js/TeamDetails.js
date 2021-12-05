import React from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import * as R from 'ramda';

import { OneColumnContainer } from '../../../../components/Containers/Containers';
import BusinessContext from '../../../../../MyYellow/services/BusinessContext';
import TeamMember from '../../../../components/TeamMember';
import Notice from '../../../../../MyYellow/components/Notice';
import { DeleteConfirmationDialog } from '../../../../components/Dialogs/Dialogs';
import Modal from '../../../../../../components/Modal';
import TeamMemberModal from './components/TeamMemberModal';
import { AddIconButton } from '../../../../components/IconButtons/IconButtons';

const path = ['details', 'employee'];

const TeamDetails = () => {
  const {
    currentBusiness, saveBusinessChange,
  } = React.useContext(BusinessContext) || {};
  const [localData, setLocalData] = React.useState(currentBusiness?.details?.employee || []);
  const [dialogShouldBeVisible, setDialogShouldBeVisible] = React.useState(false);
  const [activeTeamMember, setActiveTeamMember] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const onSave = async (newData = localData) => {
    const { success } = await saveBusinessChange({
      path,
      data: newData,
    });
    if (success) {
      NotificationManager.success('Changes saved', '', 5000);
    }
  };

  const onSaveTeamMemberChange = async (newData = localData) => {
    const updatedTeam = R.assocPath(
      [activeTeamMember],
      newData,
    )(localData);
    const { success } = await saveBusinessChange({
      path,
      data: updatedTeam,
    });
    if (success) {
      setDialogShouldBeVisible(false);
      setLocalData(updatedTeam);
      return true;
    }
    return false;
  };

  const onEdit = (i) => {
    setActiveTeamMember(i);
    setIsVisible(true);
  };

  const addTeamMember = () => {
    setActiveTeamMember(localData.length);
    setIsVisible(true);
  };
  const onCancel = () => setLocalData(currentBusiness);

  const openDeleteDialog = (e, i) => {
    setActiveTeamMember(i);
    setDialogShouldBeVisible(true);
  };

  const onDelete = () => {
    const newTeamMembers = localData?.length === 1 ? [] : R.remove(activeTeamMember, 1, localData);
    setLocalData(newTeamMembers);
    onSave(newTeamMembers);
    setActiveTeamMember(null);
    setDialogShouldBeVisible(false);
  };

  return (
    <>
      <OneColumnContainer
        title="Your Team"
        subtitle="Enter details about your staff and team of experts. These will flow to all of your channels unless overwritten."
        primaryAction={{ label: 'Save', onClick: onSave }}
        secondaryAction={{ label: 'Cancel', onClick: onCancel }}
        actionButton={<AddIconButton onClick={addTeamMember} />}
      >
        {!localData && (
          <div className="mt-3 min-w-full">
            <Notice
              heading="No current team members"
              message="Add a new team member to manage this information."
            />
          </div>
        )}
        {localData?.map((tm, i) => (
          <div className="mb-2 lg:mx-2 flex-grow xl:w-5/12">
            <TeamMember
              givenName={tm?.givenName}
              familyName={tm?.familyName}
              honorificPrefix={tm?.honorificPrefix}
              honorificSuffix={tm?.honorificSuffix}
              imageUrl={tm?.image}
              jobTitle={tm?.jobTitle}
              description={tm?.description}
              phone={tm?.phone}
              email={tm?.email}
              onDelete={(e) => openDeleteDialog(e, i)}
              onEdit={() => onEdit(i)}
            />
          </div>
        ))}
      </OneColumnContainer>
      {dialogShouldBeVisible && (
        <DeleteConfirmationDialog
          title="Delete Team Member"
          message="Are you sure you want to delete this team member?"
          onDecision={(didChooseAffirmatively) => {
            if (didChooseAffirmatively) {
              onDelete();
            }
            setDialogShouldBeVisible(false);
          }}
          onDismiss={() => setDialogShouldBeVisible(false)}
        />
      )}
      <Modal
        title={activeTeamMember === localData?.length ? 'Add Team Member' : 'Manage Team Member'}
        isVisible={isVisible}
        onDismiss={() => {
          setActiveTeamMember();
          setIsVisible(false);
        }}
        scrollable
      >
        <TeamMemberModal
          formData={localData?.[activeTeamMember]}
          onSave={onSaveTeamMemberChange}
          onDismiss={() => { setIsVisible(false); }}
        />
      </Modal>
    </>
  );
};

export default TeamDetails;
