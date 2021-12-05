import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import ProductContext from '../../../../../../../../services/ProductContext';
import Spinner from '../../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../../components/Button';

import { ButtonContainer } from '../../../../../modals/Styled';
import { PremiumModalPrompt } from '../../../../../PremiumOnly';

import TeamMemberForm from './components/TeamMemberForm';
import TeamMemberSection from './components/TeamMemberSection';

const path = ['productAttributes', 'employee'];

const TeamMembersModal = ({ onDismiss, isPremium }) => {
  const productState = React.useContext(ProductContext) || {};

  // const employees = R.path(path)(productState.formData) || [];
  const [localData, setLocalData] = React.useState(R.path(path, productState.formData) || []);
  const [addingActive, setAddingActive] = React.useState(localData.length === 0 || false);
  const [activeIndex, setActiveIndex] = React.useState(!addingActive ? null : 0);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [memberRemoved, setMemberRemoved] = React.useState(false);

  const handleChange = (updatedFormData, index) => {
    if (localData.length === 0) {
      setLocalData([
        updatedFormData,
      ]);
      return;
    }
    const newArray = localData.map((employee, i) => (index === i ? updatedFormData : employee));
    setLocalData(
      newArray,
    );
  };

  const handleSave = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    if (success) {
      setPendingSave(false);
      onDismiss();
    }
  };

  const handleActiveChange = (index) => {
    const newArray = [...localData, {}];
    setLocalData(newArray);
    setActiveIndex(index);
    setAddingActive(true);
  };

  const handleRemove = ({ index }) => {
    const newArray = R.remove(index, 1)(localData);
    setLocalData(
      newArray,
    );
    setMemberRemoved(true);
    if (newArray.length === 0) {
      setAddingActive(true);
    } else {
      setAddingActive(false);
    }
  };

  const handleEdit = ({ index }) => {
    setActiveIndex(index);
  };

  return (
    <Box textAlign="center">

      {isPremium && (
        (localData.length > 0) ? (
          localData.map((member, index) => (
            index !== activeIndex
              ? (
                <TeamMemberSection
                  formData={member}
                  onRemove={handleRemove}
                  onEdit={handleEdit}
                  index={index}
                />
              )
              : (
                <TeamMemberForm
                  formData={localData}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  index={activeIndex}
                  onSave={handleSave}
                />
              )
          ))
        ) : (
          <Button
            type="button"
            onClick={() => handleActiveChange(localData.length)}
            variant="link"
            size="sm"
          >Add new team member
          </Button>
        ))}
      {isPremium && (
        !addingActive && localData.length < 5 && (
          <Button
            type="button"
            onClick={() => handleActiveChange(localData.length)}
            variant="link"
            size="sm"
          >Add new team member
          </Button>
        ))}
      {isPremium ? (
        memberRemoved && (
          <ButtonContainer>
            {pendingSave && (
              <Box alignSelf="center" mr={2}>
                <Spinner size={16} mr={2} />
              </Box>
            )}
            <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" type="submit">save</Button>
          </ButtonContainer>
        )
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
      {memberRemoved && (
        <ButtonContainer>
          {pendingSave && (
            <Box alignSelf="center" mr={2}>
              <Spinner size={16} mr={2} />
            </Box>
          )}
          <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm" type="submit">save</Button>
        </ButtonContainer>
      )}
    </Box>
  );
};

TeamMembersModal.defaultProps = {
  onDismiss: () => { },
};
TeamMembersModal.propTypes = {
  onDismiss: PropTypes.func,
  isPremium: PropTypes.bool.isRequired,
};

export default TeamMembersModal;
