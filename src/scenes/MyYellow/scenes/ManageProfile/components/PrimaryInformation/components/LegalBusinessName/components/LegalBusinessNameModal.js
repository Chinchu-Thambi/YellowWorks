import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import ProductContext from '../../../../../../../services/ProductContext';
import getIsPremium from '../../../../../../../services/getIsPremium';
import Spinner from '../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../components/Button';

import { ButtonContainer, EditWrapper, FormControl } from '../../../../modals/Styled';
import { PremiumModalPrompt } from '../../../../PremiumOnly';

const path = ['businessProfile', 'legalName'];

const LegalBusinessNameModal = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const isPremium = getIsPremium(productState) || false;
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || '';
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleSave = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: localData.trim(),
    });
    setPendingSave(false);

    if (success) {
      onDismiss();
      setLocalData('');
    }
  };

  const handleChange = (e) => {
    setLocalData(e.target.value);
  };

  return (
    <EditWrapper>
      {isPremium ? (
        <>
          <FormControl
            placeholder="Legal name"
            type="text"
            value={localData}
            onChange={handleChange}
            size="30"
          />

          <ButtonContainer>
            {pendingSave && (
              <Box alignSelf="center" mr={2}>
                <Spinner size={16} mr={2} />
              </Box>
            )}
            <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
          </ButtonContainer>
        </>
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
    </EditWrapper>
  );
};

LegalBusinessNameModal.defaultProps = {
  onDismiss: () => { },
};
LegalBusinessNameModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default LegalBusinessNameModal;
